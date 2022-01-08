<template>
  <header>
    <div>
      <NFT :token-id="0" name="Wagmi" />
    </div>
    <h1>
      <span class="sr-only">Wagmi</span> - Table
    </h1>
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
    padding: 1rem;
    margin-bottom: 4rem;

    > div {
      width: 12rem;
    }

    > h1 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      margin-left: 1rem;
    }
  }
</style>
