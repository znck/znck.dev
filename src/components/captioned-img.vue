<script>
export default {
  props: {
    alt: {
      type: String,
    },
  },

  mounted() {
    window.addEventListener('resize', this.onResize, { passive: true })
    const observer = new ResizeObserver(this.onResize)

    observer.observe(this.$refs.wrapper)
    this.onResize()

    this.$on('hook:beforeDestroy', () => observer.disconnect())
  },

  beforeDestroyed() {
    window.removeEventListener('resize', this.onResize)
  },

  data: () => ({
    gridAdjust: 1,
  }),

  methods: {
    onResize() {
      const { clientHeight: height } = this.$refs.wrapper
      const eHeight = Math.ceil(height / 8) * 8
      this.gridAdjust = eHeight - height
    },
  },
}
</script>

<template>
  <figure class="figure">
    <div
      class="wrapper"
      ref="wrapper"
      :style="{ paddingBottom: gridAdjust + 'px' }"
    >
      <slot />
    </div>

    <figcaption>{{ alt }}</figcaption>
  </figure>
</template>

<style lang="scss">
@import '@design';

.figure {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  > .wrapper {
    flex: 1;
  }

  img {
    display: block;
    max-width: 100%;
    object-fit: contain;
  }

  figcaption {
    text-align: center;
    @include font('ui');
    font-family: font-family('ui');
    margin-top: 1rem;
  }
}
</style>
