<template>
  <div>
    <div class="card" v-if="userlvl === 'user'">
      <h4>My Hub Contributions</h4>
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-1">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>description</th>
                  <th>status</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in uploads">
                  <td>
                    <template v-if="item.Nom">
                      {{ item.Nom }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>
                  <td>
                    <template v-if="item.description">
                      {{ item.description }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>
                  <td>
                    <template v-if="item.status">
                      {{ item.status }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>

                  <td>
                    <a
                      download
                      data-toggle="tooltip"
                      title="Consulter"
                      :href="item.url_lesson_file"
                      ><i class="pi pi-fw pi-eye mx-2"></i
                    ></a>
                    <a
                      href=""
                      data-toggle="tooltip"
                      title="Supprimer"
                      @click.prevent="Delete(item._id)"
                      ><i class="pi pi-fw pi-trash mx-2"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card">
      <h3 v-if="userlvl.type === 'user'">My Hub Contributions</h3>
      <h3 v-else>My Lessons</h3>
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-1">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Classe</th>
                  <th>titre</th>
                  <th>description</th>
                  <th>Attachments</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in lesson">
                  <td>
                    <template v-if="item.Module">
                      {{ item.Module }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>
                  <td>
                    <template v-if="item.Nom_classe">
                      {{ item.Nom_classe }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>
                  <td>
                    <template v-if="item.Nom">
                      {{ item.Nom }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>
                  <td>
                    <template v-if="item.description">
                      {{ item.description }}
                    </template>
                    <template v-else> Loading... </template>
                  </td>
                  <td>
                    <a
                      download
                      data-toggle="tooltip"
                      title="Consulter"
                      :href="item.url_lesson_file"
                      ><i class="pi pi-fw pi-eye mx-2"></i
                    ></a>
                    <a
                      href=""
                      data-toggle="tooltip"
                      title="Supprimer"
                      @click.prevent="Deletelesson(item._id)"
                      ><i class="pi pi-fw pi-trash mx-2"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const toast = useToast();
import axios from "axios";
const router = useRouter();
const uploads = ref([]);
const userId = ref("");
const lesson = ref([]);
let userlvl = "";

const getUploads = () => {
  axios
    .get(`http://localhost:3000/hub/uploads/${userId.value}`)
    .then((res) => {
      console.log(res.data);
      uploads.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getLesson = () => {
  axios
    .get(`http://localhost:3000/get/lessons/${userId.value}`)
    .then((res) => {
      console.log(res.data);
      lesson.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const Delete = (id) => {
  if (confirm("Etest-vous sur de Supprimmer cet lesson") === true) {
    axios
      .delete(`http://localhost:3000/delete_Hub/${id}`)
      .then((res) => {
        // console.log(res.data);

        //console.log(res.data);
        // alert('Deleted succesfully');
        toast.success("Deleted succesfully");
        getHub();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const Deletelesson = (id) => {
  if (confirm("Etest-vous sur de Supprimmer cet lesson") === true) {
    axios
      .delete(`http://localhost:3000/delete_lesson/${id}`)
      .then((res) => {
        // console.log(res.data);

        console.log(res.data);
        // alert('Deleted succesfully');
        toast.success("Deleted succesfully");
        getHub();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

onMounted(() => {
  // productService.getProductsSmall().then((data) => (dataviewValue.value = data));
  let user = JSON.parse(localStorage.getItem("user-info"));

  // if (user && user.type !== "user") {
  //     router.push({ name: "error" })

  // }
  if (!user) {
    router.push({ path: "/" });
    console.log("error no user signed in");
  }
  userId.value = user._id;
  userlvl = user.type;
  console.log(userlvl);

  /////////////////////////////////////////////////////////::
  getUploads();
  getLesson();
});
</script>
