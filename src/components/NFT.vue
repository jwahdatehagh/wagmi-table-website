<template>
<div>
  <div class="listing">
    <article @click="open">
      <img :src="`/images/${tokenId}@sm.png`" :alt="`#${tokenId} ${name}`">
      <p>{{ tokenId }}</p>
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
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

      <p v-if="owner" class="owner">
        Owned by
        <a :href="`https://etherscan.io/address/${owner}`" target="_blank">{{ shortOwner }}</a>
      </p>

      <p v-if="! minted" class="price">0.2 Ξ</p>

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

    </div>
  </Modal>
</div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import shortAddress from '../helpers/short-address'
import { state } from './../store'

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
      minted: null,
    }
  },

  computed: {
    wallet () { return state.wallet },
    address () { return this.wallet?.state.address },
    minting () { return this.wallet?.state.minting },
    shortOwner () { return this.owner && shortAddress(this.owner) }
  },

  methods: {
    open () {
      this.showDetail = true

      this.checkTokenMintStatus()
    },

    async checkTokenMintStatus () {
      this.owner = await state.contract.ownerOf(this.tokenId)
      this.minted = this.owner > 0
    },

    async mint () {
      state.contract = await this.wallet.ensureSigned(state.contract)
      await this.wallet.mint(this.tokenId)
      this.checkTokenMintStatus()
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

    > button {
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: var(--grey-800);

      &:--highlight {
        color: black;
      }
    }

    div {
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

      p.description {
        margin: -2rem 0 1rem;
      }

      p.price {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
        margin: 1rem 0;
      }

      button {
        margin-top: 1.5rem;
      }
    }

    @media (--md) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2rem;

      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20% 0;
      }
    }
  }
</style>
