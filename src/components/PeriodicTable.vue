<template>
  <!-- <nav>
    <button
      @click="filter = filter === 'minted' ? '' : 'minted'"
      class="btn"
      :class="{ active: filter === 'minted' }"
    >Minted</button>
    <button
      @click="filter = filter === 'available' ? '' : 'available'"
      class="btn"
      :class="{ active: filter === 'available' }"
    >Available</button>
  </nav> -->

  <div class="periodic-table" :class="[ filter ]">
    <NFT
      v-for="nft in tokens"
      :key="nft.id"
      :token-id="nft.id"
      :name="nft.name"
      :description="nft.description"
      :group="nft.group"
      :exists="nft.minted"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import NFT from './NFT.vue'
import nfts, { fetchMinted } from './../store/nfts'

const tableNFTs = nfts.slice(1, 129)

const minted = ref([])
onMounted(async () => {
  minted.value = await fetchMinted()
})

const mintedIds = computed(() => minted.value.map(m => m.id))
const tokens = computed(() => tableNFTs.map(t => ({
  ...t,
  minted: mintedIds.value.includes(t.id),
})))

const filter = ref('')
const filteredTokens = computed(() => {
  if (filter.value === 'minted') return tokens.value.filter(t => t.minted)
  if (filter.value === 'available') return tokens.value.filter(t => !t.minted)
  return tokens.value
})
</script>

<style lang="postcss" scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0 0 1rem;

  .btn {
    &:--highlight:not(.active) {
      background-color: inherit;
      border-color: inherit;
      color: inherit;
    }
  }
}

.periodic-table {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  > *:nth-child(2) {
    grid-column: 3;
  }

  &.minted {
    :deep(.listing.exists) {
      opacity: 1;
    }
    :deep(.listing:not(.exists)) {
      opacity: 0.2;
      transform: scale(0.9);
    }
  }
  &.available {
    :deep(.listing.exists) {
      opacity: 0.2;
      transform: scale(0.9);
    }
    :deep(.listing:not(.exists)) {
      opacity: 1;
    }
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
    grid-template-columns: repeat(14, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 14;
    }
  }

  @media (--xxl) {
    grid-template-columns: repeat(14, minmax(0, 1fr));

    > *:nth-child(2) {
      grid-column: 14;
    }
  }
}
</style>
