<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-date-picker
          v-model="listQuery.date"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          :clearable="false"
          @change="handleChangeDate"
        >
        </el-date-picker>

        <el-button type="text" style="margin-left: 32px;" v-if="!disableEdit" :disabled="disableEdit" @click="handleAdd">新建记工</el-button>
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
        <el-table-column align="center" label="姓名" prop="userName" width="100">
        </el-table-column>
        <el-table-column align="center" label="工种" prop="workName">
        </el-table-column>
        <el-table-column align="center" width="646">
          <template slot-scope="scope">
            <div class="work-days">
              <div class="work-wrapper" :style="`transform: translateX(-${selectDayIndex * 580}px)`">
                <div class="edit-cell" v-for="(item, i) in scope.row.list" :key="i">
                  <template v-if="!disableEdit">
                    <input type="number" :value="item && item.hour ? item.hour : ''" @blur="handleSaveWork(scope.row, item, i, $event)" />
                    <span class="content">{{ item && item.hour ? item.hour : '-' }}</span>
                    <span class="tip">编辑</span>
                  </template>
                  <span v-else>{{ item && item.hour ? item.hour : '-' }}</span>
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
          <div class="days-wrapper" :style="`transform: translateX(-${selectDayIndex * 580}px)`">
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
        <el-form :rules="rules" ref="dialogForm" :model="price" label-position="left">
          <el-form-item label="日期：" prop="username">
            <el-date-picker
              v-model="price.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="`标准工时：${projectHour}小时/天`" prop="userList">
            <el-button type="text" @click="dialogDateVisible = true">设置标准工时</el-button>
            <div class="user-list">
              <el-table
                :data="mechanicList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="realName"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="workName"
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

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialogDateVisible"
        @close="resetDateForm"
        width="320px"
      >
        <div slot="title" style="font-weight: bolder">
          设置标准工时
        </div>
        <el-form :rules="rules" ref="dialogDateForm" :model="dateInfo" label-position="left">
          <el-form-item label="标准工时：" prop="hours">
            <el-input-number v-model="dateInfo.hours" :min="0" :max="24"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogDateVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSaveDate">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /dialog -->
    </div>
  </div>
</template>

<script>
import { zeroFull, getMonthCount } from '@/utils/utils';
import {
  getMechanicPriceList,
  addMechanicPriceList,
  updateMechanicPrice,
  updateWorkHour,
  getMechanicList,
  getProjectHour,
} from '@/api/mechanic';

export default {
  name: 'Mechanic',
  data() {
    const { params: { id } } = this.$route;
    const now = new Date();
    const date = `${now.getFullYear()}-${zeroFull(now.getMonth() + 1)}`;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
        date,
      },
      price: {
        date: new Date(),
      },
      mechanicList: [],
      dateInfo: {
        hours: 10,
      },
      listLoading: false,
      list: null,
      selectDayIndex: 0,
      days: [],
      multipleSelection: [],
      // dialog
      dialogFormVisible: false,
      dialogDateVisible: false,
      // rules
      rules: {
        hours: [{ required: true, message: `时间${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
      // project hour
      projectHour: 10,
    };
  },
  created() {
    this.getList();
    this.getMechanicList();
  },
  methods: {
    filterList(list) {
      const filterDate = new Date(this.listQuery.date);
      const days = getMonthCount(filterDate.getFullYear(), filterDate.getMonth() + 1);

      list = list.map((user) => {
        const { mp } = user;

        // list container
        user.list = new Array(days).fill(null);
        mp.forEach((item) => {
          const { createDate } = item;
          const d = new Date(createDate);
          const index = d.getDate() - 1;
          user.list[index] = item;
        });
        return user;
      });

      this.list = list;
      this.initDays(days);
    },
    getList() {
      this.listLoading = true;
      const params = {
        ...this.listQuery,
        date: `${this.listQuery.date}-01`,
      };

      getMechanicPriceList(params).then((res) => {
        const { data } = res;
        this.filterList(data || []);
        this.listLoading = false;
      });
    },
    initDays(count) {
      const days = [];
      for (let i = 0; i < count; i += 1) {
        days.push(i + 1);
      }

      this.days = days;
    },
    getMechanicList() {
      const { params: { id } } = this.$route;
      getMechanicList({
        pageIndex: -1,
        projectId: id,
      }).then((res) => {
        const { data } = res;

        data.forEach((item) => {
          item.hours = 10;
        });

        this.mechanicList = data;
      });
    },
    handleChangeDate() {
      // refresh days index
      this.selectDayIndex = 0;
      this.getList();
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
      const { params: { id } } = this.$route;
      getProjectHour({
        projectId: id,
      }).then((res) => {
        this.projectHour = res.data;
        this.dateInfo.hours = res.data;
        this.dialogFormVisible = true;
      });
    },
    handleSaveWork(user, work, index, e) {
      const params = {
        hour: e.target.value,
        mechanicId: user.id,
      };

      if (!work) {
        params.date = `${this.listQuery.date}-${zeroFull(index + 1)}`;
      } else {
        params.id = work.id;
      }

      updateMechanicPrice(params).then(() => {
        this.getList();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSave() {
      const { params: { id } } = this.$route;
      const { date } = this.price;
      const list = this.multipleSelection;

      if (!date || date === '') {
        this.$message({
          type: 'info',
          message: '请选择日期',
        });
        return;
      }

      if (list.length === 0) {
        this.$message({
          type: 'info',
          message: '请选择工人',
        });
        return;
      }

      const userList = list.map(item => ({
        mechanicId: item.id,
        hour: item.hours,
        projectId: id,
        createDate: date,
      }));

      addMechanicPriceList({
        am: JSON.stringify(userList),
      }).then(() => {
        this.dialogFormVisible = false;
        this.getList();
      });
    },
    handleSaveDate() {
      const { params: { id } } = this.$route;

      updateWorkHour({
        projectId: id,
        workHour: this.dateInfo.hours,
      }).then(() => {
        this.projectHour = this.dateInfo.hours;
        this.dialogDateVisible = false;
      });
    },
    resetForm() {
      // TODO: reset things
    },
    resetDateForm() {
      this.dateInfo = {
        hours: 10,
      };

      this.$refs.dialogDateForm.resetFields();
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
    width: 580px;
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
  width: 580px;
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
