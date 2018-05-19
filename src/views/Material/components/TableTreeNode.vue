<template>
  <div class="table-group expand">
    <section class="table-cell flex-sb">
      <span class="name" :style="`padding-left: ${level * 24}px`">
        <i v-if="node.children && node.children.length > 0" class="el-icon-custom" @click="toggleExpand($event)"></i>
        <span>{{ node.name }}</span>
      </span>
      <span>{{ node.model }}</span>
      <span>{{ node.standard }}</span>
      <span>{{ node.unit }}</span>
      <span>{{ node.num }}</span>
      <span>{{ node.getTime }}</span>
      <span>{{ node.outPlace }}</span>
      <span>{{ node.usePlace }}</span>
      <span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="level < 2">
              <div @click="handleInsert(node.id)">插入子集栏目</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleDelete(node.id)">删除</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </section>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TableTreeNode',
  props: {
    node: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    toggleExpand(e) {
      const dom = e.target;
      const $tableGroup = dom.closest('.table-group');

      $tableGroup.classList.toggle('expand');
    },
    handleInsert(id) {
      this.$emit('insert', id);
    },
    handleDelete(id) {
      this.$emit('delete', id);
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

    .name {
      text-align: left;
    }
  }

  .table-header {
    font-weight: bolder;
  }

  .table-cell {
    color: #606266;

    .el-icon-more {
      transform: rotate(90deg);
      font-size: 24px;
    }
  }

  .table-group {
    .table-children {
      display: none;
    }

    .table-cell .name .el-icon-custom {
      &:before {
        content: "\E601",
      }
    }

    &.expand {
      &> .table-children {
        display: block;
      }

      &> .table-cell .name .el-icon-custom {
        &:before {
          content: "\E635",
        }
      }
    }
  }
</style>
