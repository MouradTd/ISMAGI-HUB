<template>
    <div class="card">

        <!-- User -->
        <div class="grid mt-2 " v-if="user ==='user'">
            <div class="col-12 ">
                <div class="card p-fluid">
                    <form @submit.prevent="SubmitHub()">


                        <div class="field">
                            <label for="title">Title :</label>
                            <input type="text" name="title" class="form-control" v-model="Nom" required>
                        </div>
                        <div class="field">
                            <label for="description">Description :</label>
                            <textarea name="" class="form-control" id="" v-model="description" cols="30" rows="10"
                                required></textarea>
                        </div>

                        



                        <div class="field">
                            <label for="">Lesson file : </label>
                            <input type="file" name="" class="form-control" accept="file/*"
                                @change="handleFileUpload($event)" required>
                        </div>
                        <button class=" px-4 py-3 w-25 text-xl btn btn-primary"
                            style="background-color: var(--primary-color)" type="submit">Submit</button>
                    </form>

                </div>
            </div>
        </div>
        <!-- User -->

        
        <div class="grid mt-2 " v-else>
            <div class="col-12 ">
                <div class="card p-fluid">
                    <form @submit.prevent="Submit()">


                        <div class="field">
                            <label for="title">Title :</label>
                            <input type="text" name="title" class="form-control" v-model="Nom" required>
                        </div>
                        <div class="field">
                            <label for="description">Description :</label>
                            <textarea name="" class="form-control" id="" v-model="description" cols="30" rows="10"
                                required></textarea>
                        </div>

                        <div class="field">
                            <label for="description">Classe :</label>
                            <select class=" form-select p-2" id="" v-model="Nomclass" required @change="SelectClass">
                                <option value=""></option>
                                <option v-for="item in classe" :value="item">{{ item }}</option>
                            </select>
                        </div>



                        <div class="field">
                            <label for="">Lesson file : </label>
                            <input type="file" name="" class="form-control" accept="file/*"
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

<script>
import axios from "axios"
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
    setup() {
      // Get toast interface
    //   const toast = useToast();

    //   // Use it!
    //   toast("I'm a toast!");

    //   // or with options
    //   toast.success("My toast content", {
    //     timeout: 2000
    //   });
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      return { toast }
    },
    data() {
        return {
            user:'',
            file: '',
            Nom: '',
            description: '',
            id_professor: '',
            classe: [],
            Nomclass: '',
            module: ''

        }
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        
        Submit() {
            console.log(this.file);
            console.log(this.id_professor);
            console.log(this.Nomclass);
            axios.post('http://localhost:3000/upload_lesson',

                    {
                        lesson_file:this.file,
                        title:this.title,
                        description:this.description,
                        id_prof:this.id_professor,
                        Nom_classe:this.Nomclass,
                        Nom:this.Nom,
                        Module:this.module
                    },


                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function () {
                console.log('SUCCESS!!');
                // alert('Uploaded successfully')
                toast.success("Uploaded successfully");
            })
                .catch(function (err) {
                    console.log(err);
                });
        },
        SubmitHub() {
            console.log(this.file);
            console.log(this.id_professor);
            console.log(this.Nomclass);
            axios.post('http://localhost:3000/upload/lesson/hub',

                    {
                        lesson_file:this.file,
                        title:this.title,
                        description:this.description,
                        id_etudiant:this.id_professor,
                        Nom:this.Nom,
                        status:"Pending"
                    },


                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function () {
                console.log('SUCCESS!!');
                toast.success('Uploaded successfully')
            })
                .catch(function (err) {
                    console.log(err);
                });
        }
    },

    


    mounted() {
        let user = JSON.parse(localStorage.getItem('user-info'))

        // if (user && user.type[0].type !== "prof") {
        //     this.$router.push({ name: "error" })
        //     console.log("error prof");
        // } else if (!user) {
        //     router.push({ path: "/", })
        //     console.log('error no user signed in');
        // }
        this.id_professor = String(user._id)
        this.module = String(user.type[0].module)
        this.user = user.type;
        console.log(this.user);
        // console.log(this.module);
        // console.log(this.id_professor)

        ////////////////////////////////////////////////////////////////////////////////////////////////

        axios.get('http://localhost:3000/classe')
            .then(res => {
                // console.log(res.data);
                this.classe = res.data

            }).catch(err => {
                console.log(err);
            })
        let SelectClass = (e) => {
            this.Nomclass = e.target.value;
            
        }
         


    },
}





</script>