export const CHAIN_IDS = {
  '1': 'Ethereum Main Network (Mainnet)',
  '3': 'Ropsten Test Network',
  '4': 'Rinkeby Test Network',
  '5': 'Goerli Test Network',
  '42': 'Kovan Test Network',
  '1337': 'Local Test Network',
}

export const getChainId = () => {
  return parseInt(window.ethereum?.chainId)
}

export const getChain = () => {
  return CHAIN_IDS[getChainId()]
}

export const correctChainID = () => {
  return parseInt(import.meta.env.VITE_CHAIN_ID)
}

export const correctChainName = () => {
  return CHAIN_IDS[correctChainID()]
}

export const checkChain = () => {
  if (! getChainId()) return true

  return getChainId() === correctChainID()
}

export const checkAndNotifyChain = () => {
  const CHAIN_ID = getChainId()
  if (CHAIN_ID && ! checkChain()) {
    const SITE_CHAIN_ID = correctChainID()
    const SITE_CHAIN_NAME = CHAIN_IDS[SITE_CHAIN_ID]
    const CHAIN_NAME = CHAIN_IDS[CHAIN_ID]

    alert(`You are connected to ${CHAIN_NAME} but this application works only on ${SITE_CHAIN_NAME}. Please switch to ${SITE_CHAIN_NAME} in MetaMask.`)
    console.error('Connected to the wrong network')
    return false
  }

  return true
}
