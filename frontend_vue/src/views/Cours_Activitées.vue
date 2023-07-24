<template>
  <div class="card">
    <h3 class="text">Cours et Activitées</h3>
    <div class="main p-2">
      <div class="d-flex align-items-center justify-content-evenly gap-5">
        <div class="field d-flex align-items-center justify-content-center w-25">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="searchQuery"
          />
        </div>
        <div class="field d-flex align-items-center justify-content-center w-25">
          <select class="form-select" placeholder="Filter" v-model="selectedOption">
            <optgroup label="Classes">
              <option value=""></option>
              <option v-for="nom in classes" :value="nom">{{ nom }}</option>
            </optgroup>
          </select>
        </div>
        <div
          class="field d-flex align-items-center justify-content-center w-25 float-end"
        >
          <button
            class="btn btn-outline-primary p-1 m-2"
            data-toggle="tooltip"
            title="Lesson"
            style="width: 150px; height: 50px"
            @click="toggle()"
          >
            <!--<i class="pi pi-fw pi-folder-open"></i> -->
            Toggle HUB-LESSONS
          </button>
          <!-- <button class="btn btn-outline-primary p-1 m-2" data-toggle="tooltip" title="Hub" style="width: 50px;"
                        @click="lesson = false"><i class="bi bi-cloud-fog2 w-25 h-25"></i></button> -->
          <!-- <div class="btn-group btn-group-toggle ">
                        <a  title="Lesson" class="btn btn-outline-primary active  " @click="lesson = true"><i class="bi bi-table"></i></a>
                        <a  title="Hub" class="btn btn-outline-primary  " @click="lesson = false"><i
                                class="bi bi-grid"></i></a>
                    </div> -->
        </div>
      </div>

      <div class="container" v-if="lesson">
        <h4>Lessons</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nom Prof</th>
              <th>Module</th>
              <th>Classe</th>
              <th>titre</th>
              <th>description</th>
              <th>Attachments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData">
              <td>
                <template v-if="item.id_prof.name">
                  {{ item.id_prof.name }}
                </template>
                <template v-else> Loading... </template>
              </td>
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
                <template v-if="item.url_lesson_file">
                  <a download :href="item.url_lesson_file"
                    ><i class="pi pi-fw pi-image"></i
                  ></a>
                </template>
                <template v-else> Loading... </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container" v-else>
        <h4>Hub</h4>
        <div class="container">
          <div class="row">
            <div class="">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Nom etudiant</th>
                    <th>titre</th>
                    <th>description</th>
                    <th>Attachments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in uploads" :key="item._id">
                    <td>{{ item.id_etudiant.name }}</td>
                    <td>{{ item.Nom }}</td>
                    <td>{{ item.description }}</td>

                    <td>
                      <a
                        download
                        data-toggle="tooltip"
                        title="Consulter"
                        :href="item.url_lesson_file"
                        ><i class="pi pi-fw pi-eye mx-2"></i
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
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const a = ref("a");
const lessons = ref([]);
const searchQuery = ref("");
const classes = ref([]);
const selectedOption = ref("");
let lesson = ref(true);
const toggle = () => {
  lesson.value = !lesson.value;
};
const uploads = ref([]);
const userId = ref("");

const getLessons = () => {
  axios
    .get("http://localhost:3000/lessons")
    .then((res) => {
      console.log(res.data);
      lessons.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getUploads = () => {
  axios
    .get(`http://localhost:3000/Hub`)
    .then((res) => {
      console.table(res.data);
      uploads.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getClasses = () => {
  axios
    .get("http://localhost:3000/classe")
    .then((res) => {
      // console.log(res.data);
      classes.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

let filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) {
    return lessons.value;
  }
  return lessons.value.filter((row) => {
    for (const key in row) {
      if (String(row[key]).toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  });
});

// Do not delete this comment its for the select filter functionnality

// var filteredData = computed(() => {
//     const query = searchQuery.value.toLowerCase();
//     const option = selectedOption.value.toLowerCase();
//     if (!query && !option) {
//         return lessons.value;
//     }
//     return lessons.value.filter(row => {

//         if ( String(row.Nom_classe).toLowerCase().includes(option)) {
//             return true;
//         }
//         for (const key in row) {
//             if (!option || option === key) {
//                 if (String(row[key]).toLowerCase().includes(query)) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     });
// });

onMounted(() => {
  // message.value = [{ severity: 'info', detail: 'Welcome', content: `Welcome Back Mourad`}]
  let user = JSON.parse(localStorage.getItem("user-info"));
  // name.value = user.name;
  if (!user) {
    router.push({ name: "home" });
    // router.push({path: "/",})
  }
  userId.value = user._id;
  getLessons();
  getClasses();
  getUploads();
});
</script>
