<template>
  <div style="width: 70%; margin-left: 1%">
    <div style="border: 1px solid yellowgreen; margin-top: 8px; border-radius: 6px">
    <div>
      <h3>Danh sách xe đang bán</h3>
    </div>
<!--    <div style="display: flex; width: 80%; margin: auto;padding-bottom: 3%">-->
<!--      <el-input placeholder="Nhập tên xe" size="small" v-model="searchKey"></el-input>-->
<!--      <el-button type="success" size="small">Tìm kiếm</el-button>-->
<!--    </div>-->
    </div>
    <div v-if="posts.length > 0"
            style="border: 1px solid yellowgreen; border-radius: 6px; width: 100%; margin-top: 10px">
      <div
        v-for="(post, index) in posts"
        :key="index"
        style="display: flex; border-bottom: 1px solid gray; margin-top: 20px; cursor: pointer"
        @click="openCarDetail(post.id)"
      >
        <div style="float: left">
          <div>
          <label>{{formatCarType(post.carType)}}</label>
          </div>
          <div>
            <label style="font-weight: bold">{{post.yearOfManufacture}}</label>
          </div>
          <img :src="post.images[0].url" style="width: 150px; height: 150px; margin: 5px">
        </div>
        <div style="width: 50%">
          <div>
            <label style="font-weight: bold; color: #1c698c">{{formatCarName(post)}}</label>
          </div>
          <div style="text-align: left; margin: 15px 0 0 10px">
            <label>{{formatDetail(post)}}</label>
          </div>
          <div style="text-align: left; margin: 15px 0 0 10px">
            <label>{{getTextBird(post.description, 150)}}</label>
          </div>
        </div>
        <div style="width: 25%; text-align: left; margin-left: 10px">
          <div style="margin-left: 15px">
          <label style="font-weight: bold">{{formatPrice(post.price)}}</label>
          </div>
          <div style="margin-top: 10px">
            <label>Liên hệ:<label style="font-weight: bold">{{post.contact.fullName}}</label></label>
          </div>
          <div style="margin-top: 10px">
            <label>Địa chỉ:{{post.contact.address}}</label>
          </div>
          <div style="margin-top: 10px">
            <label>Điện thoại:{{post.contact.phoneNumber}}</label>
            <label style="margin-left: 15px"> hoặc {{post.contact.anotherPhoneNumber}}</label>
          </div>
        </div>
        <div>
          <label>{{post.contact.province}}</label>
        </div>
      </div>
      </div>
    <div v-else style="margin-top: 30%">
      <label style="font-weight: bold; font-size: 18px">Hiện không xe đang bán</label>
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
</template>

<script>
    import {api} from "@/lib/api";
    import {eventBus} from "@/main";

    export default {
        watch:{
            selectedBrand(){
                this.fetchAllPost();
            },
        },
        data(){
            return{
                posts:[],
                page: 0,
                totalPage: 0,
                visiblePage: true,
                searchKey:"",
                selectedBrand: "",
            }
        },
        methods:{
            async fetchAllPost(){
              var response = await api.callAPI(
                  "GET",
                  "/api/post?brand=" +
                  this.selectedBrand +
                  "&page=" + 1 +
                  "&pageSize=" + 10,
                  null);
              if (response.data){
                  this.posts = response.data.content;
                  this.totalPage = response.data.totalPages;
                  this.visiblePage = this.totalPage == 1 || this.posts.length == 0;
              }
            },
            async pageChange(page){
                var response = await api.callAPI(
                    "GET",
                    "/api/post?brand=" +
                    this.selectedBrand +
                    "&page=" + page +
                    "&pageSize=" + 10,
                    null);
                if (response.data){
                    this.posts = response.data.content;
                }
            },
            formatType(post){
                if (post.carType == "OLD"){
                    return "Xe cũ";
                }else return "Xe mới";
            },
            openCarDetail(postId){
                this.$router.push("/detail/"+postId);
            }

        },
        beforeMount(){
          this.fetchAllPost();
          eventBus.$on('selectedBrand', (brand) =>{
              this.selectedBrand = brand;
          })
        }
    }
</script>

<style scoped>

</style>