<template>
  <footer>
    <a :href="etherscanUrl" target="_blank">Etherscan Verified Contract</a>
    <a :href="openSeaUrl" target="_blank">OpenSea Collection</a>
    <a href="https://twitter.com/aaraalto" target="_blank">Aaraalto on Twitter</a>
  </footer>
</template>

<script>
export default {
  computed: {
    etherscanUrl () {
      const contract = import.meta.env.VITE_WAGMI_TABLE_CONTRACT

      return `${import.meta.env.VITE_ETHERSCAN_URL}/address/${contract}`
    },
    openSeaUrl () {
      return `${import.meta.env.VITE_OPENSEA_URL}/collection/wagmitable`
    },
  },

}
</script>

<style lang="postcss" scoped>
footer {
  padding: 5rem 0 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--grey-800);
  text-transform: uppercase;

  a {
    &:--highlight {
      color: black;
    }
  }


  @media (--md) {
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
  }
}
</style>
