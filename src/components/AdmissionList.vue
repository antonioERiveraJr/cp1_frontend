<template>
    <div class="admission-list">
      <button @click="goBack" class="btn-back">Back to Home</button>
      <h2>Admissions</h2>
  
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Search by Patient ID" />
        <button @click="searchAdmissions" class="btn-search">Search</button>
      </div>
  
      <button @click="toggleDischarged" class="btn-toggle">
        {{ showDischarged ? 'Hide Discharged Admissions' : 'Show Discharged Admissions' }}
      </button>
  
      <ul v-if="!showDischarged" class="admission-list-items">
        <li v-for="admission in filteredActiveAdmissions" :key="admission.id" class="admission-item">
          <div class="admission-details">
            <span><strong>Patient ID:</strong> {{ admission.patient_id }}</span>
            <span><strong>Ward:</strong> {{ admission.ward }}</span>
            <span><strong>Admission Date:</strong> {{ formatDate(admission.datetime_of_admission) }}</span>
          </div>
          <div class="discharge-container">
            <input v-model="dischargeDateTime" type="datetime-local" />
            <button @click="dischargeAdmission(admission.id)" class="btn-discharge">Discharge</button>
          </div>
        </li>
      </ul>
  
      <ul v-if="showDischarged" class="admission-list-items">
        <li v-for="admission in filteredDischargedAdmissions" :key="admission.id" class="admission-item">
          <div class="admission-details">
            <span><strong>Patient ID:</strong> {{ admission.patient_id }}</span>
            <span><strong>Ward:</strong> {{ admission.ward }}</span>
            <span><strong>Admission Date:</strong> {{ formatDate(admission.datetime_of_admission) }}</span>
            <span><strong>Discharge Date:</strong> {{ formatDate(admission.datetime_of_discharge) }}</span>
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
        admissions: [],
        error: null,
        dischargeDateTime: '',
        searchQuery: '',
        showDischarged: false,
      };
    },
    created() {
      this.fetchAdmissions();
    },
    computed: {
      filteredActiveAdmissions() {
        const query = this.searchQuery.toLowerCase();
        return this.admissions.filter(admission =>
          !admission.datetime_of_discharge && (
            admission.patient_id.toString().includes(query) // Search by patient_id only
          )
        );
      },
      filteredDischargedAdmissions() {
        const query = this.searchQuery.toLowerCase();
        return this.admissions.filter(admission =>
          admission.datetime_of_discharge && (
            admission.patient_id.toString().includes(query) // Search by patient_id only
          )
        );
      }
    },
    methods: {
      formatDate(dateTime) {
        return new Date(dateTime).toLocaleString();
      },
      fetchAdmissions() {
        const params = this.searchQuery ? { patient_id: this.searchQuery } : {};
        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
        axios.get(`http://localhost:8000/api/admissions`, { params: { ...params, date: today } })
          .then(response => {
            this.admissions = response.data;
          })
          .catch(error => {
            console.error('Error fetching admissions:', error.response ? error.response.data : error.message);
            this.error = 'Failed to load admissions. Please try again later.';
          });
      },
      dischargeAdmission(id) {
        if (this.dischargeDateTime) {
          axios.patch(`http://localhost:8000/api/admissions/${id}/discharge`, {
            datetime_of_discharge: this.dischargeDateTime
          })
          .then(() => {
            this.fetchAdmissions(); // Refresh the list of admissions
            this.dischargeDateTime = ''; // Clear input after successful update
          })
          .catch(error => {
            console.error('Error discharging admission:', error.response ? error.response.data : error.message);
            this.error = 'Failed to discharge admission. Please try again later.';
          });
        } else {
          this.error = 'Please enter a valid discharge date and time.';
        }
      },
      goBack() {
        this.$router.push('/home'); // Navigate to home route
      },
      toggleDischarged() {
        this.showDischarged = !this.showDischarged;
      },
      searchAdmissions() {
        this.fetchAdmissions(); // Fetch admissions based on search query
      }
    }
  };
  </script>
  
  <style scoped>
  .admission-list {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .btn-back, .btn-search, .btn-toggle, .btn-discharge {
    margin-bottom: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-back {
    background-color: #007bff;
    color: white;
  }
  
  .btn-back:hover {
    background-color: #0056b3;
  }
  
  .btn-search, .btn-toggle {
    background-color: #28a745;
    color: white;
  }
  
  .btn-search:hover, .btn-toggle:hover {
    background-color: #218838;
  }
  
  .btn-discharge {
    background-color: #dc3545;
    color: white;
  }
  
  .btn-discharge:hover {
    background-color: #c82333;
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  .search-container input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: calc(100% - 120px);
  }
  
  .search-container button {
    padding: 8px 12px;
    margin-left: 5px;
    background-color: #007bff;
    color: white;
  }
  
  .search-container button:hover {
    background-color: #0056b3;
  }
  
  .admission-list-items {
    list-style-type: none;
    padding: 0;
  }
  
  .admission-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  
  .admission-details {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }
  
  .discharge-container {
    display: flex;
    align-items: center;
  }
  
  .discharge-container input {
    margin-right: 10px;
  }
  
  .error-message {
    color: #dc3545;
    margin-top: 10px;
  }
  </style>
  