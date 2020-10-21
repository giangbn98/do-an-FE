<template>
  <div>
    <header-bar-sale></header-bar-sale>
    <div style="width: 70%; margin: auto; margin-top: 10px">
      <el-card>
        <div style="display: flex; align-items: center">
          <div style="width: 180px; text-align: left">
            <label>Hãng xe:</label>
          </div>
          <div>
            <el-select placeholder="Hãng xe" v-model="brand" clearable filterable size="small">
              <el-option value="ALL" label="TẤT CẢ"></el-option>
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
        <div style="display: flex;align-items: center; margin-top: 15px ">
          <div style="width: 180px; text-align: left">
            <label>Tên xe:</label>
          </div>
          <div>
            <el-input size="mini" placeholder="Tên xe" v-model="name"></el-input>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Tình trạng xe:</label>
          </div>
          <div>
            <el-radio-group v-model="carType">
            <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="NEW" size="mini" border>Xe mới</el-radio>
            <el-radio label="OLD" size="mini" border>Xe cũ</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Năm:</label>
          </div>
          <div style="display: flex">
            <div>
              <el-date-picker type="year" placeholder="Từ năm" size="mini" v-model="fromDate"></el-date-picker>
            </div>
            <div>
              <el-date-picker type="year" placeholder="Đến năm" size="mini" v-model="toDate"></el-date-picker>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Hộp số</label>
          </div>
          <div>
            <el-radio-group v-model="gearType">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="MT" size="mini" border>Số tay</el-radio>
            <el-radio label="AT" size="mini" border>Số tự động</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 190px; text-align: left">
            <label>Giới hạn giá</label>
          </div>
          <div style="display: flex; align-items: center">
            <el-switch v-model="enableLimit" @change="handleCheckBox" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <div :hidden="!enableLimit" style="margin-left: 20px">
              <label>Giá từ:</label>
              <el-input-number size="mini" style="margin-left: 5px" v-model="minPrice" :step="10" :min="10"></el-input-number> triệu đồng
              <label style="margin-left: 25px">Giá đến:</label>
              <el-input-number size="mini" style="margin-left: 5px" v-model="maxPrice" :step="10" :min="10"></el-input-number> triệu đồng
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Nhiên liệu:</label>
          </div>
          <div>
            <el-radio-group v-model="fuelType">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="GASOLINE" size="mini" border>Xăng</el-radio>
            <el-radio label="DIESEL" size="mini" border>Diesel</el-radio>
            <el-radio label="HYBRID" size="mini" border>Hybrid</el-radio>
            <el-radio label="ELECTRIC" size="mini" border>Điện</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Xuất xứ:</label>
          </div>
          <div>
            <el-radio-group v-model="origin">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="IMPORT" size="mini" border>Xe nhập khẩu</el-radio>
            <el-radio label="ASSEMBLY" size="mini" border>Xe lắp trong nước</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Màu xe:</label>
          </div>
          <div style="display: flex">
            <el-radio-group v-model="color">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="bạc" size="mini" border>Bạc</el-radio>
            <el-radio label="cát" size="mini" border>Cát</el-radio>
            <el-radio label="đỏ" size="mini" border>Đỏ</el-radio>
            <el-radio label="đồng" size="mini" border>Đồng</el-radio>
            <el-radio label="đen" size="mini" border>Đen</el-radio>
            <el-radio label="ghi" size="mini" border>Ghi</el-radio>
            </el-radio-group>
            <div>
            <el-popover
              placement="bottom"
              trigger="click"
              title="Màu khác"
              style="margin-left: 15px"
              v-model="visibleColor">
              <el-radio-group v-model="color">
                <el-radio label="nâu" size="mini" border>Nâu</el-radio>
                <el-radio label="trắng" size="mini" border>Trắng</el-radio>
                <el-radio label="vàng" size="mini" border>Vàng</el-radio>
                <el-radio label="cam" size="mini" border>Cam</el-radio>
                <el-radio label="xanh" size="mini" border>Xanh</el-radio>
                <el-radio label="xám" size="mini" border>Xám</el-radio>
              </el-radio-group>
            </el-popover>
            <el-button size="mini" type="text" icon="el-icon-caret-bottom" @click="visibleColor = true">Màu khác</el-button>
          </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Kiểu dáng:</label>
          </div>
          <div>
            <el-radio-group v-model="vehicleType">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="SEDAN" size="mini" border>Sedan</el-radio>
            <el-radio label="COUPE" size="mini" border>Coupe</el-radio>
            <el-radio label="SUV" size="mini" border>SUV/Crossover</el-radio>
            <el-radio label="HATCHBACK" size="mini" border>Hatchback</el-radio>
            <el-radio label="CONVERTIBLE" size="mini" border>Convertible</el-radio>
            <el-radio label="TRUCK" size="mini" border>Pickup/Truck</el-radio>
            <el-radio label="WAGON" size="mini" border>Wagon</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Số chỗ ngồi:</label>
          </div>
          <div>
            <el-radio-group v-model="numberSeat">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="1TO3" size="mini" border>1 - 3 chỗ</el-radio>
            <el-radio label="4TO6" size="mini" border>4 - 6 chỗ</el-radio>
            <el-radio label="7TO9" size="mini" border>7 - 9 chỗ</el-radio>
            <el-radio label="9TO16" size="mini" border>9 - 16 chỗ</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px">
          <div style="width: 180px; text-align: left">
            <label>Dẫn động:</label>
          </div>
          <div>
            <el-radio-group v-model="wheelType">
              <el-radio label="ALL" size="mini" border>Tất cả</el-radio>
            <el-radio label="FWD" size="mini" border>FWD - Dẫn động cầu trước</el-radio>
            <el-radio label="RWD" size="mini" border>RWD - Dẫn động cầu sau</el-radio>
            <el-radio label="AWD" size="mini" border>4WD - Dẫn động 4 bánh</el-radio>
            <el-radio label="4WD" size="mini" border>AWD - Dẫn động 4 bánh toàn thời gian</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-card>
    </div>
    <div style="width: 70%; margin: auto">
      <el-card>
        <div v-if="loading"
             v-loading="loading"
             element-loading-text="Loading..."></div>
        <div style="border: 1px solid yellowgreen; border-radius: 6px; width: 100%">
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
                <label>Liên hệ:{{upperCaseFirstLetter(post.contact.fullName)}}</label>
              </div>
              <div style="margin-top: 10px">
                <label>Địa chỉ:{{post.contact.address}}</label>
              </div>
              <div style="margin-top: 10px">
                <label>Điện thoại:{{post.contact.phoneNumber}}</label>
                <label style="margin-left: 15px"> - {{post.contact.anotherPhoneNumber}}</label>
              </div>
            </div>
            <div>
              <label>{{post.contact.province}}</label>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div style="margin-top: 20px">
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
    import HeaderBarSale from "@/views/components/HeaderBarSale";
    import {api} from "@/lib/api";


    export default {
        components: {HeaderBarSale},

        watch:{
            brand(){
                this.fetchAllPost();
            },
            name(){
                if (this.name == '') return;
                this.fetchAllPost();
            },
            carType(){
                if (this.carType == '') return;
                this.fetchAllPost();
            },
            fromDate(){
                if (this.fromDate == null) return;
                this.fetchAllPost();
            },
            toDate(){
                if (this.toDate == null) return;
                this.fetchAllPost();
            },
            minPrice(){
                if (this.minPrice == 10) return;
                this.fetchAllPost();
            },
            maxPrice(){
                if (this.maxPrice == 2000) return;
                this.fetchAllPost();
            },
            fuelType(){
                if (this.fuelType == '') return;
                this.fetchAllPost();
            },
            origin(){
                if (this.origin == '') return;
                this.fetchAllPost();
            },
            color(){
                if (this.color == '') return;
                this.fetchAllPost();
            },
            vehicleType(){
                if (this.vehicleType == '') return;
                this.fetchAllPost();
            },
            numberSeat(){
                if (this.numberSeat == '') return;
                this.fetchAllPost();
            },
            wheelType(){
                if (this.wheelType == '') return;
                this.fetchAllPost();
            },
            gearType(){
                if (this.gearType == '') return;
                this.fetchAllPost();
            }
        },
        data(){
            return{
                brand:'',
                name:'',
                carType:'',
                fromDate: null,
                toDate: null,
                limits: [0,0],
                fuelType: '',
                origin:'',
                color:'',
                vehicleType:'',
                numberSeat:'',
                wheelType:'',
                gearType:'',
                posts:[],
                visibleColor:false,
                enableLimit: false,
                visiblePage: false,
                totalPage:0,
                page:1,
                minPrice: 0,
                maxPrice: 2000,
                loading:false

            }
        },
        methods:{
            async fetchAllPost(){
                this.loading = true;
                var request = {
                    brand: this.brand,
                    name: this.name,
                    carType: this.carType,
                    fromDate: this.fromDate,
                    toDate: this.toDate,
                    fuelType: this.fuelType,
                    origin: this.origin,
                    color: this.color,
                    vehicleType: this.vehicleType,
                    numberSeat: this.numberSeat,
                    wheelType: this.wheelType,
                    gearType: this.gearType,
                };
                if (this.enableLimit){
                    if (this.maxPrice > this.minPrice) {
                        request.minPrice = this.minPrice;
                        request.maxPrice = this.maxPrice;
                    }else {
                        this.alertError("Bạn đã chọn sai khoảng giá");
                    }
                }

                var response = await api.callAPI(
                    "POST",
                    "/api/post/filter?page=" + 1 + "&pageSize=" + 10,
                    request);
                if (response.data){
                    this.posts = response.data.content;
                    this.totalPage = response.data.totalPages;
                    this.visiblePage = this.totalPage == 1 || this.totalPage == 0;
                    this.loading = false;
                }
            },
            openCarDetail(postId){
                this.$router.push("/detail/"+postId);
            },
            handleCheckBox(){
                if (!this.enableLimit) this.limits = [0,0];
            },
            async pageChange(page){
                var request = {
                    brand: this.brand,
                    name: this.name,
                    carType: this.carType,
                    fromDate: this.fromDate,
                    toDate: this.toDate,
                    limits: this.limits,
                    fuelType: this.fuelType,
                    origin: this.origin,
                    color: this.color,
                    vehicleType: this.vehicleType,
                    numberSeat: this.numberSeat,
                    wheelType: this.wheelType,
                    gearType: this.gearType,
                };
                var response = await api.callAPI(
                    "POST",
                    "/api/post/filter?page=" + page + "&pageSize=" + 10,
                    request);
                if (response.data){
                    this.posts = response.data.content;
                }
            },
        },
        beforeMount(){
          this.fetchAllPost();
        }
    }
</script>

<style scoped>
  .loading-spinner {
    top: 10%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
  }
</style>