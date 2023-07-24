import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import UploadVideoView from '../views/UploadVideoView.vue'
import AppLayout from '@/layout/AppLayout.vue';
import BrowseCourse from '../views/BrowseCourse.vue';
import Course from '../views/Course.vue'
import Profile from '../views/Profile.vue';
import Mycourses from '../views/Mycourses.vue';
import AddClasse from '../views/AddClasse.vue';
import AddNote from '../views/AddNote.vue';
import Classe from '../views/Classe.vue';
import Note from '../views/Note.vue';
import UploadLessonView from '../views/UploadLessonView.vue';
import Consulter from '../views/Cours_Activitées.vue';
import Review_Uploads from '../views/Review_Uploads.vue';
import MyHubUploads from'../views/HubUploads.vue';
import bookmarks from '../views/Bookmarks.vue';
import UploadPlaylist from '../views/UploadPlaylist.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      
      path: '/home',
      component: AppLayout,
      children: [
        {
          //here route to app views 
          path: '/home',
          name:'home',
          component:HomeView
        },
        {
          //here route to app views 
          path: '/consulter',
          name:'consulter',
          component:Consulter
        },
        {
          //here route to app views 
          path: '/upload-video',
          component:UploadVideoView
        },
        {
          //here route to app views 
          path: '/upload-playlist',
          component:UploadPlaylist
        },
        {
          //here route to app views 
          path: '/upload-lesson',
          component:UploadLessonView
        },
        {
          //here route to app views 
          path: '/browse',
          component:BrowseCourse
        },
        {
          path : '/course/:id',
          name: 'course',
          component:Course,
          props : (route)=> ({id :String(route.params.id)})

        },
        {
          path : '/profile',
          component:Profile
        },
        {
          path : '/mycourses',
          component:Mycourses
        },
        {
          path : '/addclasse',
          component:AddClasse
        },
        {
          path : '/Addnote',
          component:AddNote
        },
        {
          path : '/classe',
          component:Classe
        },
        {
          path : '/note',
          component:Note
        },
        {
          path : '/review',
          component:Review_Uploads
        },
        {
          path : '/myHub/uploads',
          component:MyHubUploads
        },
        {
          path : '/bookmarks',
          component:bookmarks
        },
      ]
    },
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/error',
      name: 'error',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Message.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUp.vue')
    },
    
    {
      path: "/:catchAll(.*)",
      component: () => import('../views/NotFound.vue'),
    }
    
  ]
})

export default router
