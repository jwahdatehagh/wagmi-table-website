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
    padding: 5rem 1rem 3rem;
    width: 16rem;
    margin: 0 auto;
  }
</style>
