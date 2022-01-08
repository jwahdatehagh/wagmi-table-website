<template>
  <header>
    <NFT :token-id="0" name="Wagmi" />
  </header>
</template>

<script setup>
import NFT from './NFT.vue'
</script>

<style lang="postcss" scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 1rem 6rem;
    margin: 0 auto;
    width: 16rem;

    @media (--md) {
      padding: 5rem 1rem 3rem;
    }

    @media (--xxl) {
      width: 12vw;
      width: 20rem;
    }
  }
</style>
