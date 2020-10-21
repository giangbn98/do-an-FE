<template>
  <div>
    <el-dialog :visible.sync="visibleImage" title="Đính kèm hình ảnh" style="margin-top: -64px" append-to-body>
        <image-list
                :visibleImage="visibleImage" :key="visibleImage"
                :images="images"
                @selectedImages="selectedImages"
        ></image-list>
    </el-dialog>
    <h3 style="font-size: 20px">Đăng Tin Bán Xe</h3>
    <div style="display: flex; flex: 1">
    <div style="width: 50%">
      <el-card>
        <div style="text-align: left; margin-top: -15px">
          <h3 style="font-size: 15px">Thông Số Cơ Bản</h3>
        </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 10px">
        <div style="width: 100px ;text-align: left">
          <label>Hãng chế tạo:</label>
        </div>
        <div>
          <el-select v-model="post.brand" placeholder="Hãng xe" clearable filterable>
            <el-option
                    v-for="(brand, index) in app.brands"
                    :key="index"
                    :label="brand.name"
                    :value="brand.name"
                    >
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Tên xe:</label>
        </div>
        <div>
          <el-input v-model="post.name" size="medium"></el-input>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Phiên bản:</label>
        </div>
        <div>
          <el-input size="medium" v-model="post.version"></el-input>
        </div>
      </div>
        <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
          <div style="width: 100px; text-align: left">
            <label>Dung tích:</label>
          </div>
          <div>
            <el-input size="medium" v-model="post.capacity"></el-input>
          </div>
        </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Năm sản xuất:</label>
        </div>
        <div>
          <el-date-picker
            type="year"
            v-model="post.yearOfManufacture"
            placeholder="Chọn năm"
            format="yyyy">
          </el-date-picker>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Xuất xứ:</label>
        </div>
        <div>
          <el-select placeholder="Xuất xứ" v-model="post.originType">
            <el-option value="ASSEMBLY" label="Lắp ráp trong nước"></el-option>
            <el-option value="IMPORT" label="Nhập khẩu"></el-option>
          </el-select>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Tình trạng:</label>
        </div>
        <div>
          <el-select placeholder="Tình trạng" v-model="post.carType">
            <el-option value="NEW" label="Xe mới"></el-option>
            <el-option value="OLD" label="Xe cũ"></el-option>
          </el-select>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Số km đã đi:</label>
        </div>
        <div>
          <el-input :disabled="post.carType == 'NEW'" size="medium" v-model="post.numberOfKmMoved"></el-input>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Kiểu xe:</label>
        </div>
        <div>
          <el-select placeholder="Kiểu xe" v-model="post.vehicleType">
            <el-option value="SUV" label="SUV"></el-option>
            <el-option value="SEDAN" label="Sedan"></el-option>
            <el-option value="COUPE" label="Coupe"></el-option>
            <el-option value="CROSSOVER" label="Crossover"></el-option>
            <el-option value="HATCHBACK" label="Hatchback"></el-option>
            <el-option value="CONVERTIBLE" label="Convertible"></el-option>
            <el-option value="TRUCK" label="Truck"></el-option>
            <el-option value="VAN" label="Van/MiniVan"></el-option>
            <el-option value="WAGON" label="Wagon"></el-option>
          </el-select>
        </div>
      </div>
        <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
          <div style="width: 100px; text-align: left">
            <label>Giá:</label>
          </div>
          <div style="display: flex; align-items: center">
            <el-input size="medium" v-model="post.price"></el-input>
            <label style="width: 90px; margin-left: 5px">triệu đồng</label>
          </div>
        </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Ngoại thất:</label>
        </div>
        <div>
          <el-input size="medium" v-model="post.colorInside" placeholder="Màu ngoại thất"></el-input>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Nội thất:</label>
        </div>
        <div>
          <el-input size="medium" v-model="post.colorOutside" placeholder="Màu nội thất"></el-input>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Số cửa:</label>
        </div>
        <div>
          <el-input-number size="medium" :min="2" v-model="post.numberDoor"></el-input-number>
        </div>
      </div>
      <div style="display: flex; flex: 1; align-items: center; margin-top: 15px">
        <div style="width: 100px; text-align: left">
          <label>Số chỗ ngồi:</label>
        </div>
        <div>
          <el-input-number size="medium" :min="2" v-model="post.numberSeat"></el-input-number>
        </div>
      </div>
      </el-card>
    </div>
    <div style="flex: 1">
      <el-card>
        <div style="text-align: left; margin-top: -15px">
          <h3 style="font-size: 15px">Hộp số truyền động</h3>
        </div>
        <div style="display: flex; flex: 1; align-items: center; margin-top: 10px">
          <div style="width: 160px ;text-align: left">
            <label>Hộp số:</label>
          </div>
          <div>
            <el-select placeholder="Hộp số" v-model="post.gearType">
              <el-option value="MT" label="Số tay"></el-option>
              <el-option value="AT" label="Số tự động"></el-option>
            </el-select>
          </div>
        </div>
        <div style="display: flex; flex: 1; align-items: center; margin-top: 10px">
          <div style="width: 160px ;text-align: left">
            <label>Dẫn động:</label>
          </div>
          <div>
            <el-select placeholder="Hộp số" v-model="post.wheelType">
              <el-option value="FWD" label="FWD - Dẫn động cầu trước"></el-option>
              <el-option value="RWD" label="RWD - Dẫn động cầu sau"></el-option>
              <el-option value="4WD" label="4WD - Dẫn động 4 bánh"></el-option>
              <el-option value="AWD" label="AWD - Dẫn động 4 bánh toàn thời gian"></el-option>
            </el-select>
          </div>
        </div>
      </el-card>
      <el-card>
        <div style="text-align: left; margin-top: -15px">
          <h3 style="font-size: 15px">Nhiên liệu</h3>
        </div>
        <div style="display: flex; flex: 1; align-items: center; margin-top: 10px">
          <div style="width: 160px ;text-align: left">
            <label>Nhiên liệu:</label>
          </div>
          <div>
            <el-select placeholder="Nhiên liệu" v-model="post.fuelType">
              <el-option value="GASOLINE" label="Xăng"></el-option>
              <el-option value="DIESEL" label="Diesel"></el-option>
              <el-option value="HYBRID" label="Hibrid"></el-option>
              <el-option value="ELECTRIC" label="Điện"></el-option>
            </el-select>
          </div>
        </div>
        <div style="display: flex; flex: 1; align-items: center; margin-top: 10px">
          <div style="width: 160px ;text-align: left">
            <label>Mức tiêu thụ nhiên liệu:</label>
          </div>
          <div>
            <el-input-number v-model="post.fuelConsumption"></el-input-number> L/100Km
          </div>
        </div>
      </el-card>
      <el-card>
        <div style="text-align: left; margin-top: -15px">
          <h3 style="font-size: 15px">Thêm mô tả</h3>
        </div>
        <div>
          <el-input type="textarea" :rows="5" v-model="post.description" style="word-break: normal"></el-input>
        </div>
      </el-card>
    </div>
    </div>
    <div>
      <el-card>
        <div style="text-align: left; margin-top: -15px">
          <h3 style="font-size: 15px">Thông tin liên hệ</h3>
        </div>
        <div>
          <div style="display: flex">
            <div style="display: flex; align-items: center">
            <label style="width: 60px; text-align: left" >Tên:</label>
            <el-input v-model="post.contact.fullName" size="mini"></el-input>
            </div>
            <div style="display: flex; align-items: center; margin-left: 10px">
              <label style="width: 110px" >Điện thoại:</label>
              <el-input v-model="post.contact.phoneNumber" size="mini"></el-input>
            </div>
            <div style="display: flex; align-items: center; margin-left: 10px">
              <label style="width: 150px">Điện thoại khác:</label>
              <el-input v-model="post.contact.anotherPhoneNumber" size="mini"></el-input>
            </div>
          </div>
          <div style="display: flex; align-items: center;margin-top: 10px">
            <div style="display: flex; align-items: center">
            <label style="width: 60px; text-align: left" >Địa chỉ:</label>
            <el-input v-model="post.contact.address" size="mini" style="width: 400px"></el-input>
            </div>
            <div style="margin-left: 20px">
              <label style="width: 60px;; align-items: center" >Tỉnh:</label>
              <el-select v-model="post.contact.province" size="mini" placeholder="Chọn tỉnh/thành phố" clearable filterable>
                <el-option
                v-for="(province, index) in provinces"
                :key="index"
                :label="province"
                :value="province">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div style="float: left">
          <el-button type="text">Thay đổi thông tin liên hệ</el-button>
        </div>
      </el-card>
      <el-card>
        <div style="text-align: left; margin-top: -15px">
          <h3 style="font-size: 15px">Đăng ảnh cho xe</h3>
