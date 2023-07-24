<template>
  <div class="card">
    <h1>Add students to a new classe</h1>
    <div class="conatiner">
      <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="msg">
        {{ msg }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <div class="row mb-5">
        <div class="col-md-8 p-3">
          <form @submit.prevent="onSubmit()">
            <input
              type="text"
              class="form-control m-3 w-50"
              v-model="classe"
              placeholder="Nom de la classe a ajoutée "
            />
            <label class="m-2">Etudiants :</label>
            <p class="fs-6 fw-small text-danger">
              Double click sur les noms pour les selectionner
            </p>
            <select
              name=""
              class="form-select m-3 w-50"
              multiple
              ref="select"
              @dblclick="addToSelectedValues"
            >
              <option v-for="item in data" :value="item._id" class="text-muted">
                {{ item.name }}
              </option>
            </select>
            <label for="">Professeurs :</label>
            <select
              name=""
              class="form-select choices-multiple m-3 w-50"
              @change="SelectProf"
            >
              <option value=""></option>
              <option v-for="nom in profs" :value="nom._id" class="text-muted">
                {{ nom.name }}
              </option>
            </select>
            <button
              type="submit"
              class="btn btn-primary p-2 m-3 w-25"
              style="background-color: #8183f4"
            >
              Valider
            </button>
          </form>
        </div>

        <div class="col-md-4">
          <div class="row">
            <div class="col-md-10">
              <button
                class="btn btn-primary p-2 m-2 w-50"
                style="background-color: #8183f4"
                @click="Clear"
              >
                Reinitisaliser la liste des etudinats
              </button>
              <ul v-for="item of students">
                <li>{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();

const router = useRouter();
const data = ref([]);
const profs = ref([]);
const students = reactive([]);
const select = ref("");
let selectedProf = ref("");
const classe = ref("");
const final = [];
const msg = ref("");
const classes = ref([]);

let addToSelectedValues = (event) => {
  const selectedValue = event.target.value;
  students.push(selectedValue);
};
let Clear = (event) => {
  students.length = 0;
};

// let Show = (event) => {

//     // console.log(selectedProf);
//     // console.log(students);
//     // for(item in students) {}

//     // for ($i = 0; $i < count($data); $i++) {
//     //         $array[$i]["product"] = $data[$i];
//     //         $stock = $em->getRepository(stock::class)->findOneBy(['product' => $data[$i]->getId()]);
//     //         $array[$i]["stock"] = $stock;
//     //     }
//     for (let i = 0; i < students.length; i++) {
//         // Add  student and prof and classe nale to an object array
//         final.push({
//             id_prof: selectedProf,
//             id_student: students[i],
//             Nom_classe: classe._rawValue
//         })
//     }
//     console.log(final);
// };
let SelectProf = (e) => {
  selectedProf = e.target.value;
};

const getData = () => {
  axios
    .get("http://localhost:3000/students")
    .then((res) => {
      // console.log(res.data);
      data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getProfs = () => {
  axios
    .get("http://localhost:3000/profs")
    .then((res) => {
      // console.log(res.data);
      profs.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getClasses = () => {
  axios
    .get("http://localhost:3000/classes")
    .then((res) => {
      // console.log(res.data);
      classes.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserById = async (id) => {
  // get nom by id
  //  axios
  //     .get(`http://localhost:3000/name/${id}`)
  //     .then((res) => {

  //         let name = res.data.name; // Access the `name` property of `res.data`
  //         console.log(name);
  //         return name;
  //     })
  try {
    const response = await axios.get(`http://localhost:3000/name/${id}`);
    return response.data.name;
  } catch (error) {
    console.log(error);
    return "Error occurred while fetching user name.";
  }
};
const names = ref([]);
const fetchNames = async () => {
  console.log(classes);
  for (let i in classes) {
    names[classes[i].id_prof] = await getUserById(classes[i].id_prof);
    names[classes[i].id_etudiant] = await getUserById(classes[i].id_etudiant);
  }
  console.log(names);
};

const onSubmit = () => {
  for (let i = 0; i < students.length; i++) {
    // Add  student and prof and classe nale to an object array
    final.push({
      id_prof: selectedProf,
      id_etudiant: students[i],
      Nom_classe: classe._rawValue,
    });
  }

  console.log(final);

  if (classe.value === null || final.length === 0) {
    msg.value = "Il faut saisir les informations a  insérrer";
  }

  const requestBody = {
    Nom_classe: classe.value,
    insert_array: final,
  };
  const formatted_array = JSON.stringify(requestBody);
  const filtered_array = JSON.parse(formatted_array);

  axios
    .post(`http://localhost:3000/addclasse`, {
      insert_array: filtered_array.insert_array,
      Nom_classe: filtered_array.Nom_classe,
    })
    .then((res) => {
      console.log(res.data);
      // alert('Inserted successfully')
      toast.success("Inserted successfully");
    })
    .catch((err) => {
      console.log(err);
      msg.value = "Erreur";
    });
};
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
  getData();
  getProfs();
  getClasses();
  fetchNames();
});
</script>
