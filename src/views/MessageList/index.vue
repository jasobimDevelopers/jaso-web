<template>
  <div class="message-wrapper">
    <message-item
      v-for="item in list"
      :key="item.id"
      :message="item"
      @delete="handleDelete"
      @update="handleUpdate"
    ></message-item>

    <quill-editor
      v-model="editorContent"
      :options="editorOption"
      ref="quillEditor"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
    </quill-editor>

    <div class="flex-end" style="margin: 24px 0">
      <el-button type="primary" @click="handleSendMessage">{{$t('btn.send')}}</el-button>
    </div>

    <!-- dialog -->
    <el-dialog
      :title="$t('dialog.add')"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="640px"
    >
      <el-form :rules="rules" ref="dialogForm" :model="message" label-position="left" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('message.content')" prop="content">
          <quill-editor
            v-model="message.content"
            :options="editorOption"
            ref="quillEditor"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- /dialog -->
  </div>
</template>

<script>
import {
  getMessageListByQuestion,
  deleteMessage,
  updateMessage,
  addMessage,
} from '@/api/message';
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor, Quill } from 'vue-quill-editor';
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';
import MessageItem from './MessageItem';

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'MessageList',
  props: {
    // from: which comp to call it
    from: {
      type: String,
      default: 'question',
    },
  },
  components: {
    MessageItem,
    quillEditor,
  },
  data() {
    return {
      list: [],
      message: {
        id: null,
        content: '',
      },
      editorContent: '',
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      },
      // dialog
      dialogFormVisible: false,
      // rules
      rules: {
        content: [{ required: true, message: `${this.$t('message.content')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const { params: { id } } = this.$route;
      if (this.from === 'question') {
        getMessageListByQuestion({
          questionId: id,
        }).then((res) => {
          const { data } = res;
          this.list = data;
        });
      }
    },
    handleDelete(id) {
      this.$confirm(this.$t('message.deleteMessage'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deleteMessage({
          id
        }).then(() => {
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleUpdate(message) {
      const { id, content } = message;
      this.message = {
        id,
        content,
      };
      this.dialogFormVisible = true;
    },
    handleSave() {
      const { params: { id } } = this.$route;

      if (this.from === 'question') {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            updateMessage({
              questionId: id,
              ...this.message,
            }).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        });
      }
    },
    resetForm() {
      this.message = {
        id: null,
        content: '',
      };

      this.$refs.dialogForm.resetFields();
    },
    handleSendMessage() {
      const { params: { id } } = this.$route;

      if (this.from === 'question') {
        addMessage({
          questionId: id,
          content: this.editorContent,
        }).then(() => {
          this.editorContent = '';
          this.getList();
        });
      }
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
