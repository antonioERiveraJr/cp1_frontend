<template>
    <div class="admission-create">
      <h2>Create Admission</h2>
      <form @submit.prevent="checkExistingAdmission">
        <div class="form-group">
          <label for="patient_id">Patient ID:</label>
          <input v-model="admission.patient_id" type="text" id="patient_id" disabled />
        </div>
        <div class="form-group">
          <label for="ward">Ward:</label>
          <input v-model="admission.ward" type="text" id="ward" />
        </div>
        <div class="form-group">
          <label for="datetime_of_admission">Date & Time of Admission:</label>
          <input v-model="admission.datetime_of_admission" type="datetime-local" id="datetime_of_admission" />
        </div>
        <div v-if="existingAdmission" class="existing-admission-info">
          <p>This patient is already admitted:</p>
          <p><strong>Ward:</strong> {{ existingAdmission.ward }}</p>
          <p><strong>Admission Date:</strong> {{ formatDate(existingAdmission.datetime_of_admission) }}</p>
        </div>
        <div class="form-actions">
          <button v-if="!existingAdmission" type="submit">Create Admission</button>
          <router-link to="/home" class="btn-back">Back</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        admission: {
          patient_id: this.$route.params.patientId || '',
          ward: '',
          datetime_of_admission: ''
        },
        existingAdmission: null,
        error: null
      };
    },
    methods: {
      formatDate(dateTime) {
        return new Date(dateTime).toLocaleString();
      },
      checkExistingAdmission() {
        axios.get(`http://localhost:8000/api/admissions?patient_id=${this.admission.patient_id}`)
          .then(response => {
            const ongoingAdmission = response.data.find(admission => !admission.datetime_of_discharge);
            if (ongoingAdmission) {
              this.existingAdmission = ongoingAdmission;
            } else {
              this.createAdmission();
            }
          })
          .catch(error => {
            console.error('Error checking existing admission:', error.response ? error.response.data : error.message);
            this.error = 'Failed to check existing admission. Please try again later.';
          });
      },
      createAdmission() {
        axios.post('http://localhost:8000/api/admissions', this.admission)
          .then(() => {
            this.$router.push('/home');
          })
          .catch(error => {
            console.error('Error creating admission:', error.response ? error.response.data : error.message);
            this.error = 'Failed to create admission. Please try again later.';
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .admission-create {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
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
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 15px;
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
  
  .btn-back {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .btn-back:hover {
    background-color: #5a6268;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .existing-admission-info {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  </style>
  