import Vue from 'vue'
import Router from 'vue-router'

// All views that will appear on app
import Home from './views/Home'
import RecentResults from './views/RecentResults'
import Dashboard from './views/Dashboard'


Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recent-results',
      name: 'recent-results',
      component: RecentResults
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})