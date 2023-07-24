<template>
    <div class="grid">
        <h1>Profile page</h1>
        <div class="col-12">
            <div class="card">
                <h5>Update credentials </h5>
                <div class="p-fluid formgrid ">
                    <form @submit.prevent="Submit()">

                        <!-- <div class="field col-12 md:col-6">
                            <label for="firstname2">Name :</label>
                            <input type="text" v-model="name" class="form-control">
                        </div> -->


                        <div class="field col-12 md:col-6 " >
                            <label for="address">Email :</label>
                            <input type="text" v-model="email" class="form-control">
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="city">Old Password :</label>
                            <input type="text" v-model="Oldpassword" class="form-control">
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="city">Password :</label>
                            <input type="text" v-model="password" class="form-control">
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="city">Confirm Password :</label>
                            <input type="text" v-model="Cpassword" class="form-control">
                        </div>
                        <div class="field col-12 md:col-6">

                            <button class="w-50 float-start p-3 text-xl btn btn-primary"
                                style="background-color: var(--primary-color)" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script >
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import { useToast } from "vue-toastification";
const toast = useToast();

// let router = useRouter();
// onMounted(() => {
//     let user = JSON.parse(localStorage.getItem('user-info'));

//         if(!user){
//             router.push({path: "/",})
//             // router.push({path: "/",})
//         }

// });
export default {
    data() {
        return {
            user: {},
            name: '',
            email: '',
            password: '',
            Cpassword:'',
            Oldpassword: '',

        }
    },
    methods: {
        Submit() {
            if (this.Oldpassword == this.user.password) {
                if(this.Cpassword==this.password){

                    axios.patch(`http://localhost:3000/updateuser/${this.user._id}`, {
                        email: this.email,
                        password: this.password
                    }).then((res) => {
    
                        console.log(res.data);
    
                        localStorage.setItem("user-info", JSON.stringify(res.data));
                        toast.success('Updated succesfully')
                    })
                        .catch((err) => {
                            console.log(err);
                        });
                }else{
                    toast.error('Password and Confirmation password are wrong')
                }
            } else {
                // alert('Old password incorrect')
                toast.error('Old password incorrect')
            }
        }

    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user-info'));

        if (!this.user) {
            this.$router.push({ name: "home", })
        }
    },
}
</script>