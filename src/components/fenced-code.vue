<script>
export default {
  props: {
    loc: {
      type: Number,
      required: true,
    },
    highlights: {
      type: [Array, String],
    },
    lang: {
      type: String,
      default: 'text',
    },
    code: {
      type: String,
    },
  },
  computed: {
    rawCode() {
      return this.code.replace(/\\n/g, '\n').replace(/\\t/g, '\t')
    },
    parsedHighlights() {
      if (this.highlights) {
        if (Array.isArray(this.highlights)) return this.highlights

        try {
          return JSON.parse(this.highlights)
        } catch {
          // noop
        }
      }

      return undefined
    },
    isHighlighted() {
      const lines = {}

      if (this.parsedHighlights) {
        this.parsedHighlights.forEach(([start, end]) => {
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
  <div class="fenced-code">
    <div class="fenced-code-language" :id="`code-snippet${_uid}`">
      {{ lang.toUpperCase() }}
      <span class="sr-only-no-focus">&nbsp; code snippet</span>
    </div>
    <div class="sr-only-no-focus" :aria-describedby="`code-snippet${_uid}`">
      <slot />
    </div>
    <div
      class="highlight-lines"
      v-if="parsedHighlights && parsedHighlights.length"
      aria-hidden="true"
      role="presentation"
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
    <div aria-hidden="true" v-html="rawCode" />
    <div
      class="line-numbers-wrapper"
      v-once
      aria-hidden="true"
      role="presentation"
    >
      <div class="line-number" v-for="line in loc - 1" :key="line">
        {{ line }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../design/_index.scss';

@include light-mode() {
  @import '../../node_modules/prismjs/themes/prism';
}

@include dark-mode() {
  @import '../../node_modules/prismjs/themes/prism-dark';
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
    padding-right: 0.5rem;
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

  .fenced-code-language {
    position: absolute;
    z-index: 3;
    top: -0.25em;
    right: 0.35em;
    font-size: 0.75em;
    color: var(--code-color);
    font-family: font-family('code');
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
  margin-top: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-left: calc(2rem + 1px);
  z-index: 4;
  @include font('code');

  --highlight-overlay: rgba(255, 255, 255, 0.75);
  @include dark-mode() {
    --highlight-overlay: rgba(0, 0, 0, 0.75);
  }

  > div {
    background-color: var(--highlight-overlay);

    &:before {
      content: ' ';
      position: absolute;
      z-index: 3;
      left: 0;
      display: block;
      width: 2rem;
      height: 2rem;
      background-color: var(--highlight-overlay);
    }
  }

  .highlighted {
    position: relative;
    background-color: transparent;

    &:before {
      display: none;
    }
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

.sr-only-no-focus {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important; /* 3 */
}

code {
  font-family: font-family('code');
  line-height: 1; // Remove 1px added in paragraph height.
}
</style>
