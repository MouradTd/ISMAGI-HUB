<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <!-- Card start -->
                <div class="container-fluid" v-for="item in data" :key="item._id">
                    <div class="row">
                        <div class="col-12 mt-3">
                            <div class="card">
                                <div class="card-horizontal">
                                    <div class="img-square-wrapper">
                                        <img class="" src="http://via.placeholder.com/300x180" alt="Card image cap">
                                    </div>
                                    <div class="card-body">
                                        <h4 class="card-title">{{ item.title }}</h4>
                                        <p class="card-text mt-4">{{ item.description }}</p>

                                        
                                        <button type="button" class="btn btn-primary p-button-rounded float-end p-3 mx-2"
                                            data-bs-toggle="modal" data-bs-target="#EditCourseModal"
                                            @click="getCourse(item._id)">Edit</button>
                                        <button type="button" class="btn btn-danger p-button-rounded float-end p-3 "
                                           @click="Delete(item._id)" >Delete</button>
                                        



                                    </div>
                                </div>
                                <div class="card-footer ">
                                    <small class="text-muted">Owner : {{ item.professor }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Card end -->
                <!-- Edit Task Modal -->
                <div class="modal fade" id="EditCourseModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit Course </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form @submit="Update(course._id)">
                                <div class="modal-body">

                                    <div id="errorMessageUpdate" class="alert alert-warning d-none"></div>
                                    <input type="hidden" class="form-control" :value="course._id">
                                    <div class="mb-3">
                                        <label for="">Title</label>
                                        <input type="text" class="form-control" :placeholder="course.title" v-model="title">
                                    </div>

                                    <div class="mb-3">
                                        <label for="">Description</label>
                                        <input type="text" class="form-control" :placeholder="course.description"
                                            v-model="description">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Edit
                                        Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Edit Course Modal -->
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "vue-toastification";
const toast = useToast();


const router = useRouter();


const title = ref('');
const description = ref('');


const course = ref([]);


const data = ref([])
const getCourse = (id) => {
    axios.post('http://localhost:3000/onecourse', {
        id: id
    }).then(res => {
        // console.log(res.data);
        course.value = res.data


    }).catch(err => {
        console.log(err);
    })
}

const Update = (id) => {

    if (title.length > 0 && description.length > 0) {
        // alert('Il faut saisir les informations a  mettre a jour')
        toast.error("Il faut saisir les informations a  mettre a jour")
    } else {
        axios.patch(`http://localhost:3000/updatecourse/${id}`, {
            title: title.value,
            description: description.value,

        }).then((res) => {

            console.log(res.data);
            // alert('Updated successfully')
            toast.success('Updated')
        })
            .catch((err) => {
                console.log(err);
            });

        getData(user)
    }
    // alert(title.value)
}
const Delete =(id)=>{
    if(confirm("Etes-vous sur de supprimer ce Tuto")==true){
        axios.delete(`http://localhost:3000/delete_course/${id}`)
        .then((res) => {
            console.log(res.data);
            // alert('Deleted successfully')
            toast.success('Deleted successfully')
        })
            .catch((err) => {
                console.log(err);
            });
    }
}
const getData = (user) => {
    axios.post('http://localhost:3000/ownercourse', {
        professor: user.name
    }).then(res => {
        // console.log(res.data);
        data.value = res.data


    }).catch(err => {
        console.log(err);
    })
}

onMounted(() => {
    // productService.getProductsSmall().then((data) => (dataviewValue.value = data));
    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    if (user && user.type[0].type !== "prof") {
        router.push({ name: "error" })
        console.log("error prof");
    } else if (!user) {
        router.push({ path: "/", })
        console.log('error no user signed in');
    }
    getData(user)

    /////////////////////////////////////////////////////////::



});




</script>