<!--          <img src="http://localhost:9090/images/gtr.jpg">-->
          <div v-if="images.length > 0" style="display: flex">
          <div v-for="(image, index) in images"
            :key="index">
            <div style="display: flex">
            <el-image style="width: 150px; height: 150px; margin: 8px;border: orangered"
                      :src="image.url"
                      fit="cover"></el-image>
            <span
                    class="close-button-small"
                    style="cursor: pointer"
                    @click="removeImage(image)"
            >X</span>
            </div>
          </div>
          </div>
        </div>
<!--        <div>-->
<!--          <el-button style="margin-top: 16px; margin-bottom: 32px;margin-left: 8px" size="small" type="primary" @click="submitUpload">-->
<!--            Upload to server-->
<!--          </el-button>-->
<!--          <el-upload ref="upload" class="upload-demo" drag-->
<!--                     :action="'http://localhost:9090/api/image/upload'"-->
<!--                     :auto-upload="false" :on-success="uploaded"-->
<!--                     :on-error="error"-->
<!--                     :file-list="fileList"-->
<!--                     multiple-->
<!--                     list-type="picture">-->
<!--            <i class="el-icon-upload"></i>-->
<!--            <div class="el-upload__text">-->
<!--              Drop file here or-->
<!--              <em>click to upload</em>-->
<!--            </div>-->
<!--          </el-upload>-->
<!--        </div>-->
        <el-button @click="openListImage">Thêm hình ảnh</el-button>
      </el-card>
    </div>
    <div style="margin-top: 15px">
      <el-button type="success" @click="UpPost">Đăng tin</el-button>
    </div>
  </div>
