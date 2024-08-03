import { createStore } from 'vuex';
import router from './router';
import axios from 'axios';

const store = createStore({
  state: {
    patients: [],
    admissions: [],
    user: null,
    token: null,
    error: null,
  },
  mutations: {
    SET_PATIENTS(state, patients) {
      state.patients = patients;
    },
    ADD_PATIENT(state, patient) {
      state.patients.push(patient);
    },
    UPDATE_PATIENT(state, updatedPatient) {
      const index = state.patients.findIndex(patient => patient.id === updatedPatient.id);
      if (index !== -1) {
        state.patients.splice(index, 1, updatedPatient);
      }
    },
    DELETE_PATIENT(state, patientId) {
      state.patients = state.patients.filter(patient => patient.id !== patientId);
    },
    SET_ADMISSIONS(state, admissions) {
      state.admissions = admissions;
    },
    ADD_ADMISSION(state, admission) {
      state.admissions.push(admission);
    },
    UPDATE_ADMISSION(state, updatedAdmission) {
      const index = state.admissions.findIndex(admission => admission.id === updatedAdmission.id);
      if (index !== -1) {
        state.admissions.splice(index, 1, updatedAdmission);
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async fetchPatients({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/patients');
        commit('SET_PATIENTS', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async createPatient({ commit }, patient) {
      try {
        const response = await axios.post('http://localhost:8000/api/patients', patient);
        commit('ADD_PATIENT', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async updatePatient({ commit }, patient) {
      try {
        const response = await axios.put(`http://localhost:8000/api/patients/${patient.id}`, patient);
        commit('UPDATE_PATIENT', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async deletePatient({ commit }, patientId) {
      try {
        await axios.delete(`http://localhost:8000/api/patients/${patientId}`);
        commit('DELETE_PATIENT', patientId);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async fetchAdmissions({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/admissions');
        commit('SET_ADMISSIONS', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async createAdmission({ commit }, admission) {
      try {
        const response = await axios.post('http://localhost:8000/api/admissions', admission);
        commit('ADD_ADMISSION', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async updateAdmission({ commit }, admission) {
      try {
        const response = await axios.put(`http://localhost:8000/api/admissions/${admission.id}`, admission);
        commit('UPDATE_ADMISSION', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async register({ commit }, user) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', user);
        commit('SET_USER', response.data.user);
        commit('SET_TOKEN', response.data.token);
        router.push('/');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async login({ commit }, user) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', user);
        commit('SET_USER', response.data.user);
        commit('SET_TOKEN', response.data.token);
        router.push('/');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
      router.push('/login');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getPatients: state => state.patients,
    getAdmissions: state => state.admissions,
    getUser: state => state.user,
    getError: state => state.error,
  },
});

export default store;
