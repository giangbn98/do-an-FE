<template>
  <div>
      <el-card>
        <div>
          <div style="height: 30px;
        display: flex;
         border: 1px solid deepskyblue;
         border-radius: 6px">
            <div style="text-align: left">
              <label style="font-weight: bold; font-size: 20px">{{formatCarName(post)}}</label>
            </div>
            <div style="margin-left: 35%">
              <label style="font-style: italic; color: #595959">Đăng  ngày: {{formatDate(post.createAt)}} </label>
            </div>
          </div>
          <div style="margin-top: 15px">
            <div style="text-align: left">
              <label style="color: blue">Thông số cơ bản</label>
            </div>
            <div style="display: flex; margin-top: 20px">
              <div style="width: 50%; text-align: left">
                <div>
                  <div style="display: flex">
                    <label style="width: 150px">Xuất xứ:</label>
                    <label>{{formatOrigin(post)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Tình trạng:</label>
                    <label>{{formatCarType(post.type)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Dòng xe:</label>
                    <label>{{post.vehicleType}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Số Km đã đi:</label>
                    <label>{{post.numberOfKmMoved}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Màu ngoại thất:</label>
                    <label>{{upperCaseFirstLetter(post.colorOutside)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Màu nội thất:</label>
                    <label>{{upperCaseFirstLetter(post.colorInside)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Số cửa:</label>
                    <label>{{post.numberDoor}} cửa</label>
                  </div>
                  <div style="text-align: left; margin-top: 20px">
                    <label style="color: blue">Nhiên liệu -  động cơ</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Động cơ:</label>
                    <label>{{formatFuel(post)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Hệ thống nạp nhiên liệu:</label>
                    <label>GDI</label>
                  </div>
                  <div style="text-align: left; margin-top: 20px">
                    <label style="color: blue">Hệ thống truyền động</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Hộp số:</label>
                    <label>{{formatGear(post)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Dẫn động:</label>
                    <label>{{post.wheelType}} - Dẫn động {{formatWheelType(post.wheelType)}}</label>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <label style="width: 150px">Tiêu thụ nhiên liệu:</label>
                    <label>{{post.fuelConsumption}} L/Km</label>
                  </div>
                  <div style="text-align: left; margin-top: 20px">
                    <label style="color: blue">Thông tin mô tả</label>
                  </div>
                  <div style="width: 400px; margin-top: 20px">
                    <label style="word-break: normal">
                      {{post.description}}
                    </label>
                  </div>
                </div>
              </div>
              <div style="flex: 1">
                <el-card>
                  <div>
                    <el-image :src="imageSelected.url"></el-image>
                  </div>
                  <div style="display: flex; margin-top: 20px; flex-wrap: wrap">
                    <div v-for="(image, index) in post.images"
                         :key="index"
                         style="margin-left: 10px; cursor: pointer"
                         @click="chooseImage(image)">
                      <el-image :src="image.url" style="height: 100px; width: 100px"></el-image>
                    </div>
                  </div>
                </el-card>
                <el-card>
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
        <div style="margin-top: 10px;" v-if="visibleReason">
          <div style="display: flex; align-items: center">
          <label style="width: 50px">Lí do: </label>
          <el-input size="mini" v-model="reason" placeholder="Nhập lí do"></el-input>
          </div>
          <div style="margin-top: 5px">
            <label style="color: red">* Lí do sẽ được gửi đến người đăng bài</label>
          </div>
          <el-button size="mini" type="danger" plain @click="sendReason">Gửi</el-button>
        </div>
      </el-card>
    <div style="text-align: center; margin-top: 20px">
      <el-button size="mini" plain type="success" @click="acceptPost" :disabled="post.accept">Duyệt</el-button>
      <el-button size="mini" plain type="primary" @click="visibleReason = !visibleReason" :disabled="post.accept">Từ chối</el-button>
    </div>
  </div>
</template>

<script>
import {api} from "@/lib/api";
import {app} from "@/lib/app";

export default {
    props:{
        postDetail: Object
    },
    components:{

    },
    data(){
        return{
            post:{},
            imageSelected: {},
            visibleReason: false,
            reason:""
        }
    },
    methods:{
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
        async acceptPost(){
            var response = await api.callAPI(
                "POST",
                "/api/post/acceptPost" +
                "?postId="
                + this.post.id
                +"&userId=" + app.user.id,null);
            if (response.data){
                this.alertSuccess("Xác nhận thành công");
            }
        },
        async sendReason(){
          let response = await api.callAPI(
              "POST",
              "/api/post/declinePost?" +
              "postId="
              + this.post.id
              +"&userId=" + app.user.id
              +"&reason=" + this.reason, null);
          if (response.data){
              this.alertSuccess("Gửi lí do thành công");
          }
        }
    },
    beforeMount(){
        this.post = this.postDetail;
        this.imageSelected = this.post.images[0];
    }
}
</script>

<style scoped>

</style>