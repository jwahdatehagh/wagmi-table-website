<template>
<div>
  <div class="listing">
    <article @click="open">
      <img :src="`/images/${tokenId}@sm.png`" :alt="`#${tokenId} ${name}`">
    </article>
  </div>

  <Modal
    v-model="showDetail"
    @close="showDetail = false"
    attach="body"
    esc-to-close
  >
    <button @click="showDetail = false">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    </button>
    <img :src="`/images/${tokenId}.png`" :alt="`#${tokenId} ${name}`">
    <div>
      <h1>
        <!-- <small>#{{ tokenId }}</small> -->
        {{ name }}
      </h1>
      <p class="description">{{ description }}</p>

      <div v-if="minted" class="links">
        <a :href="etherscanUrl" target="_blank" class="owner btn btn-block">Owned by {{ ownerDisplay }}</a>

        <a
          :href="openSeaUrl"
          target="_blank"
          class="opensea btn btn-block"
        >View on OpenSea</a>
      </div>
      <p v-else class="price">{{ priceInETH }} Ξ</p>

      <button
        v-if="! minting && ! minted"
        @click="mint"
        class="btn btn-primary btn-block"
      >Mint</button>
      <button
        v-else-if="minting"
        class="btn btn-primary btn-block"
        disabled
      >Minting</button>
      <p v-if="! saleStarted && ! minted" class="sale-start">
        Sale starts {{ saleStart }}
      </p>

    </div>
  </Modal>
</div>
</template>

<script>
import { ethers } from 'ethers'
import { VueFinalModal } from 'vue-final-modal'
import { checkENS } from '../helpers/ens'
import shortAddress from '../helpers/short-address'
import { state, saleStarted } from './../store'

const DEFAULT_PRICE = ethers.utils.parseEther('0.2')

export default {
  components: {
    Modal: VueFinalModal,
  },

  props: {
    tokenId: Number,
    name: String,
    description: String,
    group: String,
  },

  data () {
    return {
      showDetail: false,
      owner: null,
      ownerEns: null,
      minted: null,
      price: DEFAULT_PRICE,
    }
  },

  computed: {
    // Wallet state
    wallet () { return state.wallet },
    address () { return this.wallet?.state.address },
    minting () { return this.wallet?.state.minting },

    // Token state
    saleStart () { return (new Date(state.saleStart * 1000)).toLocaleString() },
    saleStarted () { return saleStarted() },
    priceInETH () { return ethers.utils.formatEther(this.price) },
    shortOwner () { return this.owner && shortAddress(this.owner) },
    ownerDisplay () { return this.ownerEns || this.shortOwner },

    // Links
    etherscanUrl () {
      return `${import.meta.env.VITE_ETHERSCAN_URL}/address/${this.owner}`
    },
    openSeaUrl () {
      const openSea = import.meta.env.VITE_OPENSEA_URL
      const contract = import.meta.env.VITE_WAGMI_TABLE_CONTRACT

      return `${openSea}/assets/${contract}/${this.tokenId}`
    },
  },

  methods: {
    open () {
      this.showDetail = true
      this.checkTokenStatus()
    },

    async checkTokenStatus () {
      try {
        this.owner = await state.contract.ownerOf(this.tokenId)
        this.ownerEns = await checkENS(this.owner)
        this.minted = true
      } catch (e) {
        this.owner = 0
        this.minted = false

        const price = await state.contract.priceForToken(this.tokenId)
        this.price = price > 0 ? price : DEFAULT_PRICE
      }
    },

    async mint () {
      state.contract = await this.wallet.ensureSigned(state.contract)
      await this.wallet.mint(this.tokenId, this.price)
      this.checkTokenStatus()
    }
  },
}
</script>

<style lang="postcss" scoped>
  div.listing {
    height: 0;
    width: 100%;
    padding-bottom: 100%;
    position: relative;
  }

  img {
    background-color: var(--beige);
  }

  article {
    background-color: var(--beige);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--beige-dark);
    border-radius: 0.15rem;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    text-align: center;
    padding: 1rem;
    box-shadow: 0 0.2rem 0.15rem -0.1rem rgba(0, 0, 0, 0.1);
    transition: all var(--speed-fast);

    &:--highlight {
      transform: scale(0.975);
      box-shadow: 0 0.1rem 0.1rem -0.05rem rgba(0, 0, 0, 0.06);
    }

    * {
      width: 100%;
    }

    img {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--beige);
    }

    p {
      font-size: var(--font-size-sm);

      &:first-child {
        font-weight: var(--font-weight-medium);
      }
    }

    h1 {
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-lg);
    }
  }

  :deep(.vfm__container) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  :deep(.vfm__content) {
    position: fixed;
    top: 2rem;
    width: calc(100vw - 2rem);
    max-width: 60rem;
    height: auto;
    max-height: calc(100vh - 4rem);
    border: 1px solid var(--grey-500);
    border-radius: 0.25rem;
    background-color: white;
    overflow: hidden;
    margin: 0 auto;
    padding: 1rem;
    display: grid;
    overflow-y: auto;
    -webkit-overflow-scrolling: auto;

    img {
      border: 1px solid var(--beige-dark);
      border-radius: 0.15rem;
    }

    > button {
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: var(--grey-800);

      &:--highlight {
        color: black;
      }
    }

    > div {
      margin: 1rem 0;

      h1 {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin: 0 0 1rem;

        small {
          display: block;
          font-size: var(--font-size-sm);
          margin-bottom: -0.5em;
        }
      }

      .links {
        display: grid;
        gap: 1rem;
        justify-content: stretch;
        margin: 2rem 0;
      }

      .description {
        margin: -1.5rem 0 1rem;
      }

      .owner {
        margin-bottom: auto;
      }

      .price {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
        margin: 1.5rem 0 2rem;
      }

      button {
        margin-top: 1.5rem;
      }

      .sale-start {
        font-size: var(--font-size-sm);
        text-align: center;
        color: var(--grey-800);
        margin: 0.5rem 0;
      }
    }

    @media (--md) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2rem;

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 1rem 0 0;
      }
    }
  }
</style>
