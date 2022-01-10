import { ethers } from 'ethers'
import { checkChain } from './../helpers/chains'

export const setOrUpdateProvider = state => {
  // Reset existing provider
  if (state.provider) {
    state.provider.removeAllListeners()
    console.info('Reset provider')
  }

  // Initialise new provider
  state.provider = window.ethereum && checkChain()
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.StaticJsonRpcProvider(import.meta.env.VITE_RPC_PROVIDER)

  // If we have a contract, update the provider it uses
  state.contract?.connect(state.provider)

  // If we have a wallet, update the provider it uses
  state.wallet?.updateProvider(state.provider)
}
