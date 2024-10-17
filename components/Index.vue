<template>
  <canvas id="myCanvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import cv from '@techstark/opencv-js';


onMounted(async () => {
  // const mat=await getCannyEdges('./1.jpg')
  let  pixelData=await (await fetch('/data.txt')).text() 
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    if (!canvas) return;
   
    drawEdgesWithAnimation( canvas,pixelData);
    canvas.click()

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark');
            console.log('Theme changed:', isDark ? 'Dark mode' : 'Light mode');
            canvas.click()
            // 在此处添加你需要的自定义逻辑
          }
        }
      });

      // 监听 <html> 元素上的 class 变化
      observer.observe(document.documentElement, { attributes: true });
})
  // function getCannyEdges(imagePath: string) {
  //   return new Promise<cv.Mat>((resolve, reject) => {
  //     const img = new Image();
  //     img.src = imagePath;
      
  //     img.onload = function () {
  //       console.log(img);
  //       const imageInput = cv.imread(img);
  //       console.log(111)
  //       // 将图像转换为灰度图像
  //       const gray = new cv.Mat();
  //       cv.cvtColor(imageInput, gray, cv.COLOR_RGBA2GRAY);

  //       // 使用Canny边缘检测算法
  //       const edges = new cv.Mat();
  //       cv.Canny(gray, edges, 50, 150);

  //       // 放大一倍（或按需要放大）
  //       const outputWidth = edges.cols * 1;
  //       const outputHeight = edges.rows * 1;
  //       const enlargedOutput = new cv.Mat();
  //       cv.resize(edges, enlargedOutput, new cv.Size(outputWidth, outputHeight), 0, 0, cv.INTER_LINEAR);

  //       // 返回 OpenCV 的 Mat 边缘检测结果
  //       resolve(enlargedOutput);

  //       // 释放内存
  //       imageInput.delete();
  //       gray.delete();
  //       edges.delete();
  //     };

  //     img.onerror = reject;
  //   });
  // }
  type Pixel = {
    x: number;
    y: number;
    originalX: number;
    originalY: number;
    targetX: number;
    targetY: number;
  };

  // 在 canvas 上绘制并实现动画
  function drawEdgesWithAnimation( canvas: HTMLCanvasElement,pixelData:string) {
    const ctx = canvas.getContext('2d');
    const width = 1600;
    const height = 1200;

    // 设置 canvas 尺寸
    canvas.width = width;
    canvas.height = height;

    // 获取黑色像素点
    let blackPixels: Pixel[] = [];
    const pixelArr=pixelData.split(',')
    for( let i=0;i<pixelArr.length;i+=2){
      blackPixels.push({ x: Number(pixelArr[i]), y: Number(pixelArr[i+1]), originalX: Number(pixelArr[i]), originalY: Number(pixelArr[i+1]), targetX: Number(pixelArr[i]), targetY: Number(pixelArr[i+1]) });
    }
    // for (let i = 0; i < height; i++) {
    //   for (let j = 0; j < width; j++) {
    //     const pixel = mat.ucharPtr(i, j);
    //     if (pixel[0] === 255 && (i + j) % 2 == 0) {  // 黑色边缘像素
    //       blackPixels.push({ x: j, y: i, originalX: j, originalY: i, targetX: j, targetY: i });
    //     }
    //   }
    // }

    // 点击事件响应
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * canvas.width;
      const clickY = ((event.clientY - rect.top) / rect.height) * canvas.height;

      // 找到点击范围内的黑色像素
      const affectedPixels = blackPixels.filter(pixel => {
        const dx = pixel.x - clickX;
        const dy = pixel.y - clickY;
        return Math.sqrt(dx * dx + dy * dy) < 5000; // 半径为50的范围
      });
      // 随机移动这些像素
      affectedPixels.forEach(pixel => {
        pixel.targetX = pixel.x + (Math.random() - 0.5) * 200;
        pixel.targetY = pixel.y + (Math.random() - 0.5) * 200;
      });

      // 开始动画
      animatePixels(affectedPixels);
    });

    function animatePixels(pixels: Pixel[]) {
      const totalFrames = 20;
      let frame = 0;
      let p = 2
      if (!ctx) return;
      let htmlClassName=document.querySelector('html')?.className
      console.log(htmlClassName)
      if( htmlClassName?.includes('dark')){
        ctx.fillStyle = '#fff'; // 只设置一次
      }else{
        ctx.fillStyle = '#000'; // 只设置一次
      }
      
      
      function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制未受影响的像素
        
        blackPixels.forEach(pixel => {
          if (!pixel.targetX) {  // 非点击范围内的像素
            ctx.fillRect(pixel.x, pixel.y, p, p);
          }
        });


        // 绘制受影响的像素
        pixels.forEach(pixel => {
          const ratio = frame / totalFrames;
          const currentX = pixel.targetX + (pixel.originalX - pixel.targetX) * ratio;
          const currentY = pixel.targetY + (pixel.originalY - pixel.targetY) * ratio;
          ctx.fillRect(currentX, currentY, p, p);
        });

        frame++;
        if (frame <= totalFrames) { // 修改这里的条件，避免多余的调用
          requestAnimationFrame(animate);
        } else {
          // 动画结束后恢复原位置
          pixels.forEach(pixel => {
            pixel.x = pixel.originalX;
            pixel.y = pixel.originalY;

          });
        }
      }

      animate();
    }

  }


</script>

<style>

canvas {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
