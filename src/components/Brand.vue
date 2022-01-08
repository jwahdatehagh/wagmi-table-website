<template>
  <h1>
    <img src="/logo.png" alt="WAGMI table created by @aaraalto">
    <span>W<span> T</span></span>
    <span>WAGMI <span>Table</span></span>
    <small><span>Created by </span><a href="https://twitter.com/aaraalto" target="_blank">@aaraalto</a></small>
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

  > span {
    text-transform: uppercase;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin: 0 0 -0.25em;

    span {
      font-weight: var(--font-weight-light);
    }

    &:nth-child(2) {
      display: none;
    }
  }

  small {
    font-weight: var(--font-weight-medium);
    color: var(--grey-800);
    margin-left: 0.25em;
  }

  @media (--max-sm) {
    > span:nth-child(2) {
      display: block;
    }

    > span:nth-child(3) {
      display: none;
    }

    > small span {
      display: none;
    }
  }
}
</style>
