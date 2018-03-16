<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="left" label-width="100px">
          <el-form-item :label="$t('item.professionType')">
            <el-radio
              v-model="listQuery.professionType"
              v-for="(item, i) in itemProfessionTypeList"
              :key="i"
              :label="(i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('item.householdNum')">
            <el-radio
              v-model="listQuery.householdNum"
              v-for="(item, i) in householdNumList"
              :key="i"
              :label="(i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- /filter -->

    <!-- table -->
    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" :label="$t('table.id')" prop="id">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.name')" prop="name">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.bottomElevation')" prop="bottomElevation">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.size')" prop="size">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.length')" prop="length">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.serviceType')" prop="serviceType">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.familyAndType')" prop="familyAndType">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.level')" prop="level">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.offset')" prop="offset">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.area')" prop="area">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.material')" prop="material">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.typeName')" prop="typeName">
      </el-table-column>
    </el-table>
    <!-- /table -->

    <!-- pagination -->
    <div class="pagination-container">
      <div class="flex-sb">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageIndex"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber">
        </el-pagination>
        <el-button class="filter-item" type="primary" icon="el-icon-plus">{{$t('btn.add')}}</el-button>
      </div>
    </div>
    <!-- /pagination -->
  </div>
</template>

<script>
import { getItemList } from '@/api/item';
import { itemProfessionTypeList, householdNumList } from '@/filters';

export default {
  name: 'ConstructionInfo',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        professionType: -1,
        buildingNum: -1,
        floorNum: -1,
        householdNum: -1,
      },
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      itemProfessionTypeList,
      householdNumList,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getItemList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
