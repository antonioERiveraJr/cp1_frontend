import { createRouter, createWebHistory } from 'vue-router';  
import PatientList from './components/PatientList.vue';
import PatientCreate from './components/PatientCreate.vue';
import PatientEdit from './components/PatientEdit.vue';
import PatientDelete from './components/PatientDelete.vue';
import AdmissionList from './components/AdmissionList.vue';
import AdmissionCreate from './components/AdmissionCreate.vue';
import AdmissionDischarge from './components/AdmissionDischarge.vue';
import HomePage from './components/HomePage.vue';
import UserLogin  from './components/UserLogin.vue';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  }, 
  {
    path: '/patients',
    name: 'PatientList',
    component: PatientList,
  },
  {
    path: '/patients/create',
    name: 'PatientCreate',
    component: PatientCreate,
  },
  {
    path: '/patients/edit/:id',
    name: 'PatientEdit',
    component: PatientEdit,
    props: true,
  },
  {
    path: '/patients/delete/:id',
    name: 'PatientDelete',
    component: PatientDelete,
    props: true,
  },
  {
    path: '/admissions',
    name: 'AdmissionList',
    component: AdmissionList,
  },
  {
    path: '/admissions/create',
    name: 'AdmissionCreate',
    component: AdmissionCreate,
  },
  {
    path: '/admissions/discharge/:id',
    name: 'AdmissionDischarge',
    component: AdmissionDischarge,
    props: true,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a navigation guard for authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
});

export default router;
