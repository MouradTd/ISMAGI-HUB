<template>
  <div class="card">
    <h1 class="card-title fw-normal">{{ data.title }}</h1>
  </div>
  <div class="d-flex my-5">
    <div class="ratio ratio-16x9 p-2 card" ref="videoContainer">
      <iframe
        width="800"
        height="500"
        :src="`https://player.cloudinary.com/embed/?public_id=${publicId}&cloud_name=${cloudName}&player[showJumpControls]=${showJumpControls}&player[hideContextMenu]=${hideContextMenu}&player[floatingWhenNotVisible]=${floatingWhenNotVisible}&source[sourceTypes][0]=hls&source[transformation][streaming_profile]=auto`"
        title="Wazzup Beijing"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style="border-radius: 8px"
        ref="videoUrl"
      >
      </iframe>
    </div>

    <div
      class="col-md-4 card offset-1"
      style="height: 550px; width: 350px; overflow: hidden; overflow-y: scroll"
      v-if="playlist.length !== 0"
    >
      <h3>Playlist videos</h3>
      <div v-for="item in playlist">
        <div
          class="card d-flex align-items-center justify-content-center"
          v-for="video in item.url_video_playlist"
        >
          <div class="preview-container">
            <img :src="url_gif(video)" alt="playlist vid" class="img-fluid" />
            <button
              type="button"
              class="btn btn-primary p-button-rounded"
              @click="changeVideo(video)"
            >
              <i class="pi pi-caret-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-md-4 card offset-1"
      style="height: 550px; width: 350px; overflow: hidden; overflow-y: scroll"
      v-else
    >
      <h3 class="m-2">Description</h3>
      <div>{{ data.description }}</div>
    </div>
  </div>

  <div class="card" v-if="playlist.length !== 0">
    <h3 class="card-title fw-normal">Description</h3>
    {{ data.description }}
  </div>

  <div class="card">
    <h3 class="text-center">Suggestions :</h3>
    <div class="product-item">
      <div class="product-item-content" v-for="item in course" :key="item._id">
        <div class="mb-3">
          <!-- Video preview.data -->
          <img
            src="http://via.placeholder.com/300x180"
            alt="course preview"
            class="img-fluid"
          />
        </div>
        <div>
          <h4 class="mb-1">
            {{ item.title }}
          </h4>

          <div style="overflow: hidden; overflow-y: hidden">
            {{ item.description }}
          </div>
          <div class="car-buttons mt-5">
            <button
              type="button"
              style="background-color: #6366f1"
              class="btn btn-primary p-button-rounded mr-2"
              @click="bookmark(item._id)"
            >
              <i class="pi pi-bookmark" style="background-color: #6366f1"></i>
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
                <i class="pi pi-caret-right"></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
const toast = useToast();
import { ref } from "vue";
const videoUrl = ref("");
export default {
  data() {
    return {
      data: [],
      course: [],
      playlist: [],
      publicId: "",
      cloudName: "db4dagdmh",
      showJumpControls: true,
      hideContextMenu: false,
      floatingWhenNotVisible: "right",
      userId: "",
    };
  },
  props: {
    id: { type: String, required: true },
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    this.userId = user._id;
    if (!user) {
      this.$router.push({ path: "/" });
      // router.push({path: "/",})
    }

    this.axios
      .post("http://localhost:3000/onecourse", {
        id: this.id,
      })
      .then((res) => {
        const regex = /\/(\d+)\.mp4$/;
        const match = res.data.url.match(regex);
        let extractedNumber = "";
        if (match && match[1]) {
          extractedNumber = match[1];
          console.log(extractedNumber);
          this.publicId = extractedNumber;
        } else {
          console.log("Number extraction failed.");
        }

        this.data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.axios
      .post("http://localhost:3000/random")
      .then((res) => {
        // console.log(res.data);
        this.course = res.data;
        // console.log(this.course);
      })
      .catch((err) => {
        console.log(err);
      });
    this.axios
      .get(`http://localhost:3000/playlist/${this.id}`)
      .then((res) => {
        // console.log(res.data);
        this.playlist = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    url_gif(originalURL) {
      var regex = /\/v(\d+)\//;
      var match = originalURL.match(regex);
      if (match) {
        var dynamicSection = match[0];

        // Replace the dynamic section with the desired value
        var modifiedURL = originalURL.replace(
          dynamicSection,
          "/c_scale,h_180,w_300/e_loop/dl_200,vs_40/"
        );

        // Change the file extension to ".gif"
        modifiedURL = modifiedURL.replace(".mp4", ".gif");
      }
      return modifiedURL;
    },

    changeVideo(video) {
      const regex = /\/(\d+)\.mp4$/;
      const match = video.match(regex);
      let extractedNumber = "";
      if (match && match[1]) {
        extractedNumber = match[1];
        console.log(extractedNumber);
        this.publicId = extractedNumber;
      } else {
        console.log("Number extraction failed.");
      }
    },
    bookmark(id) {
      try {
        this.axios
          .post("http://localhost:3000/bookmarks", {
            id_utilisateur: this.userId,
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
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/demo/styles/badges.scss";
@import "@/assets/demo/styles/items.scss";
</style>

<style>
.preview-container {
  position: relative;
}

.preview-container .btn {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  background-color: grey;
  border: rgba(173, 167, 167, 0.248);
}

.preview-container img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
