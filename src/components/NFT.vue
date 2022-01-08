<template>
<div>
  <article>
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
    overflow: hidden;
  }

  article {
    background-color: var(--beige);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    text-align: center;
    padding: 1rem;
    box-shadow: 0 0.2rem 0.15rem -0.1rem rgba(0, 0, 0, 0.1);

    * {
      width: 100%;
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
