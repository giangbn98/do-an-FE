<template>
  <div style="
    background: #1f69c7;
    width: 100vw;
    height: 50px;
    top: 0;
    left: 0;
    align-items: center;
    margin: -8px">
      <el-dialog :visible.sync="visibleUpdate" append-to-body>
        <UpdatePost
                :selectedPost="selectedPost"
                :key="selectedPost.id"
                :reason="reason"
                ></UpdatePost>
      </el-dialog>
    <el-dialog :visible.sync="visibleImage" style="margin-top: -64px" title="Thư Viện Ảnh">
      <image-library></image-library>
    </el-dialog>
    <el-dialog :visible.sync="visible" @open="open()" style="margin-top: -64px" >
      <SellCar style="margin-top: -60px"></SellCar>
    </el-dialog>
<!--    <el-dialog-->
<!--            :visible.sync="visiblePostManage"-->
<!--            style="margin-top: -64px;"-->
<!--            title="Quản lý bài đăng">-->
<!--      <PostManage :postData="postData" :key="postData"></PostManage>-->
<!--    </el-dialog>-->
    <div style="margin: 0 10% 0 10%">
      <el-dialog title="Thông tin tài khoản"
                 :visible.sync="userDetailVisible"
                 width="50%">
        <div style="display: flex; margin-left: 2%">
          <el-card>
          <div>
            <div style="display: flex;">
              <div style="text-align: left; width: 200px">
                <i class="el-icon-user-solid"></i>
                <label style="font-size: 16px; font-weight: bold; margin-left: 5px">Tên đăng nhập:</label>
              </div>
              <label style="font-size: 16px; font-weight: bold;">{{app.user.username}}</label>
            </div>
