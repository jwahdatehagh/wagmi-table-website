import { state } from './../store'

/**
* Try to get the ENS domain name for the current address.
*/
export const checkENS = async address => {
  try {
    return await state.provider.lookupAddress(address)
  } catch (e) {
    console.warn(e.message)
  }
}
