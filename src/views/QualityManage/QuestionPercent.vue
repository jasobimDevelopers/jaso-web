<template>
  <div class="question-percent flex-row">
    <div
      v-for="(item, i) in percentList"
      :key="i"
      class="percent-item flex-column-center"
    >
      <div class="title">{{ item.name }}</div>
      <vm-progress
        type="circle"
        :percentage="item.value"
        :width="80"
        :status="item.status"
      >
        {{ `${item.value}%` }}
      </vm-progress>
    </div>
  </div>
</template>

<script>
import { getQuestionPercentInfo } from '@/filters';

export default {
  name: 'QuestionPercent',
  props: {
    percents: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    percentList() {
      const percentList = [];
      Object.keys(this.percents).forEach((key) => {
        const info = getQuestionPercentInfo(key);
        percentList.push({
          name: info.name,
          value: this.percents[key],
          status: info.status,
        });
      });

      return percentList;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.question-percent {
  color: #606266;

  .percent-item {
    margin-right: 24px;
    margin-bottom: 15px;

    .title {
      margin-bottom: 8px;
    }
  }
}
</style>
