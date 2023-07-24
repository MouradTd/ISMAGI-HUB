<template>
    <div>
        <div class="card">
        <h3 class="title p-3">Review pending uploads</h3>
            <div class="container">
                <div class="row">
                    <div class="">
                        <table class="table table-striped ">
                <thead>
                    <tr>
                        <th>Nom etudiant</th>
                        <th>titre</th>
                        <th>description</th>
                        <th>status</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in uploads" :key="item._id">
                        <td>{{ item.id_etudiant.name }}</td>
                        <td>{{ item.Nom }}</td>
                        <td>{{item.description }}</td>
                        <td>{{ item.status }}</td>
                        <!-- <td><a download ><i class="pi pi-fw pi-image"></i></a></td> -->
                        <td >
                            <a download  data-toggle = "tooltip" title = "Consulter" :href="item.url_lesson_file"><i class="pi pi-fw pi-eye mx-2"></i></a>
                            <a href="" data-toggle = "tooltip" title = "Supprimer" @click.prevent="Delete(item._id)"><i class="pi pi-fw pi-trash mx-2"></i></a>
                            <a href="" data-toggle = "tooltip" title = "Valider" @click.prevent="Valider(item._id)"><i class="pi pi-fw pi-thumbs-up mx-2"></i></a>
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
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
const uploads = ref([]);


const getHub = () => {
    axios.get('http://localhost:3000/pending_uploads')
        .then(res => {
            // console.log(res.data);
            uploads.value = res.data
            console.log(uploads.value);

        }).catch(err => {
            console.log(err);
        })
}
const Valider = (id) =>{
    if(confirm('Etest-vous sur de valider cet lesson')===true){
        axios.patch(`http://localhost:3000/updateHub/${id}`,{
            status:'Valider'
        })
        .then(res => {
            // console.log(res.data);
            
            console.log(res.data);
            // alert('Published succesfully');
            toast.success("Published succesfully")
            getHub()

        }).catch(err => {
            console.log(err);
        })
    }
}

const Delete = (id)=>{
    if(confirm('Etest-vous sur de Supprimmer cet lesson')===true){
        axios.delete(`http://localhost:3000/delete_Hub/${id}`)
        .then(res => {
            // console.log(res.data);
            
            console.log(res.data);
            // alert('Deleted succesfully');
            toast.success('Deleted succesfully')
            getHub()

        }).catch(err => {
            console.log(err);
        })
    }
}


onMounted(() => {
    let user = JSON.parse(localStorage.getItem('user-info'))

    if (user && user.type !== "admin") {
        router.push({ name: "error" })
        console.log("error admin");
    } else if (!user) {
        router.push({ path: "/", })
        console.log('error no user signed in');
    }

    /////////////////////////////////////////////////////////::
    getHub()


});

</script>