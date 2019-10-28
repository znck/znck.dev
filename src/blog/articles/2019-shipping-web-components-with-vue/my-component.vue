<script>
export default {
  props: {
    name: String,
  },
}
</script>

<template>
  <h1 class="hello">Hello {{ name }}</h1>
</template>

<style>
.hello {
  color: blue;
}
</style>
