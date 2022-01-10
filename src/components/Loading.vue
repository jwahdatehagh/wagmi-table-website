<template>
  <div class="dual-ring"></div>
</template>

<style lang="postcss" scoped>
.dual-ring {
  display: flex;
  width: 100%;
  height: 10rem;
  justify-content: center;
  align-items: center;
}
.dual-ring:after {
  content: "";
  display: block;
  width: 3rem;
  height: 3rem;
  margin: 0.5rem;
  border-radius: 50%;
  border: 0.25rem solid var(--grey-500);
  border-color: var(--grey-500) transparent var(--grey-500) transparent;
  animation: dual-ring 1.2s linear infinite;
}
@keyframes dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
