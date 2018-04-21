<template>
  <div class="app-container">
    <el-form ref="form" :model="question" v-if="question" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
      <el-form-item :label="$t('question.name')" prop="name">
        <el-input v-model="question.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="$t('question.trades')" prop="trades">
        <el-input v-model="question.trades" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="$t('question.questionType')" prop="questionType">
        <el-select
          v-model="question.questionType"
          :placeholder="$t('question.questionType')"
          :disabled="true"
        >
          <el-option
            v-for="(item, i) in questionOfTypeList"
            v-if="i !== 0"
            :key="i"
            :label="item"
            :value="i - 1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('question.priority')" prop="priority">
        <el-select
          v-model="question.priority"
          :placeholder="$t('question.priority')"
          :disabled="true"
        >
          <el-option
            v-for="(item, i) in questionOfPriorityList"
            v-if="i !== 0"
            :key="i"
            :label="item"
            :value="i - 1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('question.intro')" prop="intro">
        <el-input
          v-model="question.intro"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('question.fileList')" prop="fileList">
        <img
          v-for="(item, i) in question.fileList"
          :key="i"
          :src="item | setFileRoot"
          class="file-item"
        />
      </el-form-item>
    </el-form>

    <!-- message -->
    <div class="message-wrapper">
      <header class="title">{{ $t('message.board') }}</header>
      <message-list from="question"></message-list>
    </div>
    <!-- /message -->
  </div>
</template>

<script>
import { getQuestionInfo } from '@/api/question';
import { questionOfTypeList, questionOfPriorityList, questionStateList } from '@/filters';
import MessageList from '../MessageList';

export default {
  name: 'QuestionInfo',
  components: {
    MessageList,
  },
  data() {
    return {
      question: null,
      // filters
      questionOfTypeList,
      questionOfPriorityList,
      questionStateList,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const { params: { id } } = this.$route;
      getQuestionInfo({
        questionId: id,
      }).then((res) => {
        const { data } = res;
        this.question = data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.file-item {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.title {
  padding: 8px;
  font-weight: bolder;
  border-bottom: 2px solid #ebeef5;
}
</style>
