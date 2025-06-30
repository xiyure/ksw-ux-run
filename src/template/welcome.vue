<script setup>
import { ref } from 'vue'
import { loadDependency } from './ksw-ux'
loadDependency()

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <k-input v-model="msg" />
  <k-button main type="warning">Click me</k-button>
  <k-tag type="success">Success Tag</k-tag>
</template>
