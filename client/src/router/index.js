import AuthCallbackView from '@/views/AuthCallbackView.vue'
import ChatView from '@/views/ChatView.vue'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import ChatDetailsView from '@/views/ChatDetailsView.vue'
import ChatLayout from '@/layouts/ChatLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  // register
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView,
  },
  {
    path: '/chat',
    name: 'ChatLayout',
    component: ChatLayout,
    children: [
      {
        path: '',
        name: 'Chat',
        component: ChatView,
      },
      {
        path: ':id',
        name: 'ChatDetails',
        component: ChatDetailsView,
      },
    ],
  },
  // for google ouath
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallbackView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// runs before every route, guarantees user is resolved before any component mounts
router.beforeEach(async () => {
  const authStore = useAuthStore()
  if (authStore.user === null) {
    await authStore.fetchUser()
  }
})
export default router
