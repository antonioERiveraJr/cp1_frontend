<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="username" type="text" placeholder="Username" />
    <div class="password-wrapper">
      <input 
        v-model="password" 
        :type="showPassword ? 'text' : 'password'" 
        placeholder="Password" 
        class="password-input"
      />
      <div class="show-password">
        <input 
          type="checkbox" 
          v-model="showPassword" 
          id="show-password"
        />
        <label for="show-password">Show</label>
      </div>
    </div>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password
        });
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/home');
        } else {
          alert('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.password-input {
  flex: 1;
  margin-right: 10px;
}

.show-password {
  display: flex;
  align-items: center;
}

.show-password input[type="checkbox"] {
  margin-right: 5px;
}

button {
  width: 100%;
  padding: 10px;
}

p {
  margin-top: 20px;
}

a {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
