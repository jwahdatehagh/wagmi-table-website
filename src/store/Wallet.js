import BaseWallet from './../helpers/Wallet'
import { BigNumber } from '@ethersproject/bignumber'

const GAS_LIMIT = BigNumber.from(90000)

const state = {
  minting: false,
}

export default class Wallet extends BaseWallet {
  constructor (globalState) {
    super(globalState, state)
  }

  get wagmiContract () {
    return this._globalState.contract
  }

  async mint (tokenId, value) {
    try {
      this.state.minting = true
      const transaction = await this.wagmiContract.mint(tokenId, this.state.address, {
        value,
        gasLimit: GAS_LIMIT,
      })
      await transaction.wait()
    } catch (e) {
      this.handleTransactionError(e)
    }
    this.state.minting = false
  }
}
