<template>
  <header>
    <NFT
      :token-id="wagmi.id"
      :name="wagmi.name"
      :description="wagmi.description"
      :group="wagmi.group"
    />
  </header>
</template>

<script setup>
import NFT from './NFT.vue'
import nfts from './../store/nfts'

const wagmi = nfts[0]
</script>

<style lang="postcss" scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 1rem 6rem;
    margin: 0 auto;

    @media (--md) {
      padding: 5rem 1rem 3rem;
    }

    > :deep(*) {
      width: 16rem;

      @media (--xxl) {
        width: 20rem;
      }
    }
  }
</style>
