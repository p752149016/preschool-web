<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="userFile" :rules="rules" ref="uploadFrom" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="userFile.name"></el-input>
      </el-form-item>
      <el-form-item label="文件：" prop="link">
        <file-upload v-model="userFile.link"></file-upload>
      </el-form-item>
      <el-form-item label="封面图片：">
        <file-upload v-model="userFile.coverPicture"></file-upload>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="userFile.introduce"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
        <el-radio-group v-model="userFile.sort">
          <el-radio :label="1">音乐</el-radio>
          <el-radio :label="2">自然</el-radio>
          <el-radio :label="3">绘画</el-radio>
          <el-radio :label="4">古诗</el-radio>
          <el-radio :label="5">儿歌</el-radio>
          <el-radio :label="6">故事</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公开级别：">
        <el-radio-group v-model="userFile.publicLevel">
          <el-radio :label="0">私有</el-radio>
          <el-radio :label="1">班级</el-radio>
          <el-radio :label="2">学校</el-radio>
          <el-radio :label="3">完全公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('uploadFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('uploadFrom')">重置</el-button>
        <el-button v-if="isEdit" @click="onBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, getUserFile, update} from '@/api/upload'
  import FileUpload from '@/components/Upload/upload'
  const defaultUserFile={
    name: '',
    link: '',
    coverPicture: '',
    introduce: '',
    sort: 0,
    publicLevel: 0
  };
  export default {
    name: 'UserFileDetail',
    components:{FileUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        userFile:Object.assign({}, defaultUserFile),
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '请上传文件', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getUserFile(this.$route.query.id).then(response => {
          this.userFile = response.data;
        });
      }else{
        this.userFile = Object.assign({},defaultUserFile);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                update(this.$route.query.id, this.userFile).then(() => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                  // let formData=new FormData();
                  // formData.append('name', this.userFile.name);
                  // formData.append('link', this.userFile.link);
                  // formData.append('coverPicture', this.userFile.coverPicture);
                  // formData.append('introduce', this.userFile.introduce);
                  // formData.append('sort', this.userFile.sort);
                  // formData.append('publicLevel', this.userFile.publicLevel);
                create(this.userFile).then(() => {
                  this.$refs[formName].resetFields();
                  this.userFile = Object.assign({},defaultUserFile);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.userFile = Object.assign({},defaultUserFile);
      },
        onBack(){
          this.$router.go(-1);
        }
    }
  }
</script>
<style>
</style>


