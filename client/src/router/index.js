import ChatView from '@/views/ChatView.vue'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  // login
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInView,
  },
  // register
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
