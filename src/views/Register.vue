<template>
    <div class="full-screen" style="background-image: url('/img/r35.jpg');
     background-repeat: no-repeat;
    background-position: center;
    background-size: cover">
<!--        <div style="background-color: white;-->
<!--         box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);-->
<!--         width: 60%;-->
<!--         margin: 0 auto;-->
<!--         margin-top: 5%;padding-top: 2%;-->
<!--         padding-bottom: 15%">-->
            <el-card style="width: 50%; margin: auto; margin-top: 5%">
            <h1>Đăng ký tài khoản</h1>
            <div style="display: flex; width: 80%;margin:auto">
                <span style="text-align: left;font-size: 20px; width: 300px">Tên đăng nhập:</span>
                <el-input size="small" v-model="user.username"></el-input>
            </div>
            <div style="display: flex; width: 80%;margin:auto;margin-top: 2%">
                <span style="text-align: left;font-size: 20px; width: 300px">Mật khẩu:</span>
                <el-input size="small" v-model="user.password"></el-input>
            </div>
            <div style="display: flex; width: 80%;margin:auto;margin-top: 2%">
                <span style="text-align: left;font-size: 20px; width: 300px">Xác nhận mật khẩu:</span>
                <el-input size="small" v-model="rePassword"></el-input>
            </div>
            <div style="display: flex; width: 80%;margin:auto;margin-top: 2%">
                <span style="text-align: left;font-size: 20px; width: 300px">Email:</span>
                <el-input size="small" v-model="user.email"></el-input>
            </div>
            <div style="display: flex; width: 80%;margin:auto;margin-top: 2%">
                <span style="text-align: left;font-size: 20px; width: 300px">SĐT:</span>
                <el-input size="small" v-model="user.phoneNumber"></el-input>
            </div>
            <div style="display: flex;width: 80%;margin: auto; flex-flow: row-reverse;margin-top: 2%">
                <el-button size="small" @click="closeRegister" type="warning">Thoát</el-button>
                <el-button size="small" style="margin-right: 3%" @click="register" type="success">Đăng ký</el-button>
            </div>
            </el-card>
        </div>
</template>

<script>
    import {api} from "@/lib/api";

    export default {
        data(){
            return{
                user:{
                    username:"",
                    password:"",
                    email:"",
                    phoneNumber:""
                },
                rePassword:""
            }
    },
        methods:{
            async register(){
                if (/^\s*$/.test(this.user.username)){
                    this.alertError("Bạn vui lòng điền tên đăng nhập");
                    return;
                }else if (this.user.username.length < 6){
                    this.alertError("Tên đăng nhập phải nhiều hơn 6 kí tự")
                    return;
                }else if (this.validUserName(this.user.username)){
                    this.alertError("Tên đăng nhập không đúng định dạng");
                    return;
                }
                if (/^\s*$/.test(this.user.password)){
                    this.alertError("Bạn vui lòng điền mật khẩu");
                    return;
                } else if (this.user.password.length < 6) {
                    this.alertError("Mật khẩu phải nhiều hơn 6 ký tự");
                    return;
                }

                 if (/^\s*$/.test(this.user.email)){
                    this.alertError("Bạn vui lòng điền địa chỉ Email");
                    return;
                }
                if (this.validEmail(this.user.email)) {
                    this.alertError("Sai định dạng Email");
                    return;
                }

                if (this.rePassword.localeCompare(this.user.password)) {
                    this.$message({
                        showClose: true,
                        message: "Mật khẩu xác nhận không khớp",
                        type: "error",
                    });
                    return;
                }
                if (/^\s*$/.test(this.user.phoneNumber)){
                    this.alertError("Bạn vui lòng nhập số điện thoại");
                    return;
                }
                if (!this.validPhoneNumber(this.user.phoneNumber)){
                    this.alertError("Sai định dạng số điện thoại");
                    return;
                }
                this.user.username = this.user.username.toLowerCase();
                let response = await api.callAPI("POST","/api/user/createUser", this.user);
                if (response.data){
                    this.alertSuccess("Đăng kí tài khoản thành công");
                    this.$router.push("/login");
                }
            },
            closeRegister(){
                this.$router.push("/login");
            },
            validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(email)) return false;
                else return true;
            },
            validUserName(name) {
                var regex = /^[a-zA-Z0-9.\-_]{3,30}$/;
                return !regex.test(name);
            },
            validPhoneNumber(phoneNumber){
                return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumber);
            },
        }

    }
</script>

<style scoped>
span{
    font-family: "Dosis", sans-serif;
    font-weight: bold;
}
.full-screen{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 0;
}
</style>