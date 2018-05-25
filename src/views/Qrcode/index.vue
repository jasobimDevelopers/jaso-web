<template>
  <div class="qrcode-item">
    <header>构件信息详细内容</header>
    <section v-if="item">
      <ul>
        <li>
          <div class="name">构件名称</div>
          <div class="val">{{ item.name }}</div>
        </li>
        <li>
          <div class="name">类型标准</div>
          <div class="val">{{ item.familyAndType }}</div>
        </li>
        <li>
          <div class="name">标高</div>
          <div class="val">{{ item.level }}</div>
        </li>
        <li>
          <div class="name">类型名称</div>
          <div class="val">{{ item.typeName }}</div>
        </li>
        <li>
          <div class="name">所属项目</div>
          <div class="val">{{ item.projectName }}</div>
        </li>
        <li>
          <div class="name">所属楼栋号</div>
          <div class="val">{{ item.buildingNum }}</div>
        </li>
        <li>
          <div class="name">所属楼层</div>
          <div class="val">{{ item.floorNum }}</div>
        </li>
        <li>
          <div class="name">构件尺寸</div>
          <div class="val">{{ item.size }}</div>
        </li>
        <li>
          <div class="name">构件长度</div>
          <div class="val">{{ item.length }}</div>
        </li>
        <li>
          <div class="name">构件面积</div>
          <div class="val">{{ item.area }}</div>
        </li>
        <li>
          <div class="name">系统类型</div>
          <div class="val">{{ item.systemType }}</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { getItemBySelfId } from '@/api/item';

export default {
  name: 'Qrcode',
  data() {
    return {
      item: null,
    };
  },
  created() {
    this.getItemInfo();
  },
  methods: {
    getItemInfo() {
      const { query: { id } } = this.$route;

      getItemBySelfId({
        id,
      }).then((res) => {
        const { data } = res;
        this.item = data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .qrcode-item {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background: #ffffff;

    header {
      height: 120px;
      line-height: 120px;
      text-align: center;
      color: #409EFF;
      font-size: 24px;
    }

    ul {
      list-style: none;
      padding-left: 0;
      border-top: 1px solid #dddddd;

      li {
        display: flex;
        min-height: 42px;
        font-size: 20px;
        border-bottom: 1px solid #dddddd;

        .name {
          flex: 142px 0 0;
          padding-top: 8px;
          padding-left: 32px;
          background: #F5F5F5;
        }

        .val {
          padding-top: 8px;
          padding-left: 12px;
        }
      }
    }
  }
</style>
