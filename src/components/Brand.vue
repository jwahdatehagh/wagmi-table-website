<template>
  <h1>
    <img src="/logo.png" alt="WAGMI table created by @aaraalto">
    <span>WAGMI <span>Table</span></span>
    <small>Created by <a href="https://twitter.com/aaraalto" target="_blank">@aaraalto</a></small>
  </h1>
</template>

<style lang="postcss" scoped>
h1 {
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 0.75rem;

  img {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  span {
    text-transform: uppercase;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin: 0 0 -0.25em;

    span {
      font-weight: var(--font-weight-light);
    }
  }

  small {
    font-weight: var(--font-weight-medium);
    margin-left: 0.25em;
  }
}
</style>
