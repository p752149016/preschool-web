<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="baby"
             label-width="150px">
      <el-form-item label="宝宝名字：">
        <el-input v-model="baby.childrenName" class="input-width">
        </el-input>
        <span class="note-margin">请输入宝宝名字</span>
      </el-form-item>
      <el-form-item label="宝宝性别：">
        <el-radio-group v-model="baby.childrenGender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="宝宝生日：">
        <el-date-picker
                v-model="baby.childrenBirthday"
                type="date"
                placeholder="请选择时间">
        </el-date-picker>
        <span class="note-margin">请输入宝宝生日</span>
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
  const defaultBaby = {
    id: null,
    childrenName: null,
    childrenGender: null,
    childrenBirthday: null,
  };
  export default {
    name: 'baby',
    data() {
      return {
        baby: Object.assign({}, defaultBaby)
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
          updateSettingInfo(this.baby).then(()=>{
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
          this.baby=response.data;
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


