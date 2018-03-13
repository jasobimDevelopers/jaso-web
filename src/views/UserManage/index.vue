<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.username')" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.realName')" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.email')" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.tel')" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button>
    </div>

    <el-table  v-loading="listLoading"  border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.username')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.realName')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.avatar')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.role')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.email')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.tel')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.registerDate')">
        1
      </el-table-column>
      <el-table-column align="center" :label="$t('user.operation')">
        1
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        title: '',
        realName: '',
        email: '',
        tel: '',
      },
      listLoading: false,
    };
  },
  methods: {
    handleFilter() {
      console.log('do filter');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.filter-item {
  margin-right: 24px;
}
</style>
