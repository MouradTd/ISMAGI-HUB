<template>
  <div class="card">
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="item in data">
          <div class="card mb-4">
            <img :src="item.thumbnail" class="card-img-top" alt="Card Image 1" />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text text-truncate">
                {{ item.description }}
              </p>
              <div class="car-buttons mt-5">
                <button
                  type="button"
                  style="background-color: #6366f1"
                  class="btn btn-primary p-button-rounded mr-2"
                  @click="DeleteBookmark(item.id_bookmark)"
                >
                  <i
                    class="pi pi-bookmark-fill"
                    data-toggle="tooltip"
                    title="Supprimer de l'enregistrement"
                    style="background-color: #6366f1"
                  ></i>
                </button>
                <router-link
                  :to="{
                    name: 'course',
                    params: {
                      id: item._id,
                    },
                  }"
                >
                  <button
                    type="button"
                    style="background-color: #1cb475"
                    class="btn btn-success p-button-rounded mr-2"
                  >
                    <i class="pi pi-caret-right" data-toggle="tooltip" title="Play"></i>
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const userId = ref("");
const data = ref([]);
import { useToast } from "vue-toastification";
const toast = useToast();

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

const DeleteBookmark = async (id) => {
  try {
    axios.delete(`http://localhost:3000/delete/bookmark/${id}`).then(() => {
      toast.success("deleted from bookmarks");
    });

    // console.log(modifiedURL);
    return modifiedURL;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  let user = JSON.parse(localStorage.getItem("user-info"));
  if (user === null) {
    router.push({ name: "login" });
  }
  userId.value = user._id;

  axios
    .get(`http://localhost:3000/getBookmarks/${userId.value}`)
    .then(async (res) => {
      //console.log(res.data);
      for (let item of res.data) {
        data.value.push({
          _id: item.id_course._id,
          title: item.id_course.title,
          description: item.id_course.description,
          professor: item.id_course.professor,
          url: item.id_course.url,
          thumbnail: await get_gif(item.id_course._id),
          id_bookmark: item._id,
        });
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
