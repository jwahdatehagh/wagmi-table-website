<template>
  <Modal v-model="open">
    <h1>Test</h1>
  </Modal>
</template>

<script>
import { $vfm, VueFinalModal } from 'vue-final-modal'

export default {
  components: {
    Modal: VueFinalModal,
  },

  props: {
    open: Boolean,
  },
}
</script>
