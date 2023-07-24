<template>
  <div class="card">
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-1 mt-5 p-2">
          <h3 class="text-center">Table des Classes :</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nom Classe</th>
                <th>Nom Prof</th>
                <th>Nom etudiant</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in classes" :key="item.id">
                <td>{{ item.Nom_classe }}</td>
                <td>
                  <template v-if="item.id_prof.name">
                    {{ item.id_prof.name }}
                  </template>
                  <template v-else> Loading... </template>
                </td>
                <td>
                  <template v-if="item.id_etudiant.name">
                    {{ item.id_etudiant.name }}
                  </template>
                  <template v-else> Loading... </template>
                </td>
                <!-- <td>{{ item.id_prof.name }}</td>
                                <td>{{ item.id_etudiant.name }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const classes = ref([]);

const getClasses = () => {
  axios
    .get("http://localhost:3000/classes")
    .then((res) => {
      // console.log(res.data);
      classes.value = res.data;
      console.log(classes.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/name/${id}`);
    return response.data.name;
  } catch (error) {
    console.log(error);
    return "Error occurred while fetching user name.";
  }
};
const names = ref([]);

onMounted(() => {
  let user = JSON.parse(localStorage.getItem("user-info"));

  if (user && user.type !== "admin") {
    router.push({ name: "error" });
    console.log("error admin");
  } else if (!user) {
    router.push({ path: "/" });
    console.log("error no user signed in");
  }

  /////////////////////////////////////////////////////////::

  getClasses();
});
</script>
