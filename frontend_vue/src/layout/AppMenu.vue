<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Menu",
    items: [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "Cours & Activitées",
        icon: "pi pi-fw pi-home",
        to: "/consulter",
      },
    ],
  },
  {
    label: "Upload a video",
    items: [
      {
        label: "Upload a file",
        icon: "pi pi-fw pi-cloud-upload",
        to: "/upload-video",
      },
      {
        label: "Upload a Playlist",
        icon: "pi pi-fw pi-cloud-upload",
        to: "/upload-playlist",
      },
      {
        label: "Upload lessons to Hub",
        icon: "pi pi-fw pi-cloud-upload",
        to: "/upload-lesson",
      },
    ],
  },
  {
    label: "Search Courses",
    items: [
      {
        label: "Browse Courses",
        icon: "pi pi-fw pi-image",
        to: "/browse",
      },
    ],
  },
  {
    label: "My Uploads",
    items: [
      {
        label: "My Courses",
        icon: "pi pi-fw pi-image",
        to: "/mycourses",
      },
      {
        label: "My Uploads",
        icon: "pi pi-fw pi-image",
        to: "/myHub/uploads",
      },
      {
        label: "Bookmarks",
        icon: "pi pi-fw pi-bookmark",
        to: "/bookmarks",
      },
    ],
  },
  {
    label: "Ajouter les notes",
    items: [
      {
        label: " Ajouter Notes",
        icon: "pi pi-fw pi-image",
        to: "/AddNote",
      },
      {
        label: "Notes",
        icon: "pi pi-fw pi-image",
        to: "/note",
      },
    ],
  },

  {
    label: "Classes (ADMIN)",
    items: [
      {
        label: "Ajouter une classe",
        icon: "pi pi-fw pi-image",
        to: "/addclasse",
      },
      {
        label: "Classe",
        icon: "pi pi-fw pi-image",
        to: "/classe",
      },
      {
        label: "Review pending uploads",
        icon: "pi pi-fw pi-image",
        to: "/review",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
