<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import ContactList from './components/Login.vue'
export default {
  name: 'app',
  components: {
    Login,
    ContactList
  }
}
</script>