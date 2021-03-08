<template>
  <div id="app">
     <router-view />
  </div>
</template>

<script>
import Login from './components/Login.vue'
import ContactList from './components/Login.vue'
import AddContact from '@/components/AddContact'
export default {
  name: 'app',
  components: {
    Login,
    ContactList,
    AddContact
  }
}
</script>