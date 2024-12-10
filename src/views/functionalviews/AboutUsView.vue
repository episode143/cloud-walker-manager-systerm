<template>
   <div class="iframe-container">
     <iframe
       id="myIframe"
       ref="myIframe"
       src="https://www.baidu.com/"
       marginwidth="0"
       frameborder="no"
       scrolling="no"
       height="0"
       @load="setIframeHeight"
     ></iframe>
   </div>
 </template>
 
 <script>
 export default {
   name: 'DynamicIframe',
   mounted() {
     // 在组件挂载后启动定时器，定期调整 iframe 高度
     this.startHeightAdjustmentInterval();
   },
   unmounted() {
     // 在组件销毁前清除定时器
     if (this.heightAdjustmentInterval) {
       clearInterval(this.heightAdjustmentInterval);
     }
   },
   methods: {
     setIframeHeight() {
       const iframe = this.$refs.myIframe;
       if (iframe) {
         try {
           const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
           if (iframeDoc && iframeDoc.body) {
             // 设置 iframe 的高度为内容的高度，加上额外的 50px 以防止滚动条
             iframe.height = iframeDoc.body.scrollHeight + 50;
           }
         } catch (error) {
           console.error('无法访问 iframe 内容:', error);
         }
       }
     },
     startHeightAdjustmentInterval() {
       // 每 200 毫秒调整一次 iframe 高度
       this.heightAdjustmentInterval = setInterval(() => {
         this.setIframeHeight();
       }, 200);
     }
   }
 };
 </script>
 
 <style scoped>
 /* 设置框架的样式 */
 .iframe-container {
   width: 100%;
   height: 80%;
   position: relative;
 }
 iframe {
   width: 100%;
   border: none;
   overflow: hidden;
 }
 </style>