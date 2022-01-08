import { shallowReactive } from 'vue'
import Wallet from './../helpers/Wallet'
import { setOrUpdateProvider } from './update-provider'

export const state = shallowReactive({
  wallet: null,
  provider: null,
})

state.wallet = new Wallet(state)
setOrUpdateProvider(state)
