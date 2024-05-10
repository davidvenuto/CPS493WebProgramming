<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { refSession } from './viewModel/session';

const session = refSession();
</script>

<template>
  <div class="wrapper">
    <NavBar />
    <div class="container">
      <progress class="progress is-small is-primary" max="100" v-show="session.isLoading"></progress>
      <RouterView /> 
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin-right: 2rem;
  }
</style>