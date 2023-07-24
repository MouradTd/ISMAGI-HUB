<template>
    <div class="card">
        <div class="container">
            <div class="rox">
                <div class="col-md-112">
                    <h3>Note</h3>
                    <table class="table table-striped ">
                        <thead>
                            <tr>
                                <th>Nom Prof</th>
                                <th>Module</th>
                                <th>Note</th>
                                <th>Classe</th>
                                <th>date d'examen</th>
                                <th>Copie d'Exam</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in notes" :key="item.id">
                                <td>
                                    <template v-if="item.professor">
                                        {{ item.professor }}
                                    </template>
                                    <template v-else>
                                        Loading...
                                    </template>
                                </td>
                                <td>
                                    <template v-if="item.Module">
                                        {{ item.Module }}
                                    </template>
                                    <template v-else>
                                        Loading...
                                    </template>
                                </td>
                                <td>
                                    <template v-if="item.Note">
                                        {{ item.Note }}
                                    </template>
                                    <template v-else>
                                        Loading...
                                    </template>
                                </td>
                                <td>
                                    <template v-if="item.classe">
                                        {{ item.classe }}
                                    </template>
                                    <template v-else>
                                        Loading...
                                    </template>
                                </td>
                                <td>
                                    <template v-if="item.date_exam">
                                        {{ item.date_exam }}
                                    </template>
                                    <template v-else>
                                        Loading...
                                    </template>
                                </td>
                                <td>
                                    <template v-if="item.date_exam">
                                      <a download :href="item.url_exam_file "><i class="pi pi-fw pi-image"></i></a> 
                                    </template>
                                    <template v-else>
                                        Loading...
                                    </template>
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
const router = useRouter();
let user;
let Etudiantid;
const notes = ref([])

const getNotes = () => {
    axios.get(`http://localhost:3000/exam/${Etudiantid}`)
        .then(res => {
            // console.log(res.data);
            notes.value = res.data

        }).catch(err => {
            console.log(err);
        })
}
onMounted(() => {
    // productService.getProductsSmall().then((data) => (dataviewValue.value = data));
    user = JSON.parse(localStorage.getItem('user-info'))

    if (user && user.type !== "user") {
        router.push({ name: "error" })

    } else if (!user) {
        router.push({ path: "/", })
        console.log('error no user signed in');
    }
    Etudiantid = user._id;




    /////////////////////////////////////////////////////////::
    getNotes()
    console.log(notes);

});
</script>