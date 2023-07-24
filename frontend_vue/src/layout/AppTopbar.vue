<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useLayout } from "@/layout/composables/layout";
import { useRouter } from "vue-router";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
  bindOutsideClickListener();
  // Logout()
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  return `/layout/images/${
    layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
  }.svg`;
});
const Logout = () => {
  localStorage.clear();
  router.push({ path: "/" });
};

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push("/documentation");
};
const onHomeClick = () => {
  topbarMenuActive.value = false;
  router.push("/profile");
};
const onBookmarkClick = () => {
  topbarMenuActive.value = false;
  router.push("/bookmarks");
};
const onCoursesClick = () => {
  topbarMenuActive.value = false;
  router.push("/browse");
};

const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>ISMAGI-Courses</span>
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onCoursesClick()" class="p-link layout-topbar-button">
        <i class="pi pi-image"></i>
        <span>My courses</span>
      </button>
      <!-- @click="toggleMenu" @click="visibleRight = true"-->
      <button class="p-link layout-topbar-button" @click="onBookmarkClick()">
        <i class="pi pi-bookmark"></i>
        <span>Bookmark</span>
      </button>
      <button class="p-link layout-topbar-button" @click="onHomeClick()">
        <i class="pi pi-user"></i>
        <span>Profile</span>

        <!-- <Menu ref="menu" :model="overlayMenuItems" :popup="true" /> -->
        <!-- <Sidebar v-model:visible="visibleRight" :baseZIndex="1000" position="right">
                    <h1 style="font-weight: normal"> Profile Menu </h1>
                    <div>
                        <ul class="layout-menu">
                            <template v-for="(item, i) of model" :key="i">
                                <RouterLink :to="item.items.to">{{ item.label }}</RouterLink>
                                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item> 
                                <li v-if="item.separator" class="menu-separator"></li>
                            </template>
                            <Button @click="onHomeClick()">Home</Button>
                            
                        </ul>
                        
                    </div>
                    
                </Sidebar> -->
        <!-- <Button icon="pi pi-arrow-left" class="p-button-warning" @click="visibleRight = true" style="margin-right: 0.25em" /> -->

        <!-- <Button type="button" label="Options" icon="pi pi-angle-down"  style="width: auto" /> -->
      </button>

      <button @click="onSettingsClick()" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
      <button @click="Logout()" class="p-link layout-topbar-button">
        <i class="pi pi-ban"></i>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
