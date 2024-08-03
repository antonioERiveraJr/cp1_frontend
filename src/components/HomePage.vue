<template>
  <div class="home">
    <div class="header">
      <button @click="logout" class="btn-logout">Logout</button>
    </div>
    <h1>Welcome to BGHMC Management System</h1>
    <p>Select an option below to manage patients or admissions:</p>
    <div class="links">
      <router-link to="/patients" class="link-btn">Manage Patients</router-link>
      <router-link to="/admissions" class="link-btn">Manage Admissions</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
  background-color: #f4f7f6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.btn-logout {
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #c82333;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #666;
  margin-bottom: 30px;
}

.links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.link-btn {
  display: inline-block;
  padding: 15px 25px;
  font-size: 16px;
  color: #fff;
  background-color: #42b983;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.link-btn:hover {
  background-color: #369d72;
  transform: scale(1.05);
}

.link-btn:active {
  background-color: #2a8e5f;
}
</style>
