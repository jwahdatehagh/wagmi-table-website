<template>
  <div class="periodic-table">
    <NFT
      v-for="nft in nfts"
      :key="nft.id"
      :token-id="nft.id"
      :name="nft.name"
    />
  </div>
</template>

<script setup>
import NFT from './NFT.vue'
import nfts from './../store/nfts'
</script>

<style lang="postcss" scoped>
.periodic-table {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  > *:nth-child(2) {
    grid-column: 3;
  }

  @media (--sm) {
    grid-template-columns: repeat(4, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 4;
    }
  }

  @media (--md) {
    grid-template-columns: repeat(5, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 5;
    }
  }

  @media (--lg) {
    grid-template-columns: repeat(8, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 8;
    }
  }

  @media (--xl) {
    grid-template-columns: repeat(12, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 12;
    }
  }

  @media (--xxl) {
    grid-template-columns: repeat(14, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 14;
    }
  }

  @media (--xxxl) {
    grid-template-columns: repeat(14, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 14;
    }
  }
}
</style>