<!--            <div style="display: flex; margin-top: 10px">-->
<!--              <div style="width: 200px; text-align: left">-->
<!--                <i class="el-icon-user"></i>-->
<!--                <label style="font-size: 16px; font-weight: bold;margin-left: 5px">Tên:</label>-->
<!--              </div>-->
<!--              <el-input size="mini" v-model="app.user.fullName"></el-input>-->
<!--            </div>-->
            <div style="display: flex; margin-top: 10px">
              <div style="width: 200px; text-align: left">
                <i class="el-icon-s-cooperation"></i>
                <label style="font-size: 16px; font-weight: bold;margin-left: 5px">Email:</label>
              </div>
              <el-input size="mini" v-model="app.user.email"></el-input>
            </div>
            <div style="display: flex; margin-top: 10px">
              <div style="width: 200px; text-align: left">
                <i class="el-icon-phone"></i>
                <label
                        style="font-size: 16px;
                        font-weight: bold;
                        margin-left: 5px">SĐT:</label>
              </div>
              <el-input size="mini" v-model="app.user.phoneNumber"></el-input>
            </div>
            <div style="margin-top: 15px; text-align: end">
              <el-button size="small" type="success" @click="updateUser">Lưu</el-button>
            </div>
          </div>
          </el-card>
          <div style="border-left: 1px solid gray; margin-left: 30px; margin-right: 30px"></div>
          <el-card>
          <div>
            <h3>Đổi mật khẩu</h3>
            <div style="display: flex">
              <div style="width: 230px; text-align: left">
                <label>Nhập mật khẩu cũ:</label>
              </div>
              <el-input size="mini" v-model="oldPass" show-password></el-input>
            </div>
            <div style="display: flex; margin-top: 10px">
              <div style="width: 230px; text-align: left">
                <label>Nhập mật khẩu mới:</label>
              </div>
              <el-input size="mini" v-model="newPass" show-password></el-input>
            </div>
            <div style="display: flex; margin-top: 10px">
              <div style="width: 230px; text-align: left">
                <label>Nhập lại mật khẩu mới:</label>
              </div>
              <el-input size="mini" v-model="reNewPass" show-password></el-input>
            </div>
            <el-button
                    size="small"
                    type="success"
                    style="float: right; margin-top: 20px"
                    @click="changePassword">
              Đổi mật khẩu</el-button>
          </div>
          </el-card>
        </div>
      </el-dialog>
      <div style="display: flex; float: left">
        <div style="border-right: 2px solid #2bcef2; cursor: pointer; height: 50px" @click="goHome">
          <el-avatar
                  icon="el-icon-s-shop"
                  shape="square"
                  style="background: #1f69c7; font-size: 42px; margin-right: 5px">
          </el-avatar>
        </div>
        <div style="width: 130px; border-right: 2px solid #2bcef2; height: 50px">
          <el-button
                  type="text"
                  style="color: white; font-size: 18px; font-weight: bold; text-align: center"
                  @click="sellCar">
            BÁN Ô TÔ</el-button>
        </div>
        <div style="width: 150px; border-right: 2px solid #2bcef2; height: 50px">
          <el-button
                  type="text"
                  style="color: white; font-size: 18px; font-weight: bold; text-align: center"
                  @click="openImage">
            THƯ VIỆN ẢNH</el-button>
        </div>
        <div style="width: 150px; border-right: 2px solid #2bcef2; height: 50px">
          <el-button
                  type="text"
                  style="color: white; font-size: 18px; font-weight: bold; text-align: center"
                  @click="openFindCar">
            TÌM MUA XE</el-button>
        </div>
      </div>
      <div style="float: right;display: flex">
        <div>
          <div @click="visibleNotification = !visibleNotification">
         <el-badge :value="unreadNotifications.size" style="margin-top: 10px">
        <el-avatar icon="el-icon-bell"
                   shape="square"
                   style="background: #1f69c7; font-size: 25px ;cursor: pointer"
                    ></el-avatar>
            </el-badge>
          </div>
          <div style="margin-left: -150px">
          <el-popover
            width="300"
            v-model="visibleNotification">
            <div v-if="notifications.length == 0">Bạn không có thông báo nào</div>
            <div
              v-for="(notification, index) in notifications"
              :key="index"
              @click="handleClickNotification(notification)">
              <div
                      style="display: flex; cursor: pointer; padding: 5px"
                      v-bind:class="styleNotification(notification)">
                <div>
                  <el-avatar icon="el-icon-warning"
                             style="color: #1f69c7; background: white; font-size: 22px"></el-avatar>
                </div>
                <div style="margin-left: 5px">
                  <div>
                  <label style="color: black; word-break: normal">{{notification.content}}</label>
                  </div>
                  <div>
                  <label style="color: black">{{notification.createdAt}}</label>
                  </div>
                </div>
              </div>
              <div style="border-bottom: 1px solid gray"></div>
            </div>
          </el-popover>
          </div>
        </div>
        <div>
        <el-dropdown @command="handleCommand">
          <el-avatar
                  size="medium"
                  style="background: #1e7e34; margin: 4px 10px; cursor: pointer"
          ><label style="font-weight: bold">{{app.user.username.charAt(0).toUpperCase()}}</label></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">Trang cá nhân</el-dropdown-item>
            <el-dropdown-item command="userPost" v-if="!app.isAdmin">Danh sách bài đăng</el-dropdown-item>
            <el-dropdown-item v-if="app.isAdmin" command="postManage">Quản lý</el-dropdown-item>
            <el-dropdown-item command="logout">Đăng xuất</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import SellCar from "@/views/home/SellCar";
    import ImageLibrary from "@/views/components/ImageLibrary";
    import {app} from "@/lib/app";
    import {api} from "@/lib/api";
    import CheckEmpty from "@/lib/CheckEmpty";
    import websocket from "@/lib/websocket";
    import {eventBus} from "@/main";
    import UpdatePost from "@/views/components/UpdatePost";


    export default {
        components:{
            SellCar,
            ImageLibrary,
            UpdatePost

        },
        data(){
            return{
                userDetailVisible: false,
                oldPass:"",
                newPass:"",
                reNewPass:"",
                visible: false,
                visibleImage: false,
                visiblePostManage: false,
                postData:{},
                visibleNotification: false,
                notifications:[],
                unreadNotifications:[],
                visibleUpdate: false,
                selectedPost:{},
                reason:''
            }
        },
        methods:{
            openUserDetail(){
                // this.userDetailVisible = true;
            },
            async fetchAllBrand(){
                var response = await api.callAPI("GET","/api/brand", null);
                if (response.data) app.brands = response.data;
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
            },
            async updateUser(){
                if (CheckEmpty.checkInput(this.app.user.email)){
                    return this.alertError("Bạn chưa nhập email")
                }
                if (!this.validPhoneNumber(this.app.user.phoneNumber)){
                    return this.alertError("Sai định dạng SĐT");
                }
                var request = {
                    id: this.app.user.id,
                    email : this.app.user.email,
                    phoneNumber : this.app.user.phoneNumber,
                }
                var response = await api.callAPI("POST","/api/user/update", request);
                if (response.data){
                    this.alertSuccess("Thay đổi thông tin thành công");
                }
            },
            validPhoneNumber(phoneNumber){
                return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumber);
            },
            goHome(){
                window.location.href = "/home";
            },
            sellCar(){
                this.visible = true;
            },
            openImage(){
                this.visibleImage = true;
            },
            openFindCar(){
                this.$router.push("/car");
            },
            handleCommand(command){
              switch (command) {
                  case "logout":
                      this.logout();
                      break;
                  case "userInfo":
                      this.userDetailVisible = true;
                      break;
                  case "postManage":
                      // this.fetchAllPost();
                      // this.visiblePostManage = true;
                      this.$router.push("/manage");
                      break;
                  case "userPost":
                      // this.findPostByUserId();
                      // this.visiblePostManage = true;
                      this.$router.push("/manage");
                      break;
              }
            },
            logout(){
                localStorage.removeItem("gbapp");
                api.me();
            },
            async fetchAllPost(){
                var response = await api.callAPI(
                    "GET",
                    "/api/post/findAll?" +
                    "page=" +
                    1 +
                    "&pageSize=" + 1,
                    null);
                if (response.data){
                    this.postData = response.data;
                }
            },
            async findPostByUserId(){
                var response = await api.callAPI(
                    "GET",
                    "/api/post/findByUserId?userId="
                    + app.user.id
                    +"&page=" + 1
                    +"&pageSize=" + 20,
                    null
                );
                if (response.data){
                    this.postData = response.data;
                }
            },
            async fetchAllNotification(){
                this.unreadNotifications = new Set();
                let response = await api.callAPI("GET","/api/notification?userId="+ app.user.id, null);
                if (response.data){
                    this.notifications = response.data;
                    if (this.notifications.length > 0){
                        for (var noti of this.notifications){
                            if (noti.read == false){
                                this.unreadNotifications.add(noti);
                            }
                        }
                    }
                }
            },
            async handleClickNotification(notification){
                await api.callAPI("POST","/api/notification?notificationId=" + notification.id ,null);
                if (notification.reason == null) {
                    this.$router.push("/detail/" + notification.postId);
                }else {
                    this.findPostById(notification.postId);
                    this.reason = notification.reason;
                    this.visibleUpdate = true;
                }
                this.fetchAllNotification();
            },
            styleNotification(notification){
                return notification.read ? "" : "notification";
            },
            open(){
                console.log('ab')
            },
            async findPostById(postId){
                var response = await api.callAPI("GET","/api/post/findById?postId="+ postId, null);
                if (response.data){
                    this.selectedPost = response.data;
                }
            },
        },
        mounted(){
            websocket.requestConnect();
        },
        async beforeMount() {
            var res = await api.me();
            if (res) {
                app.user = res.data;
                app.isLogin = true;

                for (var authoriti of app.user.authorities) {
                    if (authoriti.code.includes("ADMIN")) {
                        app.isAdmin = true;
                        break;
                    }
                }
            }
            this.fetchAllBrand();
            this.fetchAllNotification();

            eventBus.$on('notification', notifi =>{
                console.log(notifi);
                this.notifications.unshift(notifi);
                console.log(this.notifications);
                if (this.notifications.length > 0){
                    for (var noti of this.notifications){
                        if (noti.read == false){
                            this.unreadNotifications.add(noti);
                        }
                    }
                }
            })
        }
    }
</script>

<style>
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 80%;
  }
  .notification{
    background: #a1c1ea;
  }
</style>