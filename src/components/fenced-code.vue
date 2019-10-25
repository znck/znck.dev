<script>
export default {
  props: {
    loc: {
      type: Number,
      required: true,
    },
    highlights: {
      type: Array,
    },
    lang: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    isHighlighted() {
      const lines = {}

      if (this.highlights) {
        this.highlights.forEach(([start, end]) => {
          if (end) {
            for (let i = start; i <= end; ++i) {
              lines[i] = true
            }
          } else {
            lines[start] = true
          }
        })
      }

      return lineNumber => lineNumber in lines
    },
  },
}
</script>

<template>
  <div class="fenced-code" :data-lang="lang">
    <div class="sr-only sr-only-no-focus">
      <slot name="raw" />
    </div>
    <div
      class="highlight-lines"
      v-if="highlights && highlights.length"
      aria-hidden="true"
      v-once
    >
      <div
        v-for="line in loc - 1"
        :key="line"
        :class="{ highlighted: isHighlighted(line) }"
      >
        &nbsp;
      </div>
    </div>
    <div aria-hidden="true">
      <slot />
    </div>
    <div class="line-numbers-wrapper" v-once aria-hidden="true">
      <div class="line-number" v-for="line in loc - 1" :key="line">
        {{ line }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

@include light-mode() {
  @import '../../plugins/vue-cli-plugin-blog/node_modules/prismjs/themes/prism.css';
}

@include dark-mode() {
  @import '../../plugins/vue-cli-plugin-blog/node_modules/prismjs/themes/prism-dark.css';
}

.fenced-code {
  --code-color: #{text-color('dark')};
  --code-background: #{background-color('light')};
  --code-border: #{background-color('dark')};
  --code-line-number: #{text-color('dark')};
  position: relative;
  background-color: var(--code-background);
  border-radius: 0.25rem;
  border: 1px solid var(--code-border);
  margin-top: -1px;
  margin-bottom: calc(2rem - 1px);

  pre {
    @include font('code');

    color: var(--code-color);
    background: transparent;
    position: relative;
    border: none;
    z-index: 1;
    vertical-align: middle;
    overflow: auto;
    margin: 1rem 0 1rem 2.5rem;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none;
    text-shadow: 0 1px white;

    span {
      background: transparent;
    }

    @include dark-mode() {
      text-shadow: 0 1px black;
    }
  }

  @include dark-mode() {
    --code-color: #{text-color('light')};
    --code-background: #{background-color('dark')};
    --code-border: #{background-color('light')};
    --code-line-number: #{text-color('light')};
  }

  &:before {
    position: absolute;
    z-index: 3;
    top: -0.25em;
    right: 0.35em;
    font-size: 0.75em;
    color: var(--code-color);
    content: attr(data-lang);
  }

  &:after {
    content: '';
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 2rem;
    height: 100%;
    border-radius: 6px 0 0 6px;
    border-right: 1px solid var(--code-border);
    background-color: var(--code-background);
  }
}

.highlight-lines {
  user-select: none;
  padding-top: 1.3vw;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 1.42;

  > div {
    background-color: var(--highlight-overlay);
  }

  > :not(.highlighted) {
    --highlight-overlay: #{background-color('overlay')};
  }

  .highlighted {
    position: relative;
  }

  > div:before {
    content: ' ';
    position: absolute;
    z-index: 3;
    left: 0;
    height: 1.41em;
    display: block;
    width: 3.5vw;
    background-color: var(--highlight-overlay);
  }
}

.line-numbers-wrapper {
  position: absolute;
  top: 0;
  width: 2rem;
  text-align: center;
  color: var(--code-line-number);
  background: var(--color-background);
  margin: 1rem 0;
  z-index: 3;
  @include font('code');

  .line-number {
    user-select: none;
    position: relative;
    z-index: 4;
    font-size: 0.75rem;
  }
}
</style>
