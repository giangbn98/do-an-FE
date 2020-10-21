<template>
  <div>
  <div style="display: flex; width: 90%; flex-wrap: wrap">
    <div v-for="image in images"
        :key="image.id"
    @click="chooseImage(image)"
    v-bind:class="carStyle(image)"
    style="margin-left: 20px">
        <img :src="image.url" style="width: 200px ; height: 200px; border-radius: 6px">
    </div>
  </div>
    <div style="text-align: center; margin-top: 30px">
      <el-button @click="sendImages">Chọn</el-button>
    </div>
  </div>
</template>

<script>
    import {api} from "@/lib/api";
    import {app} from "@/lib/app";

    export default {
        props:{
            visibleImage: Boolean,
        },
        data(){
            return{
                images:[],
                selectedImage:[]
            }
        },
        methods:{
            chooseImage(image){
                this.selectedImage.indexOf(image) == -1 ? this.pushImage(image) : this.removeImage(image);
            },
            pushImage(image){
              this.selectedImage.push(image);
            },
            removeImage(image){
                this.selectedImage.splice(this.selectedImage.indexOf(image),1);
            },
            carStyle(image){
                return this.selectedImage.indexOf(image) != -1 ? "car-selected" : ""
            },
            sendImages(){
                if (this.selectedImage.length == 0 ) return this.alertError("Bạn chưa chọn hình ảnh nào");
                this.$emit('selectedImages',this.selectedImage);
            },
            async fetchImage(){
                let response = await api.callAPI("GET","/api/image?username="+app.user.username, null);
                if (response.data){
                    this.images = response.data;
                }
            },
        },
        beforeMount(){
            if (this.visibleImage){
                this.fetchImage();
            }else {
                this.fetchImage();
            }
        }
    }
</script>

<style scoped>
.car-selected{
  border: 2px solid red;
  border-radius: 8px;
}
</style>