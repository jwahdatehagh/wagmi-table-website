import { createClient } from '@urql/core'

const APIURL = 'https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph'

const client = createClient({
  url: APIURL,
})

const contract = import.meta.env.VITE_WAGMI_TABLE_CONTRACT.toLowerCase()

export const fetchOverview = async () => {
  const query = `{
    tokenContract(id: "${contract}") {
      numTokens
      numOwners
    }
  }`

  const response = await client.query(query).toPromise()

  return response?.data || {
    numTokens: 0,
    numOwners: 0,
  }
}

export const fetchTokens = async () => {
  const query = `{
    tokens (where: {contract:"${contract}"}) {
      tokenID
      owner {
        id
      }
      mintTime
    }
  }`

  const response = await client.query(query).toPromise()

  return response?.data?.tokens
}
