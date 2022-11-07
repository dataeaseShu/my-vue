<template>
  <div>
    <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>
    <button @click="insert">add</button>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
const a = '123'
const b = '123'
const c = '123'
export default {
  components: { Editor },
  data() {
    return {
      tinymceHtml: "",
      editorInit: {
        language_url: "/tinymce/langs/zh_CN.js", // 汉化路径是自定义的，一般放在public或static里面
        skin_url: "/tinymce/skins/ui/oxide", // 皮肤
        language: "zh_CN",
        height: 300, // 编辑器高度
        branding: false, // 是否禁用“Powered by TinyMCE”
        menubar: true, // 顶部菜单栏显示
        setup: (editor) => {
          editor.on("click", (e) => {
            console.log(123);
            // e.stopPropagation();
            // e.preventDefault();
            var ed = tinymce.get("tinymce");
            // const edInner = tinymce.get('tinymce');
            console.log('ed.dom.select("#st")[0]', ed.dom.select("#st")[0]);
            ed.selection.select(ed.dom.select("#st")[0]);
            // const node = tinymce.activeEditor.selection.getNode();
            // const pNode = node.parentElement;
            // if (pNode && pNode.id && pNode.id.indexOf("st") > -1) {
            //   const innerId = "#" + pNode.id;
            //   edInner.selection.select(edInner.dom.select(innerId)[0]);
            // //   edInner.selection.selectorChanged(
            // //     "changeText-21c54a90-2296-11ed-a018-433507c14f00",
            // //     (r) => {
            // //       console.log(90, r);
            // //     }
            // //   );
            //   console.log(
            //     "edInner.dom.select(innerId)",
            //     edInner.dom.select(innerId)[0]
            //   );
            //   // setTimeout(() => {
            //   //   var range = document.createRange();
            //   //   var startNode = edInner.dom.select(innerId)[0];
            //   //   var startOffset = 0;
            //   //   range.setStart(startNode.childNodes[0], 0);
            //   //   range.setEnd(startNode.childNodes[0], 1);
            //   //   window.getSelection().addRange(range);
            //   // }, 3000);
            // }
          });
        },
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    insert() {
      var ed = tinymce.get("tinymce");
      var range = ed.selection.getRng();
      // 创建要插入的内容
      var divNode = ed.getDoc().createElement("span");
    //   divNode.onclick = () => {
    //     ed.selection.select(ed.dom.select("#st")[0]);
    //   };

      divNode.onfocus = () => {
        console.log(90);
      };
      const realStr = "123-456-789";
      divNode.innerHTML = `<span class="mceNonEditable" contenteditable="false" data-mce-content="123-456-789">123-456-789</span>`;
      divNode.setAttribute("id", "st");
      // divNode.setAttribute("class", "mceNonEditable");
      // divNode.setAttribute("contenteditable", false);
      var spanNode = ed.getDoc().createElement("span");
      range.insertNode(spanNode);
      spanNode.innerHTML = "&nbsp;";
      range.insertNode(divNode);

    //   var parser = new tinymce.html.DomParser({ validate: true }, schema);
    //   var rootNode = parser.parse("<h1>content</h1>");
    //   const node = new tinymce.html.Node("span", 123);
    //   console.log(1, node, rootNode);
    //   range.insertNode(node);
    },
  },
};
</script>

<style>
</style>