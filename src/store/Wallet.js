import { ethers } from 'ethers'
import BaseWallet from './../helpers/Wallet'

const state = {
  minting: false,
}

const PRICE = ethers.utils.parseEther('0.2')

export default class Wallet extends BaseWallet {
  constructor (globalState) {
    super(globalState, state)
  }

  get wagmiContract () {
    return this._globalState.contract
  }

  async mint (tokenId) {
    try {
      this.minting = true
      const transaction = await this.wagmiContract.mint(tokenId, this.state.address, { value: PRICE })
      await transaction.wait()
      this.minting = false
    } catch (e) {
      this.handleTransactionError(e)
    }
  }
}
