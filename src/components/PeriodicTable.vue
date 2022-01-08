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
