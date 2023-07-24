<template>
    <div class="card">
        <h2>Notes</h2>

        <div class="container">
            <div class="row">
                <div class="col-md-9 offset-2  p-2 ">
                    <form @submit.prevent="onSubmit()">
                        <label class="form-label mt-1">Note : </label>
                        <input type="number" class="form-control p-2 " id="" min="0" max="20" v-model="notes" required>
                        <label class="form-label mt-1">Professor : </label>
                        <input type="text" class="form-control p-2 " id="" disabled v-model="ProfName" required>
                        <label class="form-label mt-1">Classe : </label>
                        <select class=" form-select p-2" id="" v-model="Nomclass" required @change="SelectedClass">
                            <option value=""></option>
                            <option v-for="nom in classes" :value="nom">{{ nom }}</option>
                        </select>
                        <label class="form-label mt-1">Etudiant : </label>
                        <select class=" form-select p-2" id="" @change="SelectEtud" v-model="etudiant" required>
                            <option value=""></option>
                            <option v-for="item in etudiants" :value="item._id">{{ item.name }}</option>

                        </select>
                        <label class="form-label mt-1">Module : </label>
                        <input type="text" class="form-control p-2 " id="" disabled v-model="Module" required>
                        <label class="form-label mt-1">Date de l'examen : </label>
                        <input type="date" class="form-control p-2 " id="" v-model="date_exam">
                        <label class="form-label mt-1">Exam file : <span class="text-danger">(Once u upload the file u c'ant
                                edit it)</span> </label>
                        <input type="file" class="form-control p-2 " id="" accept="file/*"
                            @change="handleFileUpload($event)" required>

                        
                        <button class="btn btn-primary" type="submit">Valider</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "vue-toastification";
const toast = useToast();

const router = useRouter();
const ProfName = ref('');
const Module = ref('');
const classes = ref([]);
const etudiants = ref([]);
let selectedEtud = ref('');
const Class = ref('');
const classe = [];
const notes = ref('')
const etudiant = ref('')
const Nomclass = ref('')
const date_exam = ref('')

let file = '';


const getClasses = () => {
    axios.get('http://localhost:3000/classe')
        .then(res => {
            // console.log(res.data);
            classes.value = res.data

        }).catch(err => {
            console.log(err);
        })
}
const getEtudiants = () => {
    axios.get('http://localhost:3000/students')
        .then(res => {
            // console.log(res.data);
            etudiants.value = res.data

        }).catch(err => {
            console.log(err);
        })
}
// console.log(classes);
// console.log(etudiants);

let SelectEtud = (e) => {
    selectedEtud = e.target.value;
    console.log(selectedEtud);

    for (let i = 0; i < classe.length; i++) {
        // Class.value = item.find((obj) => obj.name === selectedEtud)?.Nom_classe;
        if (classe[0][i].id_etudiant === selectedEtud) {
            Class.value = classe[0][i].Nom_classe;

            console.log(Class._rawValue);

        }

    }
    console.log(classe);



}
let filteredStudents = []
let SelectedClass = (e) => {
     filteredStudents.push(etudiants.filter(etudiant => etudiant.classId === e.target.value));
    // etudiants.filter(etudiant => etudiant.classId === e.target.value)
    console.log(filteredStudents);
}
const getClasse = () => {
    axios.get('http://localhost:3000/classes')
        .then(res => {
            // console.log(res.data);
            classe.push(res.data)

        }).catch(err => {
            console.log(err);
        })
}
let handleFileUpload = (event) => {
    file = event.target.files[0];
}
const onSubmit = () => {
    
    let body = {
        exam_file: file,
        professeur: user.name,
        Module: Module.value,
        classe: Nomclass.value,
        date_exam: date_exam.value,
        etudiant: etudiant.value,
        note: notes.value,
    }
    console.log(body);
    axios.post('http://localhost:3000/note',

        {
            
            exam_file: file,
            professor: user.name,
            Module: Module.value,
            classe: Nomclass.value,
            date_exam: date_exam.value,
            etudiant: etudiant.value,
            Note: notes.value,

        },


        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(function () {
        console.log('SUCCESS!!');
        // alert('Uploaded successfully')
        toast.success("Uploaded successfully")
    })
        .catch(function (err) {
            console.log(err);
        });
    console.log(file);
}

let user ;
onMounted(() => {
    // productService.getProductsSmall().then((data) => (dataviewValue.value = data));
     user = JSON.parse(localStorage.getItem('user-info'))

    if (user && user.type[0].type !== "prof") {
        router.push({ name: "error" })
        console.log("error prof");
    } else if (!user) {
        router.push({ path: "/", })
        console.log('error no user signed in');
    }

    ProfName.value = user.name;
    Module.value = user.type[0].module


    /////////////////////////////////////////////////////////::
    getClasses()
    getEtudiants()
    getClasse()
    console.log(etudiants);

});
</script>