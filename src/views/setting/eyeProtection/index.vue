<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="eyeProtection"
             label-width="150px">
      <el-form-item label="每次使用时长：">
        <el-input v-model="eyeProtection.perUseTime" class="input-width">
        </el-input>
        <span class="note-margin">分钟</span>
      </el-form-item>
      <el-form-item label="休息间隔：">
        <el-input v-model="eyeProtection.breakInterval" class="input-width">
        </el-input>
        <span class="note-margin">分钟</span>
      </el-form-item>
      <el-form-item label="蓝光模式：">
        <el-radio-group v-model="eyeProtection.bluRayModeTyp">
          <el-radio :label="0">关</el-radio>
          <el-radio :label="1">开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm()"
          type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getSettingInfo,updateSettingInfo} from '@/api/user';
  const defaultEyeProtection = {
    id: null,
    perUseTime: null,
    breakInterval: null,
    sleepTime: null,
    sleepTimeType: null,
    bluRayMode: null,
    bluRayModeTyp: null
  };
  export default {
    name: 'eyeProtection',
    data() {
      return {
        eyeProtection: Object.assign({}, defaultEyeProtection)
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      confirm(){
        this.$confirm('是否要提交修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateSettingInfo(this.eyeProtection).then(()=>{
            this.$message({
              type: 'success',
              message: '提交成功!',
              duration:1000
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          });
        });
      },
      getDetail(){
        getSettingInfo().then(response=>{
          this.eyeProtection=response.data;
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 50%;
  }

  .note-margin {
    margin-left: 15px;
  }
</style>


