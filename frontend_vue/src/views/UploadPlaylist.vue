<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="card">
          <form @submit.prevent="Submit">
            <div class="field p-3">
              <label for="email1"
                >Sélectionnez la vidéo à laquelle appartient la playlist :</label
              >
              <select class="form-select" v-model="id_course">
                <optgroup label="Courses">
                  <option value=""></option>
                  <option v-for="nom in course" :value="nom._id">
                    {{ nom.title }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div class="field p-3">
              <label>Selectionner les videos Playlist :</label>
              <input
                type="file"
                class="form-control"
                accept="video/*"
                @change="handleFileUpload($event)"
                required
                multiple
              />
            </div>

            <button
              class="px-4 py-2 w-25 text-xl btn btn-primary"
              style="background-color: var(--primary-color)"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
let videos = ref([]);
const formData = new FormData();
const cardContainer = ref(null);
export default {
  data() {
    return {
      files: [],
      course: [],
      id_course: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.files = event.target.files;
    },
    Submit() {
      console.log(this.files);
      axios
        .post(
          "http://localhost:3000/upload_playlist",
          {
            playlist: this.files,
            id_course: this.id_course,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function () {
          console.log("SUCCESS!!");
          toast.success("Uploaded successfully");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));

    if (user && user.type[0].type !== "prof") {
      this.$router.push({ name: "error" });
      console.log("error prof");
    } else if (!user) {
      router.push({ path: "/" });
      console.log("error no user signed in");
    }

    axios
      .post("http://localhost:3000/ownercourse", {
        professor: user.name,
      })
      .then((res) => {
        // console.log(res.data);
        this.course = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
