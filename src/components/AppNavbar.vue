<template>
  <nav>
    <ul>
      <li v-if="!loggedIn">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </li>
      <li v-if="loggedIn">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      loggedIn: !!localStorage.getItem('user')
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.loggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Navbar styles here */
 
ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline;
  margin-right: 10px;
}
button {
  cursor: pointer;
}
</style>
