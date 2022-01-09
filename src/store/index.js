import { shallowReactive, computed } from 'vue'
import { ethers } from 'ethers'
import Wallet from './Wallet'
import { setOrUpdateProvider } from './update-provider'
import { abi } from './abis/WagmiTable.sol/WagmiTable.json'

const contractAddress = import.meta.env.VITE_WAGMI_TABLE_CONTRACT

export const state = shallowReactive({
  wallet: null,
  contract: null,
  provider: null,

  saleStart: null,
})

export const saleStarted = () => state.saleStart < (Date.now() / 1000)

export const fetchSaleStart = async () => {
  state.saleStart = (await state.contract.saleStart()).toNumber()
}

setOrUpdateProvider(state)
state.wallet = new Wallet(state)
state.contract = new ethers.Contract(contractAddress, abi, state.provider)

fetchSaleStart()
