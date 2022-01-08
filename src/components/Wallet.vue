<template>
  <button
    v-if="! connected"
    @click="connect"
    class="btn"
  >
    Connect Wallet
  </button>
  <button
    v-else
    class="btn"
  >
    <strong><span>{{ ethBalance }}</span> Ξ</strong>
    <span v-if="ens">{{ ens }}</span>
    <span v-else>{{ shortAddress }}</span>
  </button>
</template>

<script>
import { state } from './../store'

export default {
  computed: {
    wallet () { return state.wallet },
    connected () { return this.wallet?.state.connected },
    ethBalance () { return this.wallet?.ethBalance },
    shortAddress () { return this.wallet?.shortAddress },
    ens () { return this.wallet?.state.domainName },
  },

  methods: {
    async connect () {
      console.log('Trying to connect')
      await state.wallet.connect()
    }
  }
}
</script>

<style lang="postcss" scoped>
button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;

  strong:first-child {
    display: flex;
    align-items: baseline;

    > span:first-child {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 4em;
    }

    + span {
      display: block;
      font-size: var(--font-size-sm);
      color: var(--grey-800);
      margin-top: -0.25em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:--highlight {
    strong + span {
      color: var(--grey-200);
    }
  }

  @media (--max-md) {
    max-width: 8rem;
  }

  @media (--md) {
    right: 2rem;
  }

  @media (--xl) {
    right: 4rem;
  }
}
</style>
