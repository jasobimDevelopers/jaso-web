<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane :label="$t('project.basicInfo')" name="first">
        <basic-info></basic-info>
      </el-tab-pane>
      <el-tab-pane :label="$t('project.constructionInfo')" name="second">
        <construction-info></construction-info>
      </el-tab-pane>
      <el-tab-pane :label="$t('project.drawInfo')" name="third">
        <draw-info></draw-info>
      </el-tab-pane>
      <el-tab-pane :label="$t('project.quantitiesInfo')" name="fourth">
        <quantities-info></quantities-info>
      </el-tab-pane>
      <el-tab-pane :label="$t('project.teachInfo')" name="sixth">
        <teach-info></teach-info>
      </el-tab-pane>
      <el-tab-pane :label="$t('project.questionList')" name="Seventh">
        <question-list></question-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicInfo from './components/BasicInfo';
import ConstructionInfo from './components/ConstructionInfo';
import DrawInfo from './components/DrawInfo';
import QuantitiesInfo from './components/QuantitiesInfo';
import TeachInfo from './components/TeachInfo';
import QuestionList from './components/QuestionList';

export default {
  name: 'Project',
  components: {
    BasicInfo,
    ConstructionInfo,
    DrawInfo,
    QuantitiesInfo,
    TeachInfo,
    QuestionList,
  },
  data() {
    return {
      activeName: 'first',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
