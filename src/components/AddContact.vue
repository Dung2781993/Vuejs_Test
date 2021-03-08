<template>
  <div class="body page-profile page-aside-left">
    <div class="page bg-white">
      <div class="page-header pb-0">
        <h1 class="page-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            class="modal-icons float-left mr-10 mr-5"
          >
            <g fill="none" fill-rule="evenodd">
              <circle cx="13.75" cy="17.75" r="3.75" fill="#DADFE3"></circle>
              <g stroke-width="1.5" stroke-linecap="round">
                <path
                  stroke="#6F7C87"
                  d="M29.39 31.39H5.75a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2h23.64a2 2 0 0 1 2 2v23.64a2 2 0 0 1-2 2z"
                ></path>
                <path
                  stroke="#000"
                  d="M16.838 16.788a3.448 3.448 0 1 1-6.897 0 3.448 3.448 0 0 1 6.897 0zm-8.375 9.327a3.135 3.135 0 0 1 3.135-3.135h3.583a3.135 3.135 0 0 1 3.136 3.135m9.899-14.26a4.718 4.718 0 1 1-9.435 0 4.718 4.718 0 0 1 9.435 0zm-4.761-1.817v3.436m-1.718-1.718h3.436"
                  stroke-linejoin="round"
                ></path>
              </g>
            </g>
          </svg>
          New contact
        </h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="">Home</a></li>
          <li class="breadcrumb-item">
            <a href="contact-list.php">Contacts</a>
          </li>
          <li class="breadcrumb-item active">New Contact</li>
        </ol>
      </div>
      <!-- Contacts Content -->
      <div class="page-main page-content p-0">
        <div class="panel-body container-fluid">
          <div class="row row-lg">
            <div class="col-md-12 col-lg-6">
              <form v-on:submit.prevent="submitForm" method="post" action="#" autocomplete="off">
                <div class="form-group form-group-sm row">
                  <label class="col-md-3 col-form-label font-weight-400"
                    >Full Name:
                  </label>
                  <div class="col-md-9">
                    <input
                      v-model="name"
                      type="text"
                      class="form-control form-control-sm"
                      name="name"
                      placeholder="Enter the name of this person"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="form-group form-group-sm row">
                  <label class="col-md-3 col-form-label font-weight-400"
                    >Title:
                  </label>
                  <div class="col-md-9">
                    <input
                      v-model="title"
                      type="text"
                      class="form-control form-control-sm"
                      name="title"
                      placeholder="Enter a title"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 col-form-label font-weight-400"
                    >Company:
                  </label>
                  <div class="col-md-9">
                    <input
                      v-model="company"
                      type="company"
                      class="form-control form-control-sm"
                      name="company"
                      placeholder="Enter company name"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="form-group  row">
                  <label class="col-md-3 col-form-label font-weight-400"
                    >About:
                  </label>
                  <div class="col-md-9">
                    <textarea
                      v-model="description"
                      class="form-control form-control-sm"
                      placeholder="Enter some text"
                    ></textarea>
                  </div>
                </div>
                <div class="form-group form-material row">
                  <label
                    class="col-md-3 col-form-label font-weight-400"
                  ></label>
                  <div class="col-md-9">
                    <button
                      type="submit"
                      class="btn btn-primary waves-effect waves-classic"
                    >
                      ADD CONTACT
                    </button>
                    <button
                      v-on:click="resetForm"
                      type="reset"
                      class="btn btn-default btn-outline waves-effect waves-classic"
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
export default {
  name: "addContactList",
  data() {
    return {
      name: null,
      title: null,
      company: null,
      description: null
    };
  },
  methods: {
    resetForm() {

    },
    submitForm() {
      if(this.name === null) {
        Vue.$toast.open({
            message: 'Please enter your name',
            type: 'error',
        });
        return '';
      }
      let params = {"name": this.name, "job_title":  this.title, "company": null, "avatar": null, "about": this.description};
      let authToken = localStorage.getItem('auth_token');
      let config = {headers: {
          'X-STRINGEE-AUTH': authToken
        }
      }
     
      axios
        .post("https://api-test.stringeex.com/v1/contact", params, config).then(response => {
            let message = response.data.msg;
            if(message === "Success") {
                Vue.$toast.open({
                  message: 'Add Contact Successfully',
                  type: 'success',
                });
                this.$router.push({ name: "contactList" });
            }else {
                Vue.$toast.open({
                    message: message,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            Vue.$toast.open({
              message: error.message,
              type: 'warning',
            });
        });
    }
  }
};
</script>
