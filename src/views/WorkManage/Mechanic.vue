<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-date-picker
          type="month"
          placeholder="选择月">
        </el-date-picker>

        <el-button type="text" style="margin-left: 32px;" @click="handleAdd">新建记工</el-button>
      </el-breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <!-- table -->
      <el-table
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="姓名" prop="username" width="100">
        </el-table-column>
        <el-table-column align="center" label="工种" prop="p1">
        </el-table-column>
        <el-table-column align="center" width="646">
          <template slot-scope="scope">
            <div class="work-days">
              <div class="work-wrapper" :style="`transform: translateX(-${selectDayIndex * 582}px)`">
                <div class="edit-cell" v-for="item in days" :key="item">
                  <input value="-" @blur="handleSaveWork(item, $event)" />
                  <span class="content">-</span>
                  <span class="tip">编辑</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dyas-select -->
      <div class="select-day-wrapper flex-row">
        <div class="arrow" @click="handleSlideDays(--selectDayIndex)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="select-day">
          <div class="days-wrapper" :style="`transform: translateX(-${selectDayIndex * 582}px)`">
            <div class="day" v-for="item in days" :key="item">{{ item }}</div>
          </div>
        </div>
        <div class="arrow" @click="handleSlideDays(++selectDayIndex)">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- /dyas-select -->
      <!-- /table -->

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="640px"
      >
        <div slot="title" style="font-weight: bolder">
          新建记工
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="output" label-position="top">
          <el-form-item label="日期：" prop="username">
            <el-date-picker
              v-model="output.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标准工时：10小时/天" prop="userList">
            <div class="user-list">
              <el-table
                :data="output.userList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="工种"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="工时"
                >
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.hours" :min="0" :max="24"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /dialog -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mechanic',
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
      },
      output: {
        date: null,
        userList: [
          {
            username: '张三',
            type: '安装工',
            hours: '10',
          },
        ],
      },
      listLoading: false,
      list: null,
      selectDayIndex: 0,
      days: [],
      multipleSelection: [],
      // dialog
      dialogFormVisible: false,
      // rules
      rules: {},
    };
  },
  created() {
    this.getList();
    this.initDays();
  },
  methods: {
    getList() {
      this.listLoading = true;

      setTimeout(() => {
        this.list = [
          {
            username: '王莉莉',
            p1: '瓦工',
          },
          {
            username: '王晓晓',
            p1: '水电工',
          },
          {
            username: '刘能',
            p1: '安装员',
          },
        ];
        this.listLoading = false;
      }, 2e3);
    },
    initDays() {
      const days = [];
      for (let i = 1; i < 32; i += 1) {
        days.push(i);
      }

      this.days = days;
    },
    handleSlideDays(index) {
      const perLineDays = 10;
      const maxIndex = Math.ceil(this.days.length / perLineDays) - 1;
      if (index <= 0) {
        this.selectDayIndex = 0;
      } else if (index >= maxIndex) {
        this.selectDayIndex = maxIndex;
      }
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleSaveWork(work, e) {
      console.log('work', work, e.target.value);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSave() {},
    resetForm() {
      this.output = {
        date: null,
        userList: [
          {
            username: '张三',
            type: '安装工',
            hours: '10',
          },
        ],
      };

      this.$refs.dialogForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select-day-wrapper {
  position: absolute;
  top: 0;
  right: 32px;
  padding: 12px 0;
  height: 48px;
  width: 646px;

  .arrow {
    height: 24px;
    width: 32px;
    text-align: center;
    line-height: 24px;
    background: #EBEEF5;

    &:hover {
      cursor: pointer;
    }
  }

  .select-day {
    width: 582px;
    overflow: hidden;
  }

  .days-wrapper {
    width: 400%;
    user-select: none;
    transition: all 0.8s;
  }

  .day {
    display: inline-block;
    width: 58px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #909399;
  }
}

.work-days {
  margin-left: 22px;
  width: 582px;
  overflow: hidden;
  text-align: left;
}

.work-wrapper {
  width: 400%;
  user-select: none;
}

.edit-cell {
  position: relative;
  display: inline-block;
  width: 58px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #909399;

  .tip {
    color: #409EFF;
    display: none;
  }

  input {
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
    height: 24px;
    text-align: center;
    color: #606266;
    outline: none;
    padding: 0 15px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    opacity: 0;
    z-index: 10;

    &:focus {
      display: block;
      opacity: 1;

      + .tip {
        display: none;
      }
    }
  }

  &:hover {
    .content {
      display: none;
    }

    .tip {
      display: block;
    }
  }
}
</style>
