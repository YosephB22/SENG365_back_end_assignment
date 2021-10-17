<template xmlns:width="http://www.w3.org/1999/xhtml">
  <div>
    <router-link :to="{name: 'events'}">
      <button class="button" style="margin:5px; background-color: red; color: #30ff30; font-size: 16px;">Events component</button>
    </router-link>
    <el-button  size="medium" style="width: 20%; font-size: 30px;" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#login">login</el-button>
    <el-button size="medium" style="width: 20%; font-size: 30px;" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#register">register</el-button>
    <el-button size="medium" style="width: 20%; font-size: 30px;" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#logout">Logout</el-button>
  </div>
  <div class="container">
    <!-- login modal -->
    <div class="modal fade" id="login" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Login</h4>
          </div>
          <div class="modal-body">
            <el-form ref="form" :model="allForm" label-width="120px" size="mini">
              <el-form-item label="Email">
                <el-input v-model="allForm.email" placeholder="enter your email" type="email"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input v-model="allForm.password" placeholder="enter your password" type="password"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" v-on:click="logIn(); pickFile()">login</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

      </div>
    </div>
  </div>
<!--  login modal ends-->
<!--  register modal begins-->
  <div class="modal fade" id="register" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Register</h4>
        </div>
        <div class="modal-body">
          <el-form ref="form" :model="allForm" label-width="120px" size="mini">
            <el-form-item label="image">
              <div>
                <div
                    class="imagePreviewWrapper"
                    :style="{ 'background-image': `url(${previewImage})` }"
                    @click="selectImage">
                </div>

                <input
                    ref="fileInput"
                    type="file"
                    @input="pickFile">
              </div>
            </el-form-item>
            <el-form-item label="first Name">
              <el-input v-model="allForm.firstName" placeholder="enter a new First Name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Last Name">
              <el-input v-model="allForm.lastName" placeholder="enter a new Last Name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="allForm.email" placeholder="enter a new email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="allForm.password" placeholder="enter a new password" type="password"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" v-on:click="registerUser()">Register</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>
<!--  register modal ends-->
<!--  edit modal begins-->
  <div class="modal fade" id="edit" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Edit User</h4>
        </div>
        <div class="modal-body">
          <el-form ref="form" label-width="120px" size="mini">
            <el-form-item label="first Name">
              <el-input v-model="first_name" placeholder="enter a new First Name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Last Name">
              <el-input v-model="last_name" placeholder="enter a new Last Name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="newEmail" placeholder="enter a new email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="passwords" placeholder="enter a new password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="currentPass" placeholder="enter your current Password" type="password"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" v-on:click="editUser()">Edit User</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>
<!--  edit modal ends-->
<!--  logout modal begins-->
  <div class="modal fade" id="logout" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Logout</h4>
        </div>
        <div class="modal-body">
          <el-form ref="form" :model="allForm" label-width="120px" size="mini">
            <el-form-item label="Email">
              <el-input v-model="allForm.email" placeholder="enter your email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="allForm.password" placeholder="enter your password" type="password"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" v-on:click="logOut()">logOut</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
<!--  logout modal ends-->
  <div class="card">
    <img v-bind:src="displayImage" style="width:100%"/>
    <h1>{{first_name}} {{last_name}}</h1>
    <p>{{newEmail}}</p>
    <h1>
      <el-button size="small" style="width: 100%; font-size: 30px;" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#edit">Edit</el-button>
    </h1>
    <div style="margin: 24px 0;">
      <a href="#"><i class="fa fa-dribbble"></i></a>
      <a href="#"><i class="fa fa-twitter"></i></a>
      <a href="#"><i class="fa fa-linkedin"></i></a>
      <a href="#"><i class="fa fa-facebook"></i></a>
    </div>
  </div>
