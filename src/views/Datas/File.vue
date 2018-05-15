<template>
  <div class="file-page">
    <breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <div class="action-wrapper flex-sb">
        <div class="flex-row">
          <el-dropdown style="margin-right: 10px">
            <el-button type="primary" @click="handleUploadFile">上传</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="upload-wrapper" @click="handleUploadFile">
                  <div>文件</div>
                  <input type="file" ref="file" @change="handleFilesChange($event)" />
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="upload-wrapper" @click="handleUploadFolder">
                  <div>文件夹</div>
                  <input type="file" ref="fileFolder" directory webkitdirectory @change="handleFilesChange($event)" />
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="dialogFolderVisible = true">新建文件夹</el-button>
          <el-button :disabled="multipleSelection.length === 0" @click="handleDownloadSelects">下载</el-button>
          <el-button :disabled="multipleSelection.length === 0" @click="handleDeleteSelects">删除</el-button>
          <el-button :disabled="multipleSelection.length != 1" @click="handleRename(multipleSelection[0])">重命名</el-button>
          <el-button :disabled="multipleSelection.length != 1" @click="handleRemove(multipleSelection[0])">移动到</el-button>
        </div>

        <div class="flex-row">
          <el-input
            placeholder="请输入内容"
            @keyup.enter.native="getList"
            v-model="listQuery.name">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <!-- <div class="btn-item">
            <svg-icon icon-class="排序"></svg-icon>
          </div> -->
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

      <!-- file list -->
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
              <div class="file-info flex-row hover-cursor" @click="handleClickFile(scope.row)">
                <svg-icon :icon-class="scope.row.fileType === '0' ? '文件夹' : scope.row.name | getFileType"></svg-icon>
                <div class="name">{{ scope.row.name }}</div>
              </div>

              <div class="file-action">
                <el-button type="text" @click="handleDownload(scope.row)">下载</el-button>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <div @click="handleRename(scope.row)">重命名</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="handleRemove(scope.row)">移动到</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="handleDelete(scope.row)">删除</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="大小" prop="size">
        </el-table-column>
        <el-table-column align="center" label="修改日期" prop="uploadDate">
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
            @click="handleClickFile(item)"
          >
            <svg-icon :icon-class="item.fileType === '0' ? '文件夹' : item.name | getFileType" size="40"></svg-icon>
            <div class="name">{{ item.name }}</div>
            <div class="select" @click.stop="handleSelectFile(item)">
              <svg-icon icon-class="选中" size="18"></svg-icon>
            </div>
          </div>
        </div>
      </div>
      <!-- /file list -->

      <!-- dialog -->
      <el-dialog
        :title="$t('btn.upload')"
        :visible.sync="dialogFolderVisible"
        @close="resetFolderForm"
        width="280px"
      >
        <div slot="title" style="font-weight: bolder">
          新建文件夹
        </div>
        <el-form :rules="folderRules" ref="dialogFolderForm" :model="folder" label-position="top">
          <el-form-item label="文件夹名称" prop="name">
            <el-input v-model="folder.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFolderVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSaveFolder">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :title="$t('btn.upload')"
        :visible.sync="dialogUploadVisible"
        :close-on-click-modal="false"
        width="640px"
      >
        <div slot="title" style="font-weight: bolder">
          上传文件
        </div>
        <!-- table -->
        <el-table
          :data="fileList"
          fit
          highlight-current-row
        >
          <el-table-column align="left" label="大小" prop="name">
          </el-table-column>
          <el-table-column align="center" label="进度" prop="name" width="240">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.progress" :status="scope.row.status"></el-progress>
            </template>
          </el-table-column>
          <el-table-column align="center" label="大小" prop="size">
            <template slot-scope="scope">
              {{scope.row.loaded | bytesToSize}} / {{ scope.row.size | bytesToSize }}
            </template>
          </el-table-column>
        </el-table>
        <!-- /table -->
      </el-dialog>

      <el-dialog
        :title="$t('btn.upload')"
        :visible.sync="dialogRenameVisible"
        @close="resetRenameFolderForm"
        width="280px"
      >
        <div slot="title" style="font-weight: bolder">
          重命名
        </div>
        <el-form :rules="folderRules" ref="dialogRenameFolderForm" :model="renameFolder" label-position="top">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="renameFolder.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogRenameVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSaveName">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :title="$t('btn.upload')"
        :visible.sync="dialogFolderTreeVisible"
        @close="resetRenameFolder"
        width="480px"
      >
        <div slot="title" style="font-weight: bolder">
          移动到
        </div>
        <el-tree :data="list" :props="treeProps" @node-click="handleNodeClick">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <div :class="{ selectedNode: (removeSelectNode && removeSelectNode.id === data.id) }">
              <svg-icon icon-class="文件夹"></svg-icon>
              <span style="margin-left: 8px">{{ node.label }}</span>
            </div>
          </div>
        </el-tree>
        <div slot="footer">
          <el-button @click="dialogFolderTreeVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSaveRemove">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /dialog -->
    </div>
  </div>
</template>

<script>
import { getFolderList, addFolder, uploadFolders, deleteFloder, updateFloder } from '@/api/file';
import {
  validateImageFile,
  validateVideo,
  validateExcel,
  validateWord,
  validatePpt,
  validateCad,
  validateZip,
} from '@/utils/validate';

