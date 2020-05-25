<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="名字：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="名字" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="userUploadTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">{{scope.row.sort | formatSort}}</template>
        </el-table-column>
        <el-table-column label="公开" align="center">
          <template slot-scope="scope">{{scope.row.publicLevel | formatPublicLevel}}</template>
        </el-table-column>
        <el-table-column label="审核" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {list, deleteUserFile} from '@/api/upload';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
  };
  export default {
    name: 'file',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        isEdit: false,
        categoryOptions:[]
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatStatus(value) {
        if (value === 0) {
          return '审核中';
        } else if (value === 1){
          return '审核通过';
        } else {
          return '审核失败';
        }
      },
        formatPublicLevel(value) {
            if (value === 0) {
                return '私有';
            } else if (value === 1){
                return '班级公开';
            } else if (value === 2){
                return '学校公开';
            } else {
                return '完全公开';
            }
        },
        formatSort(value) {
            if (value === 1){
                return '音乐';
            } else if (value === 2){
                return '自然';
            } else if(value === 3){
                return '绘画';
            } else if(value === 4){
                return '古诗';
            } else if(value === 5){
                return '儿歌';
            } else if(value === 6){
                return '故事';
            } else{
                return '未定义';
            }
        },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.$router.push({path: '/upload/addFile'})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserFile(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/upload/updateFile', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        list(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>


