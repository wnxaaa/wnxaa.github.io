<script setup>
import { ref } from "vue";

import axios from "axios";

import { Marked } from "marked";
import markedCodePreview from "marked-code-preview";
import { markedHighlight } from "marked-highlight";

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('xml', xml);


const isMenu = ref(false);
const menuList = ref([]);
const content = ref("");

// 配置marked
const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);
marked.use(markedCodePreview())
// Set options
marked.use({
  async: true,
  pedantic: false,
  gfm: true,
});

// 加载文章
function loadArticle(src) {
  axios({
    method: 'get',
    url: src,
  }).then(async res => {
    changePage();
    // md转html并赋值
    content.value = await marked.parse(res.data);
  });
}
// 加载目录
function loadMenu() {
  axios({
    method: 'get',
    url: '/menu.json',
  })
    .then(function (res) {
      changePage(true);
      if (res.status == 200) {
        if (res.data) {
          menuList.value = res.data
        }
      }
    });
}
// 控制dom的展示和隐藏，以达到跳转页面的目的
function changePage(menu) {
  isMenu.value = menu
}
// 加载目录
loadMenu()

</script>

<template>
  <header v-if="isMenu">
    <h1>WNX's blog</h1>
  </header>
  <main>
    <p id="back" @click="loadMenu" v-if="!isMenu">返回首页</p>
    <ul v-if="isMenu">
      <p v-if="menuList.length == 0">加载中~</p>
      <li v-for="(item, index) in menuList" :key="index" @click="loadArticle(item.src)">
        {{ item.name }}
      </li>
    </ul>
    <div v-if="!isMenu" v-html="content" />
  </main>
  <footer>
    <p>更新时间：2025/03/18 &copy;ynqxg.com</p>
  </footer>
</template>

<style>
@import url("./assets/css/style.css");
</style>
