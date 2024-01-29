<template>
  <NavbarUser />
  <br />
  <br />
  <br />
  <br />
  <div class="contact1">
    <div class="container-contact1">
      <div class="contact1-pic js-tilt" data-tilt="">
        <img src="../../assets/image/contact.png" alt="IMG" />
      </div>
      <form class="contact1-form validate-form">
        <span class="contact1-form-title"> Gửi đánh giá </span>
        <div
          class="wrap-input1 validate-input"
          data-validate="Name is required"
        >
          <input
            class="input1"
            type="text"
            name="name"
            placeholder="Name"
            v-model="name"
          />
          <span class="shadow-input1"></span>
        </div>
        <div
          class="wrap-input1 validate-input"
          data-validate="Valid email is required: ex@abc.xyz"
        >
          <input
            class="input1"
            type="text"
            name="email"
            placeholder="Email"
            v-model="email"
          />
          <span class="shadow-input1"></span>
        </div>
        <div
          class="wrap-input1 validate-input"
          data-validate="Subject is required"
        >
          <input
            class="input1"
            type="text"
            name="subject"
            placeholder="Subject"
            v-model="subject"
          />
          <span class="shadow-input1"></span>
        </div>
        <div
          class="wrap-input1 validate-input"
          data-validate="Message is required"
        >
          <textarea
            class="input1"
            name="message"
            placeholder="Message"
            v-model="message"
          ></textarea>
          <span class="shadow-input1"></span>
        </div>
        <div class="container-contact1-form-btn">
          <button class="contact1-form-btn" @click="sendEmail">
            <span>
              Gửi
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script>
import NavbarUser from "@/components/Header/NavbarUser.vue";
import Footer from "@/components/Menu/Footer.vue";
import axios from "axios";
export default {
  components: {
    NavbarUser,
    Footer,
  },
  methods: {
    async sendEmail() {
      try {
        const formData = {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
        };

        const response = await axios.post(
          "http://localhost:3000/contact",
          formData
        );

        if (response.status === 200) {
          console.log("gửi thành công");
        } else {
          console.error("gửi thất bại");
        }
      } catch (error) {
        console.error("có lỗi khi gưei:", error);
      }
    },
  },
};
</script>

<style>
@media print {
  *,
  ::after,
  ::before {
    text-shadow: none !important;
    box-shadow: none !important;
  }
  img {
    page-break-inside: avoid;
  }
}
*,
::after,
::before {
  box-sizing: inherit;
}
img {
  vertical-align: middle;
  border-style: none;
}
button,
input,
textarea {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}
button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}
button,
input,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
button,
input {
  overflow: visible;
}
button {
  text-transform: none;
}

textarea {
  overflow: auto;
  resize: vertical;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fa-long-arrow-right:before {
  content: "\f178";
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  outline: none;
  border: none;
}
textarea {
  outline: none;
  border: none;
}
textarea:focus,
input:focus {
  border-color: transparent !important;
}
button {
  outline: none !important;
  border: none;
  background: 0 0;
}
button:hover {
  cursor: pointer;
}
.contact1 {
  width: 100%;
  min-height: 100%;
  padding: 15px;
  background: rgb(107, 151, 196);
  background: -webkit-linear-gradient(left, #0072ff, #00c6ff);
  background: -o-linear-gradient(left, #0072ff, #00c6ff);
  background: -moz-linear-gradient(left, #0072ff, #00c6ff);
  background: linear-gradient(to left, #000, #fff);
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.container-contact1 {
  width: 1163px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 90px 130px 88px 148px;
}
.contact1-pic {
  width: 296px;
}
.contact1-pic img {
  max-width: 100%;
}
.contact1-form {
  width: 390px;
}
.contact1-form-title {
  display: block;
  font-family: Montserrat-ExtraBold;
  font-size: 24px;
  color: #333;
  line-height: 1.2;
  text-align: center;
  padding-bottom: 44px;
}
input.input1 {
  height: 50px;
  border-radius: 25px;
  padding: 0 30px;
}
input.input1 + .shadow-input1 {
  border-radius: 25px;
}
textarea.input1 {
  min-height: 150px;
  border-radius: 25px;
  padding: 12px 30px;
}
textarea.input1 + .shadow-input1 {
  border-radius: 25px;
}
.wrap-input1 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 20px;
}
.input1 {
  display: block;
  width: 100%;
  background: #e6e6e6;
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #666;
}
.shadow-input1 {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0 0;
  color: rgba(87, 184, 70, 0.5);
}
.input1:focus + .shadow-input1 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}
.container-contact1-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.contact1-form-btn {
  min-width: 193px;
  height: 50px;
  border-radius: 25px;
  background: #57b846;
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.contact1-form-btn i {
  margin-left: 7px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.contact1-form-btn:hover {
  background: #333;
}
.contact1-form-btn:hover i {
  -webkit-transform: translateX(10px);
  -moz-transform: translateX(10px);
  -ms-transform: translateX(10px);
  -o-transform: translateX(10px);
  transform: translateX(10px);
}
@media (max-width: 1200px) {
  .contact1-pic {
    width: 33.5%;
  }
  .contact1-form {
    width: 44%;
  }
}
@media (max-width: 992px) {
  .container-contact1 {
    padding: 90px 80px 88px 90px;
  }
  .contact1-pic {
    width: 35%;
  }
  .contact1-form {
    width: 55%;
  }
}
@media (max-width: 768px) {
  .container-contact1 {
    padding: 90px 80px 88px;
  }
  .contact1-pic {
    display: none;
  }
  .contact1-form {
    width: 100%;
  }
}
@media (max-width: 576px) {
  .container-contact1 {
    padding: 90px 15px 88px;
  }
}
.validate-input {
  position: relative;
}
@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0 0 80px 30px;
    opacity: 0;
  }
}
@keyframes anim-shadow {
  to {
    box-shadow: 0 0 80px 30px;
    opacity: 0;
  }
}
</style>