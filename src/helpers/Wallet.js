import { formatEther } from 'ethers/lib/utils.js'
import { computed, reactive } from 'vue'
import { CHAIN_IDS, checkChain, getChain, getChainId } from './chains'
import shortAddress from './short-address'
import { storage, LOCALSTORAGE_KEYS } from './../store/LocalStorage'
import { setOrUpdateProvider } from './../store/update-provider'
import { checkENS } from './ens'

const INITIAL_WALLET_STATE = {
  // Active chain
  chainId: null,
  chainName: null,
  isCorrectChain: null,

  // Is the wallet connected?
  tryingToConnect: false,
  connected: false,
  address: '',
  domainName: '',
  balance: 0,
}

export default class Wallet {

  constructor (globalState, localState = {}) {
    this._globalState = globalState
    this._initialState = {
      ...INITIAL_WALLET_STATE,
      ...localState,
    }
    this.state = reactive({ ...this._initialState })

    this.checkForWallet()
    this.watchNetworkChange()
  }

  /**
   * Get the current global RPC provider.
   */
  get provider () {
    return this._globalState.provider
  }

  /**
   * Get a human readable ETH balance.
   */
  get ethBalance () {
    // const formatEther = e => e
    return computed(() => formatEther(this.state.balance)).value
  }

  /**
   * Get a shortened version of the wallet address
   */
  get shortAddress () {
    return computed(() => {
      const address = this.state.address
      return address && shortAddress(address)
    }).value
  }

  /**
   * Get a human readable account key. Either the connected ENS domain name or
   * a shortened version of the public key.
   */
  get readableAccount () {
    return computed(() => this.state.domainName || this.shortAddress).value
  }

  get previouslyConnected () {
    return storage.getItem(LOCALSTORAGE_KEYS.PREVIOUSLY_CONNECTED)
  }

  /**
   * Check whether a wallet is injected.
   * If so, and the user has previously connected - try to instantly connect them.
   */
  checkForWallet () {
    if (window.ethereum) {
      this.ethereumInjected = true
      this.updateChain()

      if (this.previouslyConnected) {
        this.connect()
      }
    }
  }

  /**
   * Connect the Wallet to the site and get its balance.
   *
   * @returns {Promise}
   */
  async connect () {
    if (! this.ethereumInjected) return false

    // Fetch the current chain
    this.updateChain()
    if (! checkChain()) return false

    // Check for available accounts
    try {
      // Mark as trying to connect
      this.state.tryingToConnect = true

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (! accounts?.length) {
        console.error('No wallet found')
        return false
      }

      // Get the main account
      this.state.address = accounts[0]

      // Call once when we successfully connected
      this.successfullyConnected()

      // Hook for every network update / connection renewal
      await this.onConnected()

      // Mark as completed
      this.state.tryingToConnect = false

      return true
    } catch (e) {
      this.resetWallet()

      return false
    }
  }

  /**
   * Get the account balance of the wallet.
   */
  async getBalance () {
    this.state.balance = await this.provider.getBalance(this.state.address)
  }

  /**
   * Poll the current account balance once a minute
   */
  async pollBalance () {
    setInterval(() => this.getBalance(), 60000) // Every minute
  }

  /**
   * Executed when the wallet connects to an address.
   */
  async onConnected (additionalPromise = async () => null) {
    // First get the balance and the token ID of the wallet
    await Promise.all([
      this.checkENS(),
      this.getBalance(),
      additionalPromise(),
    ])

    this.state.connected = true
    return this.state.connected
  }

  /**
   * Called when the wallet successfully connected to the site.
   * Executed once when initially connecting.
   */
  successfullyConnected () {
    storage.setItem(LOCALSTORAGE_KEYS.PREVIOUSLY_CONNECTED, true)
    console.info('Wallet successfully connected', this)

    this.watchWalletChange()
    this.pollBalance()
  }

  /**
   * Try to get the ENS domain name for the current address.
   */
  async checkENS () {
    this.state.domainName = await checkENS(this.state.address)
  }

  /**
   * Ensure that the contract has a signer.
   */
  async ensureSigned (contract) {
    console.log('contract signer', contract.signer, contract)
    console.log('wallet signer', this.provider.getSigner())

    if (! contract.signer) {
      // Connect to the wallet so we can call state changing methods
      return await contract.connect(this.provider.getSigner())
    }

    return contract
  }

  /**
   * Sign a message
   */
  async signMessage (message) {
    return await (await this.provider.getSigner()).signMessage(message)
  }

  /**
   * Update the provider of this wallet.
   *
   * @param {Object} provider
   */
  updateProvider (provider) {
    this._globalState.provider = provider
  }

  /**
   * Watch wallet changes and update state accordingly.
   */
  watchWalletChange () {
    window.ethereum.on('accountsChanged', accounts => {
      if (! accounts[0]) {
        this.resetWallet()
        return
      }

      this.resetWalletState()
      this.state.address = accounts[0]
      console.info('ETH ACCOUNT CHANGED', this.state.address)

      this.onConnected()
    })
  }

  /**
   * Watch wallet changes and update state accordingly.
   */
  watchNetworkChange () {
    window.ethereum?.on('chainChanged', () => {
      this.updateChain()
      console.info('Network changed to ', CHAIN_IDS[this.state.chainId])

      setOrUpdateProvider(this._globalState)

      this.checkForWallet()
    })
  }

  /**
   * Update the current chain.
   */
  updateChain () {
    this.state.chainId = getChainId()
    this.state.chainName = getChain()
    this.state.isCorrectChain = this.state.chainId && checkChain()
  }

  /**
   * Reset the wallet
   */
  resetWallet () {
    storage.setItem(LOCALSTORAGE_KEYS.PREVIOUSLY_CONNECTED, false)
    this.resetWalletState()
  }

  /**
   * Reset the wallet state
   */
  resetWalletState () {
    Object.keys(this._initialState).forEach(key => {
      this.state[key] = this._initialState[key]
    })
  }

  /**
   * Gracefully handle transaction errors.
   *
   * @param {Error} e
   */
  handleTransactionError (e) {
    const code = e.code
    let message

    switch (code) {
      // RPC
      case 'NETWORK_ERROR':
        alert(`You are not connected to the ${CHAIN_IDS[this.state.chainId]}`)
        break
      case 'CALL_EXCEPTION':
        alert(e.reason)
        break
      case 'UNPREDICTABLE_GAS_LIMIT':
        alert(`Couldn't estimate gas price. Please try again.`)
        break
      case 'TRANSACTION_REPLACED':
        alert(e.reason)
        break
      case 'TIMEOUT':
        alert('The operation timed out. Please try again.')
        break

      // Metamask
      case 4001:
        console.info('User rejected transaction')
        break
      case -32602:
        alert('The parameters were invalid')
        break
      case -32603:
        message = e?.data?.message
        alert(`Ethereum Network – ${message}`)
        break

      // Unknown
      default:
        message = e?.data?.message || e?.message
        if (message) alert(message)
    }

    console.error({ ...e })
  }
}
