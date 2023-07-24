<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import axios from "axios";
import { toastInjectionKey } from "vue-toastification";
const router = useRouter();
const name = ref("");
const data = ref([]);
const userId = ref("");
import { useToast } from "vue-toastification";
const toast = useToast();

const carouselResponsiveOptions = ref([
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const get_gif = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/uploaded_gif/${id}`);
    const modifiedURL = response.data;
    // console.log(modifiedURL);
    return modifiedURL;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const bookmark = (id) => {
  try {
    axios
      .post("http://localhost:3000/bookmarks", {
        id_utilisateur: userId.value,
        id_course: id,
      })
      .then(async (res) => {
        //console.log(res.data);
        toast.success("bookmarked succesfully");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  let user = JSON.parse(localStorage.getItem("user-info"));
  if (user === null) {
    router.push({ name: "login" });
  }
  name.value = user.name;
  userId.value = user._id;

  axios
    .post("http://localhost:3000/random")
    .then(async (res) => {
      //console.log(res.data);
      for (let item of res.data) {
        data.value.push({
          _id: item._id,
          title: item.title,
          description: item.description,
          professor: item.professor,
          url: item.url,
          thumbnail: await get_gif(item._id),
        });
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div>
    <!-- <h1>My Vue App</h1>  -->
    <div class="grid">
      <div
        class="card w-100 text-center d-flex align-items-center justify-content-center"
      >
        <h3>Welcome Back, {{ name }} ;)</h3>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>Courses for you</h5>
        <Carousel
          :value="data"
          :numVisible="3"
          :numScroll="3"
          :circular="false"
          :responsiveOptions="carouselResponsiveOptions"
        >
          <template #item="item">
            <div class="product-item">
              <div class="product-item-content">
                <div class="mb-3">
                  <!-- Video preview.data -->
                  <img :src="item.data.thumbnail" alt="course preview" />
                </div>
                <div>
                  <h4 class="mb-1">
                    {{ item.data.title }}
                  </h4>
                  <!-- <h6 class="mt-0 mb-3">${{ product.data.price }}</h6> -->
                  <!-- <span :class="'product-badge status-' + product.data.inventoryStatus.toLowerCase()">{{
                                        product.data.inventoryStatus }}</span> -->
                  <p class="d-inline-block text-truncate" style="max-width: 150px">
                    {{ item.data.description }}
                  </p>
                  <div class="car-buttons mt-5">
                    <button
                      type="button"
                      style="background-color: #6366f1"
                      class="btn btn-primary p-button-rounded mr-2"
                      @click="bookmark(item.data._id)"
                    >
                      <i class="pi pi-bookmark" style="background-color: #6366f1"></i>
                    </button>
                    <router-link
                      :to="{
                        name: 'course',
                        params: {
                          id: item.data._id,
                        },
                      }"
                    >
                      <button
                        type="button"
                        style="background-color: #1cb475"
                        class="btn btn-success p-button-rounded mr-2"
                      >
                        <i class="pi pi-caret-right"></i>
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/demo/styles/badges.scss";
@import "@/assets/demo/styles/items.scss";
</style>
