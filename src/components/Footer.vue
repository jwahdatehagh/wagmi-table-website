<template>
  <aside>
    <NFT
      :token-id="ps.id"
      :name="ps.name"
      :description="ps.description"
      :group="ps.group"
    />
  </aside>

  <footer>
    <a :href="etherscanUrl" target="_blank">Smart Contract</a>
    <a :href="openSeaUrl" target="_blank">OpenSea</a>
    <a href="https://twitter.com/aaraalto" target="_blank">Aar Aalto</a>
  </footer>
</template>

<script setup>
import nfts from '../store/nfts'
import NFT from './NFT.vue'

const ps = nfts[129]

const contract = import.meta.env.VITE_WAGMI_TABLE_CONTRACT

const etherscanUrl = `${import.meta.env.VITE_ETHERSCAN_URL}/address/${contract}`
const openSeaUrl = `${import.meta.env.VITE_OPENSEA_URL}/collection/wagmitable`
</script>

<style lang="postcss" scoped>
aside {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;

  > :deep(*) {
    width: 4rem;
  }
}

footer {
  margin: 0 -1rem -1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: var(--font-weight-bold);
  background-color: var(--beige);
  border-top: 1px solid var(--beige-dark);

  a {
    &:--highlight {
      text-decoration: underline;
    }

    &:nth-child(2) {
      margin-bottom: 4rem;
    }
  }

  @media (--md) {
    margin: 0 -2rem -2rem;
    padding: 2rem;
  }

  @media (--xl) {
    margin: 0 -4rem -4rem;
    padding: 2rem 4rem;
  }

  @media (--xxl) {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-left: 1px solid var(--beige-dark);
    border-right: 1px solid var(--beige-dark);
  }
}
</style>
