<script setup>
import Course from "./Course.vue";
</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h2>Courses for u</h2>
        <!-- Card start -->
        <div class="container-fluid" v-for="item in data" :key="item._id">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="img-square-wrapper">
                    <img class="" :src="item.thumbnail" alt="Card thumbnail cap" />
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">{{ item.title }}</h4>
                    <p class="card-text mt-4">{{ item.description }}</p>
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
                        class="btn btn-primary p-button-rounded float-end p-3"
                        style="background-color: #6366f1"
                      >
                        Watch Now
                      </button>
                    </router-link>
                  </div>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Owner : {{ item.professor }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Card end -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.axios
      .get("http://localhost:3000/course")
      .then(async (res) => {
        // console.log(res.data);
        for (let item of res.data) {
          this.data.push({
            _id: item._id,
            title: item.title,
            description: item.description,
            professor: item.professor,
            url: item.url,
            thumbnail: await this.get_gif(item._id),
          });
        }

        console.log(this.data);
      })
      .catch((err) => {
        console.log(err);
      });
    let user = JSON.parse(localStorage.getItem("user-info"));

    if (!user) {
      this.$router.push({ path: "/" });
      // router.push({path: "/",})
    }
  },
  methods: {
    async get_gif(id) {
      try {
        const response = await this.axios.get(`http://localhost:3000/uploaded_gif/${id}`);
        const modifiedURL = response.data;
        // console.log(modifiedURL);
        return modifiedURL;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
</script>

<style>
.card-horizontal {
  display: flex;
  flex: 1 1 auto;
}
</style>
