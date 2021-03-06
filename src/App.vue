<template>
  <div id="app">
    <a href="#main-content" class="sr-only">Skip to main content</a>
    <router-link to="/" class="home-btn font-ui" exact-active-class="hidden"
      >Home</router-link
    >

    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    const style =
      document.getElementById('hue-of-the-day') ||
      document.createElement('style')

    style.id = 'hue-of-the-day'
    style.innerText = `:root { --hue-of-the-day: ${this.hue}; }`

    document.head.appendChild(style)
  },

  computed: {
    hue() {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      const diff = now - start
      const oneDay = 1000 * 60 * 60 * 24
      const day = Math.floor(diff / oneDay)

      return day + 'deg'
    },
  },
}
</script>

<style lang="scss">
@import '@design';

html,
body {
  margin: 0;
  min-height: 100%;
}

html {
  font-size: size('base');
  line-height: line-height('base');

  color: text-color('dark');
  background-color: background-color('light');
  background-image: url('./assets/grid-dark.svg');
  @include high-density-display() {
    background-image: url('./assets/grid-dark-2x.svg');
  }

  // dark mode
  @include dark-mode() {
    color: text-color('light');
    background-color: background-color('today');
    background-image: url('./assets/grid-light.svg');
    @include high-density-display() {
      background-image: url('./assets/grid-light-2x.svg');
    }
  }
}

html,
.font-default {
  @include font-family('default');
}

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6,
.font-heading {
  @include font-family('heading');
}

h1 {
  margin-top: 2rem;
  margin-bottom: 2rem;
  @include font('h1');
}

h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  @include font('h2');
}

h3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  @include font('h3');
}

p {
  margin: 0;
  margin-bottom: 2rem;
  @include font('p');
}

a {
  color: currentColor;
}

.font-primary {
  @include font-family('primary');
}

.font-heading,
.font-ui {
  @include font-family('heading');
}

.font-alternate {
  @include font-family('alternate');
}

.home-btn {
  @include font('ui');
  letter-spacing: 0.1ch;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  position: absolute;
  padding: 0 0.5rem;
  border-radius: radius('small');
  top: 1rem;
  right: 1rem;
  margin: -1px 0 0 -1px;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  background-color: background-color('overlay');
  color: text-color('light');

  @include above('page') {
    position: fixed;
    right: unset;
    left: 1rem;
  }

  .icon-home {
    width: 1rem;
    height: 1rem;
  }
}

@media print {
  .home-btn {
    display: none;
  }
}

.hidden {
  display: none !important;
}

/*
        Improved screen reader only CSS class: https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034
*/
.sr-only,
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

.sr-only:focus,
.sr-only:active {
  clip: auto !important;
  -webkit-clip-path: none !important;
  clip-path: none !important;
  height: auto !important;
  margin: auto !important;
  overflow: visible !important;
  width: auto !important;
  white-space: normal !important;
  background: white;
  z-index: 999999;
}

h2,
h3 {
  position: relative;
}
.heading-permalink {
  position: absolute;
  left: -1em;
  opacity: 0;
  transition: opacity 0.3s;
  text-decoration: none;
}

h2:hover .heading-permalink,
h3:hover .heading-permalink {
  opacity: 1;
}
</style>
