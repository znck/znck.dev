<template>
  <div class="layout">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@design';

.layout {
  margin: 0 auto;

  @include above('desktop') {
    width: 800px;
  }
}
</style>