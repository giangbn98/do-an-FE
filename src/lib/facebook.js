import {api} from "@/lib/api";
import {app} from "@/lib/app";

var init = function () {
    if (!document.getElementById("fb-script")){
        let fbScript = document.createElement("script");
        fbScript.setAttribute("id", "fb-script");
        fbScript.setAttribute("src","https://connect.facebook.net/en_US/sdk.js");
        document.head.appendChild(fbScript);

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '920552995074340',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v7.0'
            });
            window.FB.AppEvents.logPageView();
        };

    }

    window.checkLoginState = function () {
        window.FB.getLoginStatus(function (response) {
            if (response.status == "connected"){
                var request = {
                    accessToken : response.authResponse.accessToken,
                    data_access_expiration_time: response.authResponse.data_access_expiration_time,
                    expiresIn: response.authResponse.expiresIn,
                    userID: response.authResponse.userID
                }

                api.callAPI("POST","/api/login-facebook", request).then(res => {
                    if (res){
                        app.user = res.data;
                        app.accessToken = res.data.accessToken;
                        app.isLogin = true;
                        localStorage.setItem("gbapp",app.accessToken);
                        app.vue.$router.push("/home");
                        app.vue.alertSuccess("Đăng nhập thành công")
                    }
                })
            }
        })
    }


}

export default {init}