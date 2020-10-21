<template>
  <div>
    <div style="display: flex">
    <div style="width: 500px; flex-wrap: wrap;">
    <div v-if="images.length == 0" style="font-size: 18px">Bạn chưa có hình ảnh nào</div>
      <div v-if="images.length > 0" style="display: flex; flex-wrap: wrap">
      <div
           v-for="image in images"
            :key="image.id">
        <div style="float: right; margin-top: -13px" @click="removeImage(image)">
          <label style="font-size: 18px; cursor: pointer">X</label>
        </div>
        <img :src="image.url" style="width: 150px; height: 150px; margin-left: 15px">
      </div>
      </div>
    </div>
    <div style="flex: 1">
        <el-button style="margin-top: 16px; margin-bottom: 32px;margin-left: 8px" size="small" type="primary" @click="submitUpload">
          Upload
        </el-button>
        <el-upload ref="upload" class="upload-demo" drag
                   :action="'https://gb-app.herokuapp.com/api/image/upload?username='+app.user.username"
                   :auto-upload="false" :on-success="uploaded"
                   :on-error="error"
                   :file-list="fileList"
                   multiple
                   list-type="picture">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drop file here or
            <em>click to upload</em>
          </div>
        </el-upload>
    </div>
    </div>
  </div>
</template>

<script>
    import {api} from "@/lib/api";
    import {app} from "@/lib/app";

    export default {
        data(){
            return{
                fileList:[],
                images:[]
            }
        },
        methods:{
            submitUpload(){
                this.$refs.upload.submit();
            },
            uploaded(){
                this.alertSuccess("Upload hình ảnh thành công.");
                this.fetchImage();
            },
            async fetchImage(){
                let response = await api.callAPI("GET","/api/image?username="+app.user.username, null);
                if (response.data){
                    this.images = response.data;
                }
            },
            async removeImage(image){
                let response = await api.callAPI("POST","/api/image/remove?imageId=" + image.id, null);
                if (response.data){
                    this.alertSuccess("Xóa hình ảnh thành công");
                    this.fetchImage();
                }
            }
        },
        beforeMount(){
          this.fetchImage();
        }
    }
</script>

<style scoped>

</style>