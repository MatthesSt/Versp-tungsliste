import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { ref } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
// import Lists from '../views/Lists.vue';
// import List from '../views/List.vue';
// import ListSettings from '../views/ListSettings.vue';
// import friends from '../views/Friends.vue';
// import settings from '../views/Settings.vue';

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
//   {
//     path: '/settings',
//     name: 'Settings',
//     component: settings,
//     meta: {
//       guard: 'auth',
//     },
//   },
//   {
//     path: '/lists',
//     name: 'Lists',
//     component: Lists,
//     meta: {
//       guard: 'auth',
//     },
//   },
//   {
//     path: '/list/:id',
//     name: 'List',
//     component: List,
//     meta: {
//       guard: 'auth',
//     },
//   },
//   {
//     path: '/friends',
//     name: 'friends',
//     component: friends,
//     meta: {
//       guard: 'auth',
//     },
//   },
//   {
//     path: '/settings/:id',
//     name: 'listSettings',
//     component: ListSettings,
//     meta: {
//       guard: 'auth',
//     },
//   },
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