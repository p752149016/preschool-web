<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="schoolClass"
             label-width="150px">
      <el-form-item label="学校：">
        <el-input v-model="schoolClass.schoolName" class="input-width">
        </el-input>
        <span class="note-margin">请输入学校名字</span>
      </el-form-item>
      <el-form-item label="班级：">
        <el-input v-model="schoolClass.className" class="input-width">
        </el-input>
        <span class="note-margin">请输入班级名字</span>
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
  import {getSchool,updateSchool} from '@/api/setting';
  const defaultSchoolClass = {
    userId: null,
    schoolName: null,
    className: null
  };
  export default {
    name: 'school',
    data() {
      return {
        schoolClass: Object.assign({}, defaultSchoolClass)
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
          console.log(this.schoolClass);
          updateSchool(this.schoolClass).then(()=>{
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
        getSchool().then(response=>{
          if(response.data !== null){
            this.schoolClass=response.data;
          }
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


