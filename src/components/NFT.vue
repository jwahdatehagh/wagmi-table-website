<template>
  <article>
    <h1>#{{ tokenId }} {{ name }}</h1>
  </article>
</template>

<script>
export default {
  props: {
    tokenId: Number,
    name: String,
  },
}
</script>
