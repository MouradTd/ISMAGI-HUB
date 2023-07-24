<script>
import { useLayout } from "@/layout/composables/layout";
import axios from "axios";
// import { ref, computed } from 'vue';
// import AppConfig from '@/layout/AppConfig.vue';
import { useToast } from "vue-toastification";
const toast = useToast();
const { layoutConfig } = useLayout();
// const email = ref('');
// const password = ref('');

// const logoUrl = computed(() => {
//     return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });
//  async function Submit(){

//     try {
//         this.axios.post("http://localhost:3000/",
//         email ,password )
//         .then((res) => {
//             if(res.data=='User Found'){
//                 this.$router.push({ name: 'home' });
//                 localStorage.setItem('usermail',email)
//             }else if(res.data=='User Not Found'){
//                 alert('Error try again')
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     }
//     catch(err){
//         console.log(err);
//     }

//  }

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async Submit() {
            console.log(this.email, this.password);
            //    let result = await this.axios.get(`http://localhost:3000/login?email=${this.email}&password=${this.password}`,)
            //    .then((res)=>{
            //         console.log(res.data);
            //    })
            
            axios.post("http://localhost:3000/login",
                {
                   
                        email: this.email,
                        password: this.password,
                    
                }

            )
                .then((res) => {
                    if(res.data =="User Not Found or incorrect credientels"){
                        // alert("Error try again");
                        toast.error('User Not Found or incorrect credientels')
                    }else{
                        localStorage.setItem("user-info",JSON.stringify(res.data));
                        this.$router.push({name: "home",})
                    }
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        logoUrl() {
            return `layout/images/${layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
                }.svg`;
        },
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem('user-info'));

        if(user){
            this.$router.push({name: "home",})
        }else{
            this.$router.push({path: "/",})
        }
    },
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        ">
                <div class="w-full surface-card py-8 px-2 sm:px-8" style="border-radius: 53px; width: 500px !important">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <form @submit.prevent="Submit()">
                        <div>
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email :</label>
                            <!-- <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" /> -->
                            <input class="form-control form-control-lg mb-2" type="text" placeholder="Email"
                                aria-label="email" v-model="email" required />
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password :</label>
                            <!-- <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password> -->
                            <input class="form-control form-control-lg mb-2" type="password" placeholder="Password"
                                aria-label="pass" v-model="password" required />
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style="color: var(--primary-color)">Forgot password?</a>
                                <router-link to="/signup" class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style="color: var(--primary-color)">
                                    Sign Up</router-link>
                            </div>
                            <button class="w-full p-3 text-xl btn btn-primary"
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
