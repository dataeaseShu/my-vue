<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Boot } from "@wangeditor/editor";
import { h, VNode } from "snabbdom";
import { DomEditor, IDomEditor, SlateElement } from "@wangeditor/editor";
function renderAttachment(elem, children, editor) {
  // TS 语法
  // function renderAttachment(elem, children, editor) {                                                // JS 语法

  // 获取“附件”的数据，参考上文 myResume 数据结构
  const { fileName = "", link = "" } = elem;

  // 附件元素 vnode
  const attachVnode = h(
    // HTML tag
    "span",
    // HTML 属性、样式、事件
    {
    //   props: { contentEditable: false }, // HTML 属性，驼峰式写法
      style: { display: "inline-block", marginLeft: "3px" /* 其他... */ }, // style ，驼峰式写法
      on: {
        click() {
              console.log("clicked", editor);
//               editor.alert(1)
//               const newSelection = {
//   anchor: { path: [1,0], offset:1 },
//   focus: { path: [1,0], offset:6 }
//               }
//               setTimeout(() => {
// editor.focus()
    
// }, 1000)
            //   editor.move(3)
        } /* 其他... */,
      },
    },
    // 子节点
    [fileName]
  );

  return attachVnode;
}

const renderElemConf = {
  type: "attachment", // 新元素 type ，重要！！！
  renderElem: renderAttachment,
};
function withBreakAndDelete(editor) {
  // TS 语法
  // function withBreakAndDelete(editor) {                            // JS 语法

  const { insertBreak, deleteBackward } = editor; // 获取当前 editor API
  const newEditor = editor;

  // 重写 insertBreak 换行
  newEditor.insertBreak = () => {
    // if: 是 ctrl + enter ，则执行 insertBreak
    insertBreak();

    // else: 则不执行换行
    return;
  };

  // 重写 deleteBackward 向后删除
  newEditor.deleteBackward = (unit) => {
    // if： 某种情况下，执行默认的删除
    deleteBackward(unit);

    // else: 其他情况，则不执行删除
    return;
  };

  // 重写其他 API ...

  // 返回 newEditor ，重要！
  return newEditor;
}

function withAttachment(editor) {
  // TS 语法
  // function withAttachment(editor) {                        // JS 语法
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "attachment") return true; // 针对 type: attachment ，设置为 inline
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "attachment") return true; // 针对 type: attachment ，设置为 void
    return isVoid(elem);
  };

  return newEditor; // 返回 newEditor ，重要！！！
}

// Boot.registerPlugin(withBreakAndDelete);
Boot.registerPlugin(withAttachment);
Boot.registerRenderElem(renderElemConf);

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
      const myResume = {
        // TS 语法
        // const resume = {                    // JS 语法
        type: "attachment",
        fileName: 'ddddddddd',
        children: [{ text: "" }], // void 元素必须有一个 children ，其中只有一个空字符串，重要！！！
      };
      const node = { type: 'paragraph', children: [{ text: 'simple text' }] }
      this.editor.insertNode(myResume);
    }, 3000);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
