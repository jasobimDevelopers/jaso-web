<template>
  <div class="table-cell edit-wrapper flex-sb">
    <span><el-input v-model="data.name" placeholder="请输入材料名称" style="width: 150px"></el-input></span>
    <span><el-input v-model="data.model" placeholder="型号规格" style="width: 78px"></el-input></span>
    <span><el-input v-model="data.standard" placeholder="质量标准" style="width: 78px"></el-input></span>
    <span><el-input v-model="data.unit" placeholder="单位" style="width: 58px"></el-input></span>
    <span><el-input type="number" v-model="data.num" placeholder="数量" style="width: 58px"></el-input></span>
    <span>
      <el-date-picker
        v-model="data.getTime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="日期"
        style="width: 78px"
      >
      </el-date-picker>
    </span>
    <span><el-input v-model="data.outPlace" placeholder="卸货地点" style="width: 78px"></el-input></span>
    <span><el-input v-model="data.usePlace" placeholder="用料地点" style="width: 78px"></el-input></span>
    <span style="font-size: 18px">
      <i class="el-icon-check hover-cursor" @click="handleSaveEdit"></i>
      <i class="el-icon-close hover-cursor" @click="handleRemoveEdit"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TableEdit',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleSaveEdit() {
      this.$emit('save');
    },
    handleRemoveEdit() {
      this.$emit('clear');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .table-cell {
    height: 48px;
    color: #909399;
    text-align: center;
    border-bottom: 1px solid #ebeef5;

    span {
      width: 80px;

      i {
        margin-right: 8px;
        color: #409EFF;

        &:hover {
          cursor: pointer;
        }
      }
    }

    span:nth-child(1) {
      width: 270px;
    }

    span:last-child {
      width: 88px;
    }
  }
</style>
