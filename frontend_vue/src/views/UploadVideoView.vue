
<template>
    <div class="card">
        <div class="grid mt-2 ">
            <div class="col-12 ">
                <div class="card p-fluid">
                    <form @submit.prevent="Submit()">


                        <div class="field">
                            <label for="title">Title :</label>
                            <input type="text" name="title" class="form-control" v-model="title" required>
                        </div>
                        <div class="field">
                            <label for="description">Description :</label>
                            <textarea name="" class="form-control" id="" v-model="description" cols="30" rows="10" required></textarea>
                        </div>

                        
                        
                        <div class="field">
                            <label for="">choose Video : <span class="text-danger">(Once u upload a video u c'ant edit it)</span></label>
                            <input type="file" name="" class="form-control" accept="video/*"
                                @change="handleFileUpload($event)" required>
                        </div>
                        <button class=" px-4 py-3 w-25 text-xl btn btn-primary"
                            style="background-color: var(--primary-color)" type="submit">Submit</button>
                    </form>

                </div>
            </div>
        </div>
        

    </div>
</template>

<script >
import axios from "axios"
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
const toast = useToast();

const router = useRouter();

export default {
    data() {
        return {
            file: '',
            title: '',
            description: '',
            professor:'',

        }
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        Submit() {
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post('http://localhost:3000/upload',
                
                    {
                        video:this.file,
                        title:this.title,
                        description:this.description,
                        professor:this.professor
                    },
                    
                
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function () {
                console.log('SUCCESS!!');
                // alert('Uploaded successfully')
                toast.success('Uploaded successfully')
            })
                .catch(function (err) {
                    console.log(err);
                });
             console.log(this.file);
        }
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem('user-info'))

        if (user && user.type[0].type !== "prof") {
            this.$router.push({ name: "error" })
            console.log("error prof");
        } else if (!user) {
            router.push({ path: "/", })
            console.log('error no user signed in');
        }
        this.professor = String(user.name) 
        

    },
}



// onMounted(() => {
//     let user = JSON.parse(localStorage.getItem('user-info'));

//     if (user && user.type !== "prof") {
//         router.push({ name: "error" })
//         console.log("error prof");
//     } else if (!user) {
//         router.push({ path: "/", })
//         console.log('error no user signed in');
//     }
// });
</script>