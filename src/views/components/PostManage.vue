<template>
  <div>
        <el-dialog title="Thông tin tài khoản"
                   :visible.sync="userDetailVisible"
                   width="40%">
          <div style="display: flex; margin-left: 10%">
            <div>
              <div style="display: flex;">
                <div style="text-align: left; width: 200px">
                  <i class="el-icon-user-solid"></i>
                  <label style="font-weight: bold; margin-left: 5px; font-size: 18px">Tên đăng nhập:</label>
                </div>
                <label style="font-size: 18px; font-weight: bold;">{{userSelected.username}}</label>
              </div>
              <div style="display: flex; margin-top: 15px">
                <div style="width: 250px; text-align: left">
                  <i class="el-icon-user"></i>
                  <label style="font-size: 18px; font-weight: bold;margin-left: 5px">Mật khẩu:</label>
                </div>
                <el-input size="mini" v-model="userSelected.newPassword" show-password></el-input>
              </div>
              <div style="display: flex; margin-top: 15px">
                <div style="width: 250px; text-align: left">
                  <i class="el-icon-s-cooperation"></i>
                  <label style="font-size: 18px; font-weight: bold;margin-left: 5px">Email:</label>
                </div>
                <el-input size="mini" v-model="userSelected.email"></el-input>
              </div>
              <div style="display: flex; margin-top: 15px">
                <div style="width: 250px; text-align: left">
                  <i class="el-icon-phone"></i>
                  <label
                          style="font-size: 18px;
                        font-weight: bold;
                        margin-left: 5px">SĐT:</label>
                </div>
                <el-input size="mini" v-model="userSelected.phoneNumber"></el-input>
              </div>
              <div style="margin-top: 15px; text-align: end">
                <el-button size="small" type="success" @click="updateUser">Lưu</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
    <header-bar-sale></header-bar-sale>
    <div>
      <el-dialog :visible.sync="visibleUpdate" append-to-body>
        <UpdatePost :selectedPost="selectedPost" :key="selectedPost"></UpdatePost>
      </el-dialog>
      <el-dialog @close="fetchAllPost" :visible.sync="visiblePostDetail" append-to-body title="Chi tiết bài đăng">
        <PostDetail :postDetail="postDetail" :key="postDetail" style="margin-top: -30px"></PostDetail>
      </el-dialog>
      <div>
      </div>
      <div style="width: 80%; margin: auto">
        <el-tabs type="border-card" style="margin-top: 10px" v-model="tabValue">
          <el-tab-pane label="Danh sách bài viết">
            <div style="display: flex; align-items: center">
              <label>Trạng thái:</label>
              <el-select size="mini" style="margin-left: 10px" v-model="status" placeholder="Trạng thái" clearable>
                <el-option label="Đã xác nhận" value="accepted">
                </el-option>
                <el-option label="Chưa xác nhận" value="nonaccept">
                </el-option>
              </el-select>
            </div>
        <el-table
        :data="posts"
        border
        style="margin-top: 15px"
        fit>
          <el-table-column prop="brand" label="Hãng" width="100">
          </el-table-column>
          <el-table-column prop="name" label="Tên">
          </el-table-column>
          <el-table-column prop="version" label="Phiên bản" width="90">
          </el-table-column>
          <el-table-column prop="yearOfManufacture" label="Năm sản xuất" width="80">
          </el-table-column>
          <el-table-column prop="capacity" label="Dung tích" width="60">
          </el-table-column>
          <el-table-column prop="colorInside" label="Màu nội thất" width="80">
          </el-table-column>
          <el-table-column prop="colorOutside" label="Màu ngoại thất" width="100">
          </el-table-column>
          <el-table-column label="Ngày tạo" width="130">
            <template slot-scope="scope">
              <label>{{formatTime(scope.row.createAt)}}</label>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="Chi tiết" width="200">
            <template slot-scope="scope">
              <label style="word-break: normal">{{getTextBird(scope.row.description, 50)}}</label>
            </template>
          </el-table-column>
          <el-table-column label="Xuất xứ">
            <template slot-scope="scope">
              <label style="word-break: normal">{{formatOrigin(scope.row)}}</label>
            </template>
          </el-table-column>
          <el-table-column label="Loại xe">
            <template slot-scope="scope">
              <label style="word-break: normal">{{formatCarType(scope.row.carType)}}</label>
            </template>
          </el-table-column>
          <el-table-column label="Hình ảnh" v-if="app.isAdmin">
            <template slot-scope="scope">
              <div style="display: flex; flex-wrap: wrap">
                <el-image
                  style="width: 50px; height: 50px"
                  :src="getUrl(scope.row)"
                  :preview-src-list="getListImageUrl(scope.row)">
                </el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.accept">
                <label>Đã xác nhận</label>
              </div>
              <div v-if="!scope.row.accept && !scope.row.confirm">
                <label size="mini" type="primary">Chưa xác nhận</label>
              </div>
              <div v-if="scope.row.confirm">
                <label size="mini" type="primary">Không được duyệt</label>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" width="150" v-if="!app.isAdmin">
            <template slot-scope="scope">
              <div style="display: flex; flex-wrap: wrap">
                <el-button size="mini" :disabled="scope.row.accept" @click="updatePost(scope.row)" type="success">Sửa</el-button>
                <el-button size="mini" :disabled="scope.row.accept" icon="el-icon-delete" @click="removePost(scope.row)" type="danger"></el-button>
                <el-button size="mini" plain type="primary" @click="gotoDetail(scope.row)">Xem chi tiết</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" v-else>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="goToPostDetail(scope.row)">Chi tiết</el-button>
            </template>
          </el-table-column>
        </el-table>
          </el-tab-pane>
          <el-tab-pane label="Quản lý người dùng" v-if="app.isAdmin">
            <div style="display: flex; align-items: center">
              <label style="width: 100px">Tìm kiếm:</label>
              <el-input
                      v-model="searchKey"
                      size="mini"
                      style="width: 250px"
                      placeholder="Nhập tên người dùng hoặc SĐT"></el-input>
            </div>
            <el-table
              :data="listUser"
              border
              fit
              style="margin-top: 15px">
              <el-table-column label="Tên đăng nhập">
                <template slot-scope="scope">
                  <label>{{scope.row.username}}</label>
                </template>
              </el-table-column>
              <el-table-column prop="email" label="email">
              </el-table-column>
              <el-table-column prop="phoneNumber" label="Số điện thoại">
              </el-table-column>
              <el-table-column label="Ngày tạo">
                  <template slot-scope="scope">
                    <label>{{formatTime(scope.row.createAt)}}</label>
                  </template>
              </el-table-column>
              <el-table-column label="Thao tác">
                <template slot-scope="scope">
                  <div>
                    <el-button type="primary" size="mini" @click="editUser(scope.row)">Sửa</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-pagination
                background
                @current-change="pageChange"
                :hidden="visiblePage"
                :current-page="page"
                :total="totalPage * 10"
                layout="prev, pager, next">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {api} from "@/lib/api";
  import {app} from "@/lib/app";
  import UpdatePost from "@/views/components/UpdatePost";
  import HeaderBarSale from "@/views/components/HeaderBarSale";
  import PostDetail from "@/views/components/PostDetail";

  export default {
      // props:{
      //   postData: Object
      // },
      components:{
          HeaderBarSale,
        UpdatePost,
          PostDetail

      },
      watch:{
          tabValue(){
              if (this.tabValue == 0){
                  if (app.isAdmin){
                      this.fetchAllPost();
                  }else {
                      this.findPostByUserId();
                  }
              }
              if (this.tabValue == 1){
                  this.fetchAllUser();
              }
          },
          searchKey(){
              this.fetchAllUser();
          },
          status(){
              if (app.isAdmin){
                  this.fetchAllPost();
              }else {
                  this.findPostByUserId();
              }
          }
      },
      data(){
        return{
            listUser:[],
          posts:[],
          page:1,
          totalPage:0,
          visiblePage: true,
          listImage: [],
          visibleUpdate: false,
          selectedPost:{},
          visiblePostDetail: false,
            postDetail:{},
            tabValue:"",
            searchKey: "",
            userDetailVisible: false,
            userSelected: {},
            status:""
        }
      },
      methods:{
          async fetchAllPost(){
              var response = await api.callAPI(
                  "GET",
                  "/api/post/findAll?" +
                  "status=" +
                  this.status +
                  "&page=" +
                  1 +
                  "&pageSize=" + 20,
                  null);
              if (response.data){
                  this.posts = response.data.content;
                  this.totalPage = response.data.totalPages;
                  this.visiblePage = response.data.totalPages.length = 1;
              }
          },
          async findPostByUserId(){
              var response = await api.callAPI(
                  "GET",
                  "/api/post/findByUserId?userId="
                  + this.app.user.id
                  + "&status="
                  + this.status
                  +"&page=" + 1
                  +"&pageSize=" + 10,
                  null
              );
              if (response.data){
                  this.posts = response.data.content;
                  this.totalPage = response.data.totalPages;
                  this.visiblePage = response.data.totalPages.length = 1;
              }
          },
          async pageChange(page){
              var response = await api.callAPI(
                  "GET",
                  "/api/post/findAll?" +
                  "status=" +
                  this.status +
                  "&page=" +
                  page +
                  "&pageSize="+ 20,
                  null
              )
              if (response.data){
                  this.posts = response.data.content;
                  this.totalPage = response.data.totalPages;
                  this.visiblePage = response.data.totalPages.length = 1;
              }
          },
          async acceptPost(post){
              var response = await api.callAPI(
                  "POST",
                  "/api/post/acceptPost" +
                  "?postId="
                  + post.id
                  +"&userId=" + app.user.id,null);
              if (response.data){
                  this.alertSuccess("Xác nhận thành công");
                  this.visiblePostDetail = false;
              }
          },
          getListImageUrl(post){
              this.listImage = [];
              for (var image of post.images){
                  this.listImage.push(image.url);
              }
              return this.listImage;
          },
          getUrl(post){
              return post.images[0].url;
          },
          updatePost(post){
              this.selectedPost = post;
              this.visibleUpdate = true;
          },
          removePost(post){
              this.$confirm('Bạn có chắc chắn muốn xóa','Thông báo',{
                  confirmButtonText:'OK',
                  cancelButtonText: 'Cancel',
                  type:'warning'
              }).then( async () => {
                  var response = await api.callAPI("POST","/api/post/removePost?postId=" + post.id, null);
                  if (response.data){
                      this.alertSuccess("Xóa thành công");
                      this.findPostByUserId();
                  }
              })
          },
          goToPostDetail(post){
              this.postDetail = post;
              this.visiblePostDetail = true;
          },
          handleClickTab(){
              console.log(this.tabValue)
          },
          async fetchAllUser(){
              var response = await api.callAPI(
                  "GET",
                  "/api/user?" +
                  "searchKey=" + this.searchKey +
                  "&page=" + 1
                  + "&pageSize=" + 10,
                  null);
              if (response.data){
                  this.listUser = response.data.content;
              }
          },
          gotoDetail(row){
              this.$router.push("/detail/"+row.id);
          },
          editUser(user){
              this.userDetailVisible = true;
              this.userSelected = user;
          },
          async updateUser(){
              var response = await api.callAPI("POST","/api/admin/updateUser", this.userSelected);
              if (response.data){
                  this.alertSuccess("Thay đổi thông tin người dùng thành công");
                  this.this.userDetailVisible = false;
              }
          }
      },

       async beforeMount(){
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
          if (app.isAdmin){
              this.fetchAllPost();
          }else {
              this.findPostByUserId();
          }
          // this.posts = this.postData.content;
          // console.log(this.posts);
          // this.totalPage = this.postData.totalPages;
          // this.visiblePage = this.postData.totalPages.length > 1;

      }
  }
</script>

<style>
</style>