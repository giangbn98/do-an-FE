<template>
  <div style="width: 18%; margin-top: 8px">
    <div style="border: 1px solid yellowgreen; border-radius: 6px">
      <h3>Hãng xe</h3>
    </div>
    <div style="border: 1px solid yellowgreen; border-radius: 6px; margin-top: 10px">
      <div style="text-align: left; margin: 10px 0 0 15px; cursor: pointer"
           @click="handleClick('ALL')"
           @mouseout="handleMouseOut"
           @mouseover="handleMouse('ALL')">
        <label style="font-weight: bold; cursor: pointer" :class="{'selected-brand': mouseHoverBrand === 'ALL'}">TẤT CẨ</label>
      </div>
    <div v-for="brand in app.brands"
         :key="brand.id"
          style="text-align: left; margin: 10px 0 0 15px; cursor: pointer"
         @mouseover="handleMouse(brand.name)"
         @mouseout="handleMouseOut"
          @click="handleClick(brand.name)">
      <label style="font-weight: bold; cursor: pointer" :class="{'selected-brand': mouseHoverBrand === brand.name}">{{brand.name}}</label>
    </div>
    </div>
    </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
        data(){
            return{
                brands: [],
                mouseHoverBrand:'',
                selectedBrand:{},
            }
        },
        methods:{
            handleMouse(brand){
              this.mouseHoverBrand = brand;

          },
            handleMouseOut(){
                this.mouseHoverBrand = '';
            },
            handleClick(brand){
                if (brand == 'ALL') brand = '';
                this.selectedBrand = brand;
                eventBus.$emit('selectedBrand', this.selectedBrand);
            }
        },
        beforeMount(){

        }
    }
</script>

<style scoped>
.selected-brand{
  color: red;
}
</style>