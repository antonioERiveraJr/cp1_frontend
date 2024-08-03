<template>
  <div class="container">
    <h2 class="title">Create Patient</h2>
    <form @submit.prevent="createPatient" class="patient-form">
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <input v-model="patient.last_name" type="text" id="last_name" required placeholder="Enter last name" />
      </div>
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <input v-model="patient.first_name" type="text" id="first_name" required placeholder="Enter first name" />
      </div>
      <div class="form-group">
        <label for="middle_name">Middle Name:</label>
        <input v-model="patient.middle_name" type="text" id="middle_name" placeholder="Enter middle name" />
      </div>
      <div class="form-group">
        <label for="suffix_name">Suffix Name:</label>
        <input v-model="patient.suffix_name" type="text" id="suffix_name" placeholder="Enter suffix name" />
      </div>
      <div class="form-group">
        <label for="date_of_birth">Date of Birth:</label>
        <input v-model="patient.date_of_birth" type="date" id="date_of_birth" required />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea v-model="patient.address" id="address" rows="4" required placeholder="Enter address"></textarea>
      </div>
      <button type="submit" class="submit-button">Create Patient</button>
      <button type="button" @click="goBack" class="back-button">Back</button>
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      patient: {
        last_name: '',
        first_name: '',
        middle_name: '',
        suffix_name: '',
        date_of_birth: '',
        address: '',
      },
      error: null,
    };
  },
  methods: {
    async createPatient() {
      try {
        await axios.post('http://localhost:8000/api/patients', this.patient);
        alert('Patient created successfully!');
        this.$router.push('/patients'); // Redirect to patients list or another page
      } catch (error) {
        if (error.response && error.response.data.errors) {
          console.error('Validation errors:', error.response.data.errors);
          this.error = 'Registration failed. ' + JSON.stringify(error.response.data.errors);
        } else {
          this.error = 'An error occurred during registration. Please try again.';
        }
      }
    },
    goBack() {
      this.$router.push('/patients'); // Redirect to home page
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.patient-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="date"] {
  padding: 8px;
}

textarea {
  resize: vertical;
}

.submit-button, .back-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
}

.submit-button:hover, .back-button:hover {
  background-color: #45a049;
}

.back-button {
  background-color: #007bff;
}

.back-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
