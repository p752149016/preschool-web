<template>
  <el-card class="form-container" shadow="never">
    <div class="top-line">
      <el-row class="table-layout">
        <el-col :span="8" v-for="resource in allResource" :key="resource.id" style="padding: 4px 0">
          <el-checkbox v-model="resource.checked" @change="handleCheckChange()">
            {{resource.description}}
          </el-checkbox>
        </el-col>
      </el-row>
    </div>

    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>

  </el-card>
</template>

<script>
  import {fetchAllResourceList} from '@/api/permission';
  import {allocResource,listResourceByRole} from '@/api/role';

  export default {
    name: "allocateResource",
    data() {
      return {
        roleId: null,
        allResource: null
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.getAllResourceList();
    },
    methods: {
      getAllResourceList() {
        fetchAllResourceList().then(response => {
          this.allResource = response.data;
          for (let i = 0; i < this.allResource.length; i++) {
            this.allResource[i].checked = false;
          }
          this.getResourceByRole(this.roleId);
        });
      },
      getResourceByRole(roleId){
        listResourceByRole(roleId).then(response=>{
          let allocateResource = response.data;
          this.allResource.forEach(item=>{
            item.checked = this.getResourceChecked(item.id,allocateResource);
          });
          this.$forceUpdate();
        });
      },
      getResourceChecked(resourceId,allocateResource){
        if(allocateResource==null||allocateResource.length===0) return false;
        for(let i=0; i<allocateResource.length; i++){
          if(allocateResource[i]===resourceId){
            return true;
          }
        }
        return false;
      },
      handleSave() {
        this.$confirm('是否分配资源？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let checkedResourceIds = new Set();
          if (this.allResource != null && this.allResource.length > 0) {
            this.allResource.forEach(item => {
              if (item.checked) {
                checkedResourceIds.add(item.id);
              }
            });
          }
          let params = new URLSearchParams();
          params.append("id", this.roleId);
          params.append("permissionIds", Array.from(checkedResourceIds));
          allocResource(params).then(() => {
            this.$message({
              message: '分配成功',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          })
        })
      },
      handleClear() {
        this.allResource.forEach(item => {
          item.checked = false;
        });
        this.$forceUpdate();
      },
      handleCheckChange() {
        this.$forceUpdate();
      }
    }
  }
</script>

<style scoped>
  .table-layout {
    padding: 20px;
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
  }

  .top-line {
    border-top: 1px solid #DCDFE6;
  }
</style>
