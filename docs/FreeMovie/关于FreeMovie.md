---
index: 2
title: 关于 FreeMovie
---

<script setup>
import { onMounted,onUnmounted } from "vue";
const hideArr=['.VPNav','.VPLocalNav','.VPDocFooter','aside','.aside-container']
let isDark = false;
onMounted(() => {
    if(document.documentElement.classList.contains('dark')){
        isDark = true;
        document.documentElement.classList.remove('dark')
    }
    hideArr.forEach((item) => {
        document.querySelector(`${item}`).style.display = 'none';
    })
    document.querySelector('.VPDoc').style.fontSize = '.8em';
})
onUnmounted(() => {
    hideArr.forEach((item) => {
        document.querySelector(`${item}`).style.display = 'block';
    })
    document.querySelector('.VPDoc').style.fontSize = '1em';
    if(isDark){
        document.documentElement.classList.add('dark')
    }
})

</script>


本软件作者为MetaSola。软件为开源免费，如果你下载到了付费版本，请勿相信，并联系作者进行举报。

软件相关信息在官方网站[https://blog.metasola.cn/FreeMovie/使用指南]() 中可以找到。本项目目前只有安卓版。

有任何疑问可以加入QQ频道讨论:
【FreeMovie】[https://pd.qq.com/s/rdx55hba]()

项目开源地址:[https://github.com/ss-sola/FreeMovie]()，本项目基于Apache-2.0协议开源，请勿用于商业用途。打包和二次开发请保留代码出处。


### 免责声明

本软件仅用于学习交流，软件所有数据均来自插件，与本软件无关，作者不承担任何责任。播放过程中的广告均为视频内部嵌入，请勿相信。

