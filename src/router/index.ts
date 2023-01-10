import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { ref } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Stats from '../views/Stats.vue';
import Overview from '../views/Overview.vue';

declare module 'vue-router' {
  interface RouteMeta {
    guard: 'auth' | 'guest';
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guard: 'guest',
    },
  },
  {
    path: '/Stats',
    name: 'Stats',
    component: Stats,
    meta: {
      guard: 'auth',
    },
  },
  {
    path: '/Overview',
    name: 'Overview',
    component: Overview,
    meta: {
      guard: 'auth',
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guard: 'auth',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Home',
    component: Home,
    meta: {
      guard: 'auth',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const currentUser = ref<User | null>(null);

const getCurrentUser = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        currentUser.value = user;
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.guard === 'auth';

  if (!(await getCurrentUser()) && requiresAuth) {
    next('/login');
  } else if ((await getCurrentUser()) && to.name === 'Login') {
    next('/');
  } else {
    next();
  }
});

export default router;
