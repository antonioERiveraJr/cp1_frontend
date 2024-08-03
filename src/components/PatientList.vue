<template>
    <div class="patient-list">
      <router-link to="/home" class="btn-back">Back to Home</router-link>
      <h2>Patients</h2>
      <div class="patient-list-header">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="searchPatients" 
          placeholder="Search by name..." 
          class="search-input"
        />
        <router-link to="/patients/create" class="btn-create">Create New Patient</router-link>
      </div>
      <ul class="patient-list-items">
        <li v-for="patient in filteredPatients" :key="patient.id" class="patient-item">
          <div class="patient-details">
            <span 
              class="patient-name" 
              @click="handlePatientClick(patient)"
            >
              {{ patient.first_name }} {{ patient.last_name }}
            </span>
            <div class="patient-actions">
              <router-link :to="{ name: 'PatientEdit', params: { id: patient.id } }" class="btn-edit">Edit</router-link>
              <button @click="deletePatient(patient.id)" class="btn-delete">Delete</button>
            </div>
          </div>
          <div v-if="selectedPatient && selectedPatient.id === patient.id && ongoingAdmission" class="admission-info">
            <span><strong>Ward:</strong> {{ ongoingAdmission.ward }}</span>
            <span><strong>Admission Date:</strong> {{ formatDate(ongoingAdmission.datetime_of_admission) }}</span>
            <span v-if="ongoingAdmission.datetime_of_discharge">
              <strong>Discharge Date:</strong> {{ formatDate(ongoingAdmission.datetime_of_discharge) }}
            </span>
          </div>
        </li>
      </ul>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        patients: [],
        searchQuery: '',
        error: null,
        selectedPatient: null,
        ongoingAdmission: null,
      };
    },
    computed: {
      filteredPatients() {
        const query = this.searchQuery.toLowerCase();
        return this.patients.filter(patient => 
          (`${patient.first_name} ${patient.last_name}`).toLowerCase().includes(query)
        );
      }
    },
    methods: {
      formatDate(dateTime) {
        return new Date(dateTime).toLocaleString();
      },
      fetchPatients() {
        axios.get('http://localhost:8000/api/patients')
          .then(response => {
            this.patients = response.data;
          })
          .catch(error => {
            console.error('Error fetching patients:', error.response ? error.response.data : error.message);
            this.error = 'Failed to load patients. Please try again later.';
          });
      },
      fetchOngoingAdmission(patientId) {
        axios.get(`http://localhost:8000/api/admissions?patient_id=${patientId}`)
          .then(response => {
            const ongoingAdmission = response.data.find(admission => !admission.datetime_of_discharge);
            this.ongoingAdmission = ongoingAdmission || null;
          })
          .catch(error => {
            console.error('Error fetching admissions:', error.response ? error.response.data : error.message);
            this.error = 'Failed to check admissions. Please try again later.';
          });
      },
      handlePatientClick(patient) {
        this.selectedPatient = patient;
        this.fetchOngoingAdmission(patient.id);
        
        if (this.ongoingAdmission) {
          // Show ongoing admission details
          // You might want to set a flag or data property to control the display of this information
          this.$refs.admissionInfoRef.style.display = 'block'; // Example: showing a hidden element
        } else {
          this.$router.push({ name: 'AdmissionCreate', params: { patientId: patient.id } });
        }
      },
      deletePatient(id) {
        axios.delete(`http://localhost:8000/api/patients/${id}`)
          .then(() => {
            this.patients = this.patients.filter(patient => patient.id !== id);
          })
          .catch(error => {
            console.error('Error deleting patient:', error.response ? error.response.data : error.message);
            this.error = 'Failed to delete patient. Please try again later.';
          });
      }
    },
    created() {
      this.fetchPatients();
    }
  };
  </script>
  
  <style scoped>
  .patient-list {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 10px;
  }
  
  .btn-back {
    padding: 10px 15px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 20px;
  }
  
  .btn-back:hover {
    background-color: #5a6268;
  }
  
  .admission-info {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .patient-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .search-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    flex: 1;
  }
  
  .btn-create {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .patient-list-items {
    list-style-type: none;
    padding: 0;
  }
  
  .patient-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .patient-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .patient-name {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    flex: 1;
  }
  
  .patient-actions {
    display: flex;
    gap: 10px;
  }
  
  .btn-delete {
    padding: 5px 25px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-edit {
    padding: 5px 25px;
    background-color: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .btn-delete:hover {
    background-color: #c82333;
  }
  
  .error-message {
    color: #dc3545;
    margin-top: 10px;
  }
  </style>
  