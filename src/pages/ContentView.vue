<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'


import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('xml', xml);

const router = useRouter()
const route = useRoute()

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

// 加载文章
function loadArticle(src) {
  axios.get(src)
    .then(async res => {
      console.log(res);
      if (res.status == 200) {
        // md转html并赋值
        content.value = await marked.parse(res.data);
      } else {
        router.push("/");
      }
    }).catch(err => {
      router.push("/");
    });
}

function goHome() {
  router.push("/")
}

loadArticle("/md/" + route.params.page + ".md")

</script>
<template>
  <main>
    <p id="back" @click="goHome">返回首页</p>
    <div v-html="content" />
  </main>
</template>