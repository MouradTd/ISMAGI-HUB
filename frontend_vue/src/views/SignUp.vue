<script >
import { useLayout } from '@/layout/composables/layout';
// import { ref, computed, onUpdated } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
// import Button from 'primevue/button';
// import InputText from 'primevue/inputtext';
// import Password from 'primevue/password';
import axios from 'axios';





const { layoutConfig } = useLayout();

import { useRouter } from 'vue-router';


const router = useRouter();
export default {
    data() {
        return {
            name: '',
            password: '',
            email: '',
            type: '',
            module: ''
        }
    },
    methods: {
        onSubmit() {
            if (this.type === 'prof') {
                const name = this.name;
                const email = this.email;
                const password = this.password;
                const type = [{
                    type: "prof",
                    module: this.module
                }];

                const jsonData = {
                    name: name,
                    email: email,
                    password: password,
                    type: type
                };
                const formatted_array = JSON.stringify(jsonData)
                const filtered_array = JSON.parse(formatted_array)
                console.log(filtered_array);
                axios.post('http://localhost:3000/signup', {
                    type: "prof",
                    insert_array:filtered_array
                })
                    .then((res) => {
                        if (res.data == 'User already exists') {

                            alert('User Already exists')
                        } else {
                            console.log(res.data);
                            this.$router.push({ name: "login", })
                            // router.push('/home');

                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    })

            } else {

                axios.post('http://localhost:3000/signup', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    type: this.type
                })
                    .then((res) => {
                        if (res.data == 'User already exists') {

                            alert('User Already exists')
                        } else {
                            console.log(res.data);
                            this.$router.push({ name: "login", })
                            // router.push('/home');

                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

        }
    },
    computed: {
        logoUrl() {
            return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
        }
    },
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center ">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 30px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-8 " style="border-radius: 30px ;width: 500px !important;">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Hello </div>
                        <span class="text-600 font-medium">Sign up to continue</span>
                    </div>

                    <div>
                        <form @submit.prevent="onSubmit()">
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Name :</label>
                            <!-- <InputText id="name" type="text" placeholder="Name" class="w-full md:w-30rem mb-5"
                                        style="padding: 1rem" v-model="name" /> -->
                            <input class="form-control form-control-lg mb-2" type="text" placeholder="Name"
                                aria-label="Name" v-model="name">

                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email :</label>
                            <!-- <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
                                        style="padding: 1rem" v-model="email" /> -->
                            <input class="form-control form-control-lg mb-2" type="email" placeholder="Email"
                                aria-label="Email" v-model="email">

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password :</label>
                            <!-- <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                                        class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password> -->
                            <input class="form-control form-control-lg mb-2" type="password" placeholder="Password"
                                aria-label="Password" v-model="password"><br>

                            <!-- <InputText id="type" type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" value="user"
                                        v-model="type" /> -->
                            <label for="type" class="block text-900 font-medium text-xl mb-2">Usertype :<br><span
                                    class="fs-6 fw-normal text-danger">(ce choix ne peut pas etre modifier
                                    aprés)</span></label>
                            <select class="form-select" aria-label="Default select example" v-model="type">
                                <option selected>Open this select menu</option>
                                <option value="user">Etudiant</option>
                                <option value="prof">Professeur</option>

                            </select><br>
                            <div v-if="this.type === 'prof'">
                                <label for="module" class="block text-900 font-medium text-xl mb-2">Module :</label>

                                <input class="form-control form-control-lg mb-2" type="text" placeholder="Module name"
                                    aria-label="Password" v-model="module"><br>

                            </div>

                            <!-- <input class="form-control form-control-lg mb-2" type="text" placeholder="type"
                                aria-label="type" v-model="type"> -->
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">

                                <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                            <button class="w-full p-3 text-xl btn btn-primary"
                                style="background-color: var(--primary-color)" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


