import { createApp } from 'vue'
import './style.css'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.js';
import App from './App.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVb1mjcY33s5bPIE5_2p0OstAQaSADygQ",
  authDomain: "verspaetungsliste.firebaseapp.com",
  projectId: "verspaetungsliste",
  storageBucket: "verspaetungsliste.appspot.com",
  messagingSenderId: "532912019629",
  appId: "1:532912019629:web:95415f1a435f9c78c2ce24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
