<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :headers="headersData"
      list-type="picture"
      :limit="1"
      :multiple="false"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :on-exceed="handleExceed">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList.length>0?fileList[0].url:null" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import { getToken } from '@/utils/auth'
  import { deleteFile } from '@/api/upload'

  export default {
    name: 'fileUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
          return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
          if(this.value != null && this.value !== ''){
              return [{
                  name: this.imageName,
                  url: this.host + this.imageUrl
              }]
          }
        return []
      }
    },
    data() {
      return {
        headersData: {
          Authorization: getToken()
        },
          host: 'http://123.56.154.254:8080',
        dialogVisible: false,
        uploadUrl: 'http://123.56.154.254:8080/upload'
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        let url = file.url;
        deleteFile(url.replace(this.host,'')).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration:1000
          });
          this.emitInput('');
        });
      },
      handlePreview() {
        this.dialogVisible = true;
      },
      handleUploadSuccess(res, file) {
        console.log(res);
        this.fileList.pop();
          let url = this.host + res.data;
        this.fileList.push({name: file.name, url: url});
        console.log(this.fileList);
        this.emitInput(res.data);
      },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件,共选择了 ${files.length + fileList.length} 个文件,请点击文件右上删除后再重新选择。`);
        },
    }
  }
</script>
<style>

</style>