export default {
  name: 'File',
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        projectId: id,
      },
      folder: {
        name: '',
      },
      renameFolder: {
        name: '',
      },
      removeFolder: null,
      removeSelectNode: null,
      showType: 'list',
      listLoading: false,
      list: null,
      checkAll: false,
      isIndeterminate: false,
      // upload file list
      fileList: [],
      // parent id
      currentPid: 0,
      // multi select
      multipleSelection: [],
      multipleSelectIds: [],
      // dialog
      dialogFolderVisible: false,
      dialogUploadVisible: false,
      dialogRenameVisible: false,
      dialogFolderTreeVisible: false,
      // tree promise
      treeProps: {
        children: 'children',
        label: 'name',
      },
      // rules
      folderRules: {
        name: [{ required: true, message: `文件名称${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  filters: {
    getFileType(name) {
      const tempArr = name.split('.');
      const suffix = tempArr[tempArr.length - 1];
      let fileName = 'otherFile';

      if (validateImageFile(suffix)) {
        fileName = 'picture';
      } else if (validateVideo(suffix)) {
        fileName = 'video';
      } else if (validateExcel(suffix)) {
        fileName = 'excel';
      } else if (validateWord(suffix)) {
        fileName = 'word';
      } else if (validatePpt(suffix)) {
        fileName = 'zip';
      } else if (validateCad(suffix)) {
        fileName = 'cad';
      } else if (validateZip(suffix)) {
        fileName = 'zip';
      }

      return fileName;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getFolderList(this.listQuery).then((res) => {
        const { data } = res;
        this.list = data;
        this.listLoading = false;
      });
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

      this.$nextTick(() => {
        if (this.showType === 'list') {
          // should refresh table layout here
          this.$refs.multipleTable.doLayout();
        }
      });
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
    handleSaveFolder() {
      const { params: { id } } = this.$route;
      const { name } = this.folder;

      this.$refs.dialogFolderForm.validate((valid) => {
        if (valid) {
          addFolder({
            projectId: id,
            name,
            parrentId: this.currentPid,
          }).then(() => {
            this.getList();
            this.dialogFolderVisible = false;
          });
        }
      });
    },
    resetFolderForm() {
      this.$refs.dialogFolderForm.resetFields();
    },
    resetRenameFolderForm() {
      this.$refs.dialogRenameFolderForm.resetFields();
    },
    handleUploadFile() {
      this.$refs.file.click();
    },
    handleUploadFolder() {
      this.$refs.fileFolder.click();
    },
    handleFilesChange(e) {
      const { files } = e.target;
      const { params: { id } } = this.$route;
      let index = this.fileList.length;
      const defferList = [];
      const pid = this.currentPid;

      const newFiles = Array.from(files).map((file) => {
        const { webkitRelativePath, size, name } = file;
        let filePath = name;

        if (webkitRelativePath && webkitRelativePath !== '') {
          filePath = webkitRelativePath;
        }

        index += 1;

        const uploadFile = {
          file,
          pid,
          name,
          filePath,
          size,
          progress: 0,
          index,
          loaded: 0,
          status: '',
        };

        // here we add the promise obj for deffer list
        defferList.push(new Promise((resolve, reject) => {
          uploadFolders({
            projectId: id,
            filePath,
            pid,
            file,
          }, (progressEvent) => {
            const { lengthComputable, loaded, total } = progressEvent;

            if (lengthComputable) {
              uploadFile.loaded = loaded;
              uploadFile.progress = loaded / total;
            }
          }).then(() => {
            uploadFile.status = 'success';
            uploadFile.loaded = size;
            uploadFile.progress = 100;

            resolve();
          }).catch(() => {
            uploadFile.status = 'exception';
            reject();
          });
        }));

        return uploadFile;
      });

      // refresh list when all changed files uploaded
      Promise.all(defferList).then(() => {
        if (pid === this.currentPid) {
          this.getList();
        }
      });

      this.fileList = [
        ...this.fileList,
        ...newFiles,
      ];

      this.dialogUploadVisible = true;
    },
    handleClickFile(file) {
      const { id, fileType } = file;

      // if it's folder type
      if (fileType === '0') {
        this.currentPid = id;
        this.getList();
      } else {
        // TODO: this.handleDownload();
      }
    },
    handleDelete(file) {
      const { id, fileType } = file;

      this.$confirm('确定删除该文件?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        deleteFloder({
          id,
          fileType,
        }).then(() => {
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleDeleteSelects() {
      console.log(this.multipleSelection);
    },
    handleRename(file) {
      const { id, name } = file;

      this.renameFolder = {
        id,
        name,
      };

      this.dialogRenameVisible = true;
    },
    handleSaveName() {
      this.$refs.dialogRenameFolderForm.validate((valid) => {
        if (valid) {
          updateFloder(this.renameFolder).then(() => {
            this.getList();
            this.dialogRenameVisible = false;
          });
        }
      });
    },
    handleRemove(file) {
      this.removeFolder = file;
      this.dialogFolderTreeVisible = true;
    },
    resetRenameFolder() {
      this.removeFolder = null;
      this.removeSelectNode = null;
    },
    handleNodeClick(data) {
      this.removeSelectNode = data;
    },
    handleSaveRemove() {
      if (this.removeSelectNode === null) {
        this.$message({
          type: 'info',
          message: '请选择文件夹',
        });
        return;
      }

      console.log('remove~');
    },
    handleDownloadSelects() {},
    handleDownload() {},
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

  .upload-wrapper {
    position: relative;
    input {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      z-index: -1;
    }
  }

  .custom-tree-node {
    .selectedNode {
     color: #409EFF;
    }
  }
</style>
