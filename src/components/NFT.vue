<template>
<div>
  <article>
    <img :src="`/images/${tokenId}@sm.png`" :alt="`#${tokenId} ${name}`">
    <p>{{ tokenId }}</p>
    <h1>{{ name }}</h1>
    <p>description</p>
  </article>
</div>
</template>

<script>
export default {
  props: {
    tokenId: Number,
    name: String,
  },
}
</script>

<style lang="postcss" scoped>
  div {
    height: 0;
    width: 100%;
    padding-bottom: 100%;
    position: relative;
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
</style>
