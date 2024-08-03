<template>
    <div class="patient-edit">
      <h2>Edit Patient</h2>
      <form @submit.prevent="updatePatient">
        <div class="form-group">
          <label for="first_name">First Name:</label>
          <input v-model="patient.first_name" type="text" id="first_name" placeholder="Enter first name" />
          <span v-if="errorMessages.first_name" class="error-message">{{ errorMessages.first_name }}</span>
        </div>
        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <input v-model="patient.last_name" type="text" id="last_name" placeholder="Enter last name" />
          <span v-if="errorMessages.last_name" class="error-message">{{ errorMessages.last_name }}</span>
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
          <input v-model="patient.date_of_birth" type="date" id="date_of_birth" />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <textarea v-model="patient.address" id="address" placeholder="Enter address"></textarea>
        </div>
        <button type="submit">Update Patient</button>
      </form>
      <router-link to="/patients" class="back-link">Back to Patients List</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        patient: {
          first_name: '',
          last_name: '',
          middle_name: '',
          suffix_name: '',
          date_of_birth: '',
          address: '',
        },
        errorMessages: {},
        error: null,
      };
    },
    created() {
      this.fetchPatient();
    },
    methods: {
      fetchPatient() {
        axios.get(`http://localhost:8000/api/patients/${this.$route.params.id}`)
          .then(response => {
            this.patient = response.data;
          })
          .catch(error => {
            console.error('Error fetching patient:', error);
            this.error = 'Failed to load patient details. Please try again later.';
          });
      },
      updatePatient() {
        this.errorMessages = {}; // Reset error messages
        axios.put(`http://localhost:8000/api/patients/${this.$route.params.id}`, this.patient)
          .then(() => {
            this.$router.push('/patients');
          })
          .catch(error => {
            console.error('Error updating patient:', error);
            this.error = 'Failed to update patient. Please try again later.';
            if (error.response && error.response.data.errors) {
              this.errorMessages = error.response.data.errors;
            }
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .patient-edit {
    font-family: Arial, sans-serif;
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  input:focus, textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .back-link {
    display: inline-block;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  </style>
  