<template>
    <div class="full-screen" style="display: flex; background-image: url('/img/m3.jpg');
     background-repeat: no-repeat;
    background-position: center;
    background-size: cover">
<!--        <img src="/img/m3.jpg" />-->
        <el-dialog
                title="Vui lòng điền mật khẩu mới"
                :visible.sync="visibleNewPassword"
                width="30%"
                append-to-body>
            <div style="padding-bottom: 40px">
            <el-input size="mini" placeholder="Mật khẩu" v-model="newPassword" show-password></el-input>
                <div style="margin-top: 15px; float: right">
                <el-button size="small" type="success" @click="saveNewPassword">Xác nhận</el-button>
                <el-button size="small" type="warning">Thoát</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog
                title="Vui lòng điền Email đã đăng kí tài khoản"
                :visible.sync="forgotPassVisible"
                width="30%"
                append-to-body
                @close="closeDialog"
        >
            <div style="padding-bottom: 40px">
                <el-input size="mini" placeholder="Email" v-model="email"></el-input>
                <div style="margin-top: 15px; float: right">
                    <el-button size="small" type="success" @click="forgotPassword">Xác nhận</el-button>
                    <el-button size="small" type="warning" @click="forgotPassVisible = false">Thoát</el-button>
                </div>
            </div>
        </el-dialog>
        <div style="width: 50%">
        </div>
    <div style="width: 30%;height: 40%">
        <el-card style="margin-top: 40%;padding-bottom: 6%">
            <h1 style="font-size: 18px">Vui lòng điền thông tin đăng nhập</h1>
            <el-input size="medium" v-model="user.username" placeholder="Tên đăng nhập" v-on:keyup.enter.native="login"></el-input>
            <el-input size="medium" v-model="user.password" placeholder="Mật khẩu" style="margin-top: 3%"
                v-on:keyup.enter.native="login" show-password></el-input>
            <div style="display: flex;margin-top: 3%;">
                <div style="width: 50%; text-align: left">
                    <div>
                    <el-button
                            size="mini"
                            type="text"
                            style="font-size: 14px"
                            @click="goToRegister">Đăng kí tài khoản</el-button>
                    </div>
                    <div style="margin-top: 5px">
                    <el-checkbox style="float: left" v-model="remember" >Nhớ mật khẩu</el-checkbox>
                    </div>
                </div>
                <div style="flex: 1">
                    <el-button size="medium" @click="login" style="float: right" type="success">Đăng nhập</el-button>
                </div>
            </div>
            <div style="float: left">
                <el-button type="text" @click="forgotPassVisible = true">Quên mật khẩu</el-button>
            </div>
            <div
                    class="fb-login-button"
                    data-size="large"
                    data-button-type="continue_with"
                    data-layout="default"
                    data-auto-logout-link="false"
                    data-use-continue-as="false"
                    data-width=""
                    onlogin="checkLoginState"
                    >

            </div>
        </el-card>
    </div>
    </div>
</template>

<script>

    import {app} from "@/lib/app"
    import {api} from "@/lib/api";
    import facebook from "@/lib/facebook"
    // import UploadImage from "@/lib/UploadImage";
    export default {
        data(){
            return{
                user:{
                    username:"",
                    password:""
                },
                remember:false,
                forgotPassVisible: false,
                email:"",
                visibleNewPassword:false,
                newPassword:"",
                code:""
            }
        },
        methods:{
            async login(){
                var res = await api.callAPI("POST", "/api/login", this.user);
                if (res){
                    app.user = res.data;
                    app.accessToken = res.data.accessToken;
                    app.isLogin = true;
                    localStorage.setItem("gbapp",app.accessToken);
                    for (var authoriti of app.user.user.authorities){
                        if (authoriti.code.includes("ADMIN")){
                            app.isAdmin = true;
                        }
                    }
                    if (this.remember){
                        this.setTokenToCookies();
                    }
                    this.$router.push("/home");
                    this.alertSuccess("Đăng nhập thành công");
                }
            },
            rememberMe(){
                console.log('aaa')
                // var date = new Date();
                // date.setTime(date.getTime() + (60*24*60*60*1000));
                // var expries = "expries="+date.toUTCString();
                // document.cookie = "remember_login_token" + app.token + ";" + expries + ";path=/";
            },
            setTokenToCookies(){
                var date = new Date();
                date.setTime(date.getTime() + (60*24*60*60*1000));
                var expires = "expires="+date.toUTCString();
                document.cookie = "remember_login_token=" + app.accessToken + ";" + expires + ";path=/";
            },
            async forgotPassword(){
                if (this.validEmail(this.email)){
                    return this.alertError("Bạn vui lòng nhập Email đã đăng kí tài khoản");
                }
                let response = await api.callAPI("POST","/api/resetPassword?email="+this.email, null);
                this.alertSuccess("Bạn vui lòng kiểm tra email");
                if (response.data){
                    this.forgotPassVisible = true;
                    this.forgotPassVisible = false;
                }
            },
            async confirmResetPassword(code){
                let response =
                    await api.callAPI("GET","/api/resetPassword/confirmResetPassword?code="+code, null);
                if (response.data) this.visibleNewPassword = true;
            },
            async saveNewPassword(){
                if (/^\s*$/.test(this.newPassword)){
                    this.alertError("Bạn phải nhập mật khẩu mới");
                }else {
                    let response =
                        await api.callAPI("POST",
                            "/api/resetPassword/" +
                            "saveNewPassword?newPassword="+this.newPassword
                            +"&code="+this.code, null);
                    if (response.data) {
                        this.visibleNewPassword = false;
                        this.alertSuccess("Đổi mật khẩu thành công");
                    }
                }
            },
            closeDialog(){
                this.email = "";
            },
            validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(email)) return false;
                else return true;
            },
            goToRegister(){
                this.$router.push("/register");
            }
        },
        beforeMount(){
            facebook.init();
            // UploadImage.init();
            this.code = this.$router.currentRoute.query.code;
            if (this.code != null && this.code != ""){
                this.confirmResetPassword(this.code);
            }
        }
    }
</script>

<style scoped>
.full-screen{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 0;
}
</style>