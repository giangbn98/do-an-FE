<template>
    <div>
    <div style="display: flex;
     padding-top: 20px;
     padding-bottom: 20px;
     background: white;
     align-items: center;
     box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);">
        <img src="/img/logo.png" style="margin-left: 15%">
        <ul style="display: flex; list-style: none;margin-left: 40%">
            <li style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px;">Home</li>
            <li style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px">About</li>
            <li style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px; cursor: pointer"
            @click="openLogin" v-if="!app.isLogin" >Đăng nhập</li>
            <li style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px; cursor: pointer"
                @click="openUserDetail" v-else> Chào, {{app.user.username}}</li>
            <li style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px; cursor: pointer"
            @click="openRegister" v-if="!app.isLogin">
                Đăng ký</li>
            <li style="padding-left: 20px; padding-top: 10px; padding-bottom: 10px; cursor: pointer"
                @click="logout" v-else>
                Đăng xuất</li>
        </ul>
    </div>
    <div style="display: flex; background: #ededee;padding-bottom: 8%">
        <div style="margin-left: 15%;margin-top:8%;width: 25%">
            <h1 style="line-height: 40px;text-align: left">CREATING WEBSITES THAT MAKE YOU STOP & STARE</h1>
            <h2 style="text-align: left">
                Accusantium quam, aliquam ultricies eget tempor id, aliquam eget nibh et. Maecen aliquam, risus at semper. Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum.
            </h2>
        </div>
        <div style="margin-top: 8%; width: 25%;margin-left: 10%">
            <img src="/img/hero-img.png" style="width: 100%">
        </div>
    </div>
</div>
</template>

<script>
    import {app} from "@/lib/app";
    import {api} from "@/lib/api";

    export default {
        data() {
            return {
                user:{},
                isLogin: false,
                userDetailVisible: false,
                oldPass:"",
                newPass:"",
                reNewPass:"",
            };
    },
        methods:{
            openLogin(){
                this.$router.push("/login")
            },
            openRegister(){
                this.$router.push("/register")
            },
            logout(){
                window.location.href = "/login";
            },
            openUserDetail(){
                this.userDetailVisible = true;
            },
            updateUser(){

            },
            async changePassword(){
                if (this.newPass.localeCompare(this.reNewPass)){
                    return this.alertError("Mật khẩu mới không trùng nhau");
                }
                var request = {
                    username: app.user.username,
                    oldPassword: this.oldPass,
                    newPassword: this.newPass,
                }
                let response = await api.callAPI("POST","/api/user/changePassword", request);
                if (response.data){
                    this.alertSuccess("Đổi mật khẩu thành công");
                }
            }
        },
        async beforeMount(){
            // var res = await api.me();
            // if (res){
            //     app.user = res.data;
            //     app.isLogin = true;
            // }
        }
    }
</script>

<style scoped>
h1{
    font-family: "Dosis", sans-serif;
}
    h2{
        font-family: "Dosis", sans-serif;
        color: #1c698c;
        margin: 10px 0 0 0;
        font-size: 20px;
    }
li{
    font-family: "Open Sans", sans-serif;
    color: #1c698c;
    font-size: 20px;
}
</style>