</template>

<script>
    import {api} from "@/lib/api";
    import CheckEmpty from "@/lib/CheckEmpty"
    import ImageList from "@/views/components/ImageList";
    import {app} from "@/lib/app";
    import stores from "@/lib/stores";

    export default {
        // props: {
        //     selectedPost: Object
        // },
        components:{
          ImageList
        },
        data(){
            return{
                searchName:"",
                post:{
                  brand:'',
                  name: "",
                  originType: '',
                  carType:'',
                  numberOfKmMoved: 0,
                  yearOfManufacture:null,
                  wheelType:'',
                    version:'',
                    vehicleType:'',
                    price:0,
                    numberSeat:0,
                    numberDoor:0,
                    gearType:'',
                    fuelType:'',
                    fuelConsumption:0,
                    description:'',
                    colorOutside:'',
                    colorInside:'',
                    capacity:0,
                    contact:{
                        fullName:'',
                        phoneNumber: '',
                        anotherPhoneNumber:'',
                        address:'',
                        province:''
                    }
                },
                fileList:[],
                visibleImage: false,
                images:[],
                provinces:[]
            }
        },
        methods:{
            async UpPost(){
                if (CheckEmpty.checkInput(this.post.name))
                    return this.alertError("Bạn chưa nhập tên xe");
                if (CheckEmpty.checkInput(this.post.version))
                    return this.alertError("Bạn chưa nhập phiên bản");
                if (CheckEmpty.checkInput(this.post.price))
                    return this.alertError("Bạn chưa nhập giá");
                if (CheckEmpty.checkInput(this.post.colorInside))
                    return this.alertError("Bạn chưa nhập màu nội thất");
                if (CheckEmpty.checkInput(this.post.colorOutside))
                    return this.alertError("Bạn chưa màu ngoại thất");
                if (CheckEmpty.checkInput(this.post.description))
                    return this.alertError("Bạn chưa nhập mô tả cho xe");
                if (CheckEmpty.checkInput(this.post.contact.fullName))
                    return this.alertError("Bạn chưa nhập thông tin liên hệ");
                if (!this.validPhoneNumber(this.post.contact.phoneNumber))
                    return this.alertError("Sai định dạng số điện thoại");
                if (!this.validPhoneNumber(this.post.contact.anotherPhoneNumber))
                    return this.alertError("Sai định dạng số điện thoại khác");
                if (CheckEmpty.checkInput(this.post.contact.address))
                    return this.alertError("Bạn chưa nhập địa chỉ")
                if (CheckEmpty.checkInput(this.post.contact.province))
                    return this.alertError("Bạn chưa chọn thành phố")
                if (this.images.length == 0)
                    return this.alertError("Bạn chưa chọn hình ảnh");
                this.post.images = this.images;
                this.post.userId = app.user.id;
                var response = await api.callAPI("POST","/api/post/create",this.post);
                if (response.data){
                    this.alertSuccess("Lưu thành công. Bài viết đã được gửi tới Admin để xét duyệt")
                }
            },
            handlePreview(){

            },
            openListImage(){
              this.visibleImage = true;
            },
            selectedImages(payload){
                this.images = payload;
                this.visibleImage = false;
            },
            removeImage(image){
                this.images.splice(this.images.indexOf(image),1);
            },
            validPhoneNumber(phoneNumber){
                return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumber);
            },
        },
        beforeMount(){
            this.provinces = stores.provinces;
        }
    }
</script>

<style scoped>
</style>