</template>
<script>
import {h} from "vue";
export default {
  data() {
    return {
      regi: [],
      errorFlag: false,
      token: "",
      image: "",
      copyEmail: "",
      first_name: "",
      previewImage: null,
      last_name: "",
      newEmail: "",
      passwords: "",
      currentPass: "",
      logProfile: "",
      displayImage: null,
      id: "",
      events: [],
      allForm: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      }

    }
  },
  methods: {
    registerUser() {
      this.axios.post('http://localhost:4941/api/v1/users/register', {
        "firstName": this.allForm.firstName,
        "lastName": this.allForm.lastName,
        "email": this.allForm.email,
        "password": this.allForm.password,
        "image_filename": this.allForm.image
      }).then((response) => {
        this.regi = response.config.data;
        this.allForm.userId = response.data;
        this.first_name = this.allForm.firstName;
        this.last_name = this.allForm.lastName;
        this.newEmail = this.allForm.email;
        this.open("successfully registered your new UserId is: "+ response.data.userId);
        this.axios.post('http://localhost:4941/api/v1/users/login', {
          "email": this.allForm.email,
          "password": this.allForm.password
        }).then((response) => {
          this.allForm.token = response.data.token;
          this.allForm.id = response.data.userId;
          this.axios.put('http://localhost:4941/api/v1/users/' + this.allForm.id + '/image', this.allForm.image
              , {
                headers: {
                  "X-Authorization": this.allForm.token,
                  "Content-Type": this.allForm.image.type
                }
              }).then((response) => {
          this.axios.get(response.config.url
          ).then((response) => {
            this.displayImage = response.config.url
          }).catch((e) => {
            if (e.response.status == 404 ) {
              console.log(this.displayImage);
              this.displayImage = 'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png';
            }
          });
          });
        });
      }).catch((e) => {
        this.open(e.response.status + " " + e.response.statusText);

      });
    },
    logIn() {
      this.axios.post('http://localhost:4941/api/v1/users/login', {
        "email": this.allForm.email,
        "password": this.allForm.password
        }).then((response) => {
        this.token = response.data.token;
        this.id = response.data.userId;
        this.copyEmail = response.config.data.email;
        localStorage.setItem("password", this.allForm.password);
        localStorage.setItem("auth_token", this.token);
        localStorage.setItem("userId", this.id);
        this.open("loggen in with userId of: " + this.id);
      this.axios.get('http://localhost:4941/api/v1/users/' + this.id)
      .then((response) => {
        console.log(response.data);
        this.logProfile = response.data;
        console.log(this.token, this.id);
        this.first_name = this.logProfile.firstName;
        this.last_name = this.logProfile.lastName;
        this.newEmail = this.allForm.email;
      this.axios.get('http://localhost:4941/api/v1/users/' + this.id + '/image'
      ).then((response) => {
        console.log(response);
        this.displayImage = 'http://localhost:4941/api/v1/users/' + this.id + '/image'
      }).catch((e) => {
        if (e.response.status == 404 ) {
          console.log(this.displayImage);
          this.displayImage = 'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png';
        }
      });
      });
      }).catch((e) => {
        this.open(e.response.status + " " + e.response.statusText);
      });
    },
    editUser() {
      this.currentPass = this.allForm.password;
      this.axios.patch('http://localhost:4941/api/v1/users/' + localStorage.getItem("userId"), {
        "firstName": this.first_name,
        "lastName": this.last_name,
        "email": this.newEmail,
        "password": this.passwords,
        "currentPassword": localStorage.getItem("password")
      }, {headers:{
        "X-Authorization": localStorage.getItem("auth_token")
      }
      }).then((response) => {
        console.log(response);
        this.open(response.status + response.statusText);
      }).catch((e) => {
        this.open(e.response.status + " " + e.response.statusText);
      });
    },
    selectImage () {
      this.$refs.fileInput.click()
    },
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
        this.allForm.image = file[0];
      }
    },
    open(errorMessage) {
      this.$msgbox({
        title: 'Message',
        message: h('p', [
          h('span', errorMessage)
        ]),
        showCancelButton: true,
        confirmButtonText: 'OK',

      });
    },
    logOut() {
      this.axios.post('http://localhost:4941/api/v1/users/logout', {},{
        headers: {
          "X-Authorization": localStorage.getItem("auth_token")
        }
      }).then((response) => {
        console.log(response);
        this.open(response.status + " " +response.statusText);
      }).catch((e) => {
        this.open(e.response.status + " " + e.response.statusText);
      });
    }
  }
}
</script>
<style scoped>
.form{
  width: 30%;
  padding: 10px;
  outline: none;
  border: 2px solid dodgerblue;
}
.button{
  color: red;
  padding: 15px;
  cursor: pointer;
  width: 10.6%;
  opacity: 0.9;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}
</style>
