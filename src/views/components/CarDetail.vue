<template>
  <div>
  <header-bar-sale></header-bar-sale>
  <div style="width: 70%; margin: auto; margin-top: 10px">
    <el-card>
      <div>
        <div style="height: 30px;
        display: flex;
         border: 1px solid deepskyblue;
         border-radius: 6px">
          <div style="text-align: left">
          <label style="font-weight: bold; font-size: 20px">{{formatCarName(post)}}</label>
          </div>
          <div style="margin-left: 50%">
          <label style="font-style: italic; color: #595959">Đăng  ngày: {{formatDate(post.createAt)}}</label>
          </div>
        </div>
        <div style="margin-top: 15px">
          <div style="text-align: left">
          <label style="color: blue; font-size: 18px">Thông số cơ bản</label>
          </div>
          <div style="display: flex; margin-top: 20px">
            <div style="width: 50%; text-align: left">
              <div>
                <div style="display: flex">
                  <label style="width: 180px">Xuất xứ:</label>
                  <label>{{formatOrigin(post)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Tình trạng:</label>
                  <label>{{formatCarType(post.type)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Dòng xe:</label>
                  <label>{{post.vehicleType}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Số Km đã đi:</label>
                  <label>{{post.numberOfKmMoved}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Màu ngoại thất:</label>
                  <label>{{upperCaseFirstLetter(post.colorOutside)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Màu nội thất:</label>
                  <label>{{upperCaseFirstLetter(post.colorInside)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180">Số cửa:</label>
                  <label>{{post.numberDoor}} cửa</label>
                </div>

                <div style="text-align: left; margin-top: 20px">
                  <label style="color: blue; font-size: 18px">Nhiên liệu -  động cơ</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Động cơ:</label>
                  <label>{{formatFuel(post)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Hệ thống nạp nhiên liệu:</label>
                  <label>GDI</label>
                </div>
                <div style="text-align: left; margin-top: 20px">
                  <label style="color: blue; font-size: 18px">Hệ thống truyền động</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Hộp số:</label>
                  <label>{{formatGear(post)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Dẫn động:</label>
                  <label>{{post.wheelType}} - Dẫn động {{formatWheelType(post.wheelType)}}</label>
                </div>
                <div style="display: flex; margin-top: 10px">
                  <label style="width: 180px">Tiêu thụ nhiên liệu:</label>
                  <label>{{post.fuelConsumption}} L/Km</label>
                </div>
                <div style="text-align: left; margin-top: 20px">
                  <label style="color: blue; font-size: 18px">Thông tin mô tả</label>
                </div>
                <div style="width: 500px; margin-top: 20px">
                  <label style="word-break: normal">
                    {{post.description}}
                  </label>
                </div>
              </div>
            </div>
            <div style="flex: 1">
              <el-card>
                <div>
                  <el-image :src="imageSelected.url" :preview-src-list="urls"></el-image>
                </div>
                <div style="display: flex; margin-top: 20px; flex-wrap: wrap">
                  <div v-for="(image, index) in post.images"
                    :key="index"
                    style="margin-left: 10px; cursor: pointer"
                    @click="chooseImage(image)">
                    <el-image
                            :src="image.url"
                            style="height: 100px; width: 100px" ></el-image>
                  </div>
                </div>
              </el-card>
              <el-card style="margin-top: 20px">
                <div>
                  <div style="text-align: left; border-bottom: 1px solid lightgray">
                  <label style="font-size: 18px; color: #1f69c7">Liên hệ người bán</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div style="text-align: left; margin-top: 15px">
                      <i class="el-icon-phone-outline" style="font-size: 40px"></i>
                    </div>
                    <div style="text-align: left; margin-left: 20px">
                      <div style="margin-top: 5px">
                      <label>Tên : {{post.contact.fullName}}</label>
                      </div>
                      <div style="margin-top: 5px">
                      <label>Điện thoại: {{post.contact.phoneNumber}} hoặc {{post.contact.anotherPhoneNumber}}</label>
                      </div>
                      <div style="margin-top: 5px">
                        <label>Địa chỉ: {{post.contact.address}}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
  </div>
</template>

<script>
    import {api} from "@/lib/api";
    import HeaderBarSale from "@/views/components/HeaderBarSale";

    export default {
        components: {HeaderBarSale},
        data(){
            return{
              post:{},
              imageSelected: {},
              urls:[]
            }
        },
        methods:{
            async findPostById(postId){
                var response = await api.callAPI("GET","/api/post/findById?postId="+ postId, null);
                if (response.data){
                    this.post = response.data;
                    this.imageSelected = this.post.images[0];
                    this.getListUrl(this.post.images);
                }
            },
            chooseImage(image){
                this.imageSelected = image;
            },
            formatDate(createAt){
                var date = new Date(createAt);
                return date.getDay() +"/"+ date.getMonth()+"/"+date.getFullYear();
            },
            formatCarName(post){
                return 'Xe '+ post.brand + ' ' + this.upperCaseFirstLetter(post.name) + ' '+ post.capacity + ' '+ post.yearOfManufacture + ' - ' + post.price + ' Triệu';
            },
            getListUrl(images){
                for (var image of images){
                    this.urls.push(image.url);
                }
            }
        },
        beforeMount(){
           var postId = this.$route.params.id;
           this.findPostById(postId);
        }
    }
</script>

<style scoped>

</style>