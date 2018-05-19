<template>
  <div>
    <breadcrumb>
      <el-button type="text" @click="dialogImportVisible = true">导入预算</el-button>
    </breadcrumb>

    <div class="app-container">
      <!-- table -->
      <el-table
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        :summary-method="getSummaries"
        show-summary
        style="margin-top: 15px; width: 100%"
      >
        <el-table-column align="center" label="序号" prop="id" width="100">
        </el-table-column>
        <el-table-column align="center" label="项目编码" prop="projectCode">
        </el-table-column>
        <el-table-column align="center" label="名称" prop="projectName">
        </el-table-column>
        <el-table-column align="center" label="项目特征描述" prop="projectDescription" width="200">
        </el-table-column>
        <el-table-column align="center" label="计量单位" prop="unit">
        </el-table-column>
        <el-table-column align="center" label="工程量" prop="quantity">
        </el-table-column>
        <el-table-column label="金额（元）">
          <el-table-column align="center" label="综合单价" prop="onePrice">
          </el-table-column>
          <el-table-column align="center" label="合价" prop="priceNum">
          </el-table-column>
          <el-table-column label="其中">
            <el-table-column align="center" label="暂估价" prop="maybePrice">
          </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- /table -->

      <!-- pagination -->
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageIndex"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber">
        </el-pagination>
      </div>
      <!-- /pagination -->

      <!-- import dialog -->
      <el-dialog
        :visible.sync="dialogImportVisible"
        width="480px"
      >
        <div slot="title" style="font-weight: bolder">
          从Excel文件导入
        </div>
        <div class="import-info">
          <section>提示：从Excel文件导入必须按照标准格式，点击<a :href="downloadPath | setFileRoot" target="_blank">下载标准格式文档</a>下载。或者
            <a class="file-wrapper" @click="handleImport">
              <span>从本地导入</span>
              <input type="file" accept=".xls,.xlsx,.csv" ref="importInput" @change="handleImportFile($event)" />
            </a>。
          </section>
        </div>
      </el-dialog>
      <!-- /import dialog -->
    </div>
  </div>
</template>

<script>
import { getBudgetList, importBudget } from '@/api/budget';

export default {
  name: 'Budget',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
      },
      // page
      totalNumber: 0,
      totalPage: 1,
      listLoading: false,
      list: null,
      dialogImportVisible: false,
      // download path
      downloadPath: 'files/budget/budget_model.xlsx',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getBudgetList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value)) && column.property === 'priceNum') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            }

            return prev;
          }, 0);
          sums[index] = Number(sums[index]).toFixed(2);
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },
    handleImport() {
      this.$refs.importInput.click();
    },
    handleImportFile(e) {
      const files = e.target.files;
      const file = files[0];

      importBudget({
        projectId: this.listQuery.projectId,
        file,
      }).then(() => {
        this.getList();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .import-info {
    a {
      color: #409EFF;
      text-decoration: underline;
    }

    .file-wrapper {
      position: relative;

      span {
        position: relative;
        z-index: 10;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
      }
    }
  }
</style>
