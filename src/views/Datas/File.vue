<template>
  <div class="file-page">
    <breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <div class="action-wrapper flex-sb">
        <div class="flex-row">
          <el-button type="primary">上传</el-button>
          <el-button>新建文件夹</el-button>
          <el-button>下载</el-button>
          <el-button>删除</el-button>
          <el-button>重命名</el-button>
          <el-button>移动到</el-button>
        </div>

        <div class="flex-row">
          <el-input
            placeholder="请输入内容"
            v-model="listQuery.name">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="btn-item">
            <svg-icon icon-class="排序"></svg-icon>
          </div>
          <div @click="toggleShowType">
            <div class="btn-item" v-if="showType === 'list'">
              <svg-icon icon-class="缩略图"></svg-icon>
            </div>
            <div class="btn-item" v-else>
              <svg-icon icon-class="列表"></svg-icon>
            </div>
          </div>
        </div>
      </div>

       <!-- table -->
      <el-table
        ref="multipleTable"
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        style="margin-top: 18px;width: 100%"
        @selection-change="handleSelectionChange"
        v-show="showType === 'list'"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="left" label="文件名" prop="name" width="480">
          <template slot-scope="scope">
            <div class="flex-sb">
              <div class="file-info flex-row">
                <svg-icon icon-class="文件夹"></svg-icon>
                <div class="name">{{ scope.row.name }}</div>
              </div>

              <div class="file-action">
                <el-button type="text">下载</el-button>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>重命名</el-dropdown-item>
                    <el-dropdown-item>移动到</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="大小" prop="size">
        </el-table-column>
        <el-table-column align="center" label="修改日期" prop="date">
        </el-table-column>
      </el-table>
      <!-- /table -->

      <div v-show="showType !== 'list'" class="file-list">
        <header>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
        </header>
        <div class="file-card-list">
          <div
            v-for="(item, i) in list" :key="i"
            :class="['file-card flex-column-center', { selected: multipleSelectIds.indexOf(item.id) >= 0 }]"
          >
            <svg-icon icon-class="文件夹" size="40"></svg-icon>
            <div class="name">{{ item.name }}</div>
            <div class="select" @click="handleSelectFile(item)">
              <svg-icon icon-class="选中" size="18"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'File',
  data() {
    return {
      listQuery: {
        name: '',
      },
      showType: 'list2',
      listLoading: false,
      list: null,
      checkAll: false,
      isIndeterminate: false,
      // multi select
      multipleSelection: [],
      multipleSelectIds: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      setTimeout(() => {
        this.list = [
          {
            id: 1,
            name: '图纸',
            size: '166M',
            date: '2018.04.21  08:40',
          },
          {
            id: 2,
            name: '文档',
            size: '299M',
            date: '2018.03.30  15:01',
          },
        ];
        this.listLoading = false;
      }, 2e3);
    },
    handleSelectionChange(list) {
      const multipleSelectIds = [];
      this.multipleSelection = list;

      list.forEach((file) => {
        multipleSelectIds.push(file.id);
      });

      this.multipleSelectIds = multipleSelectIds;
      this.checkAll = (list.length > 0 && list.length === this.list.length);
      this.isIndeterminate = (list.length > 0 && list.length < this.list.length);
    },
    handleCheckAllChange(val) {
      this.isIndeterminate = false;

      if (val) {
        this.list.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    toggleShowType() {
      this.showType = (this.showType === 'list' ? 'card' : 'list');
    },
    handleSelectFile(item) {
      let multipleSelection = this.multipleSelection;
      const index = multipleSelection.findIndex(file => (item.id === file.id));

      if (index >= 0) {
        multipleSelection = multipleSelection.filter(file => (file.id !== item.id));
      } else {
        multipleSelection.push(item);
      }

      // clear first
      this.$refs.multipleTable.clearSelection();
      multipleSelection.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      });
    },
  },
};
</script>

<style lang="scss">
  .file-page {
    .el-input--medium .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .app-container {
    padding-top: 15px;
  }

  .action-wrapper {
    .btn-item {
      margin-left: 20px;
      color: #B4BCCC;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .file-info {
    .name {
      margin-left: 8px;
    }
  }

  .file-list {
    padding-top: 32px;

    header {
      padding-left: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid #ebeef5;
    }
  }

  .file-card-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    .file-card {
      position: relative;
      width: 122px;
      height: 129px;
      padding-top: 30px;
      margin-right: 10px;
      border-radius: 5px;
      border: 1px solid transparent;

      .select {
        display: none;
        position: absolute;
        top: 7px;
        left: 7px;
        color: rgba(64,158,255,0.30);
      }

      .name {
        margin-top: 18px;
      }

      &.selected {
        background: #EBEEF5;
        border: 1px solid #DCDFE6;

        .select {
          display: block;
          color: #409EFF;
        }
      }

      &:hover {
        cursor: pointer;
        background: #EBEEF5;
        border-color: #DCDFE6;

        .select {
          display: block;
        }
      }
    }
  }
</style>
