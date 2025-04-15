/**
 * MCP图片生成器基本用法示例
 */

// 生成一个简单的图片
const basicImage = await mcpImageGenerator.generate({
  width: 500,
  height: 300,
  backgroundColor: '#f5f5f5',
  elements: [
    {
      type: 'rectangle',
      x: 50,
      y: 50,
      width: 400,
      height: 200,
      fill: '#3498db',
      borderRadius: 10
    },
    {
      type: 'text',
      x: 250,
      y: 150,
      text: 'Hello, World!',
      font: 'bold 24px Arial',
      fill: '#ffffff',
      align: 'center'
    }
  ],
  format: 'png'
});

// 显示生成的图片
await mcpImageGenerator.displayImage({
  dataUrl: basicImage.dataUrl
});

// 生成一个包含多种元素的复杂图片
const complexImage = await mcpImageGenerator.generate({
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  elements: [
    // 背景矩形
    {
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 800,
      height: 600,
      fill: 'linear-gradient(to bottom, #3498db, #2c3e50)'
    },
    
    // 标题
    {
      type: 'text',
      x: 400,
      y: 50,
      text: 'MCP 图片生成器演示',
      font: 'bold 36px Arial',
      fill: '#ffffff',
      align: 'center'
    },
    
    // 白色卡片
    {
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 600,
      height: 400,
      fill: '#ffffff',
      borderRadius: 15,
      stroke: '#e0e0e0',
      strokeWidth: 2
    },
    
    // 圆形
    {
      type: 'circle',
      x: 250,
      y: 250,
      radius: 80,
      fill: '#e74c3c'
    },
    
    // 矩形
    {
      type: 'rectangle',
      x: 450,
      y: 170,
      width: 150,
      height: 150,
      fill: '#2ecc71',
      borderRadius: 10
    },
    
    // 线条
    {
      type: 'line',
      x1: 100,
      y1: 400,
      x2: 700,
      y2: 400,
      stroke: '#3498db',
      strokeWidth: 2,
      lineDash: [5, 5]
    },
    
    // 描述文本
    {
      type: 'text',
      x: 400,
      y: 450,
      text: '这是一个使用MCP图片生成器创建的演示图片',
      font: '18px Arial',
      fill: '#333333',
      align: 'center'
    },
    
    // 底部注释
    {
      type: 'text',
      x: 400,
      y: 550,
      text: '© 2025 MCP图片生成器',
      font: '14px Arial',
      fill: '#ffffff',
      align: 'center'
    }
  ],
  format: 'png'
});

// 显示复杂图片
await mcpImageGenerator.displayImage({
  dataUrl: complexImage.dataUrl
});

// 生成并应用滤镜
const filteredImage = await mcpImageGenerator.generate({
  width: 500,
  height: 300,
  backgroundColor: '#ffffff',
  elements: [
    {
      type: 'rectangle',
      x: 50,
      y: 50,
      width: 400,
      height: 200,
      fill: '#9b59b6'
    },
    {
      type: 'text',
      x: 250,
      y: 150,
      text: '滤镜效果演示',
      font: 'bold 24px Arial',
      fill: '#ffffff',
      align: 'center'
    }
  ],
  filters: {
    brightness: 1.2,
    contrast: 1.1,
    blur: 0.5
  },
  format: 'png'
});

// 显示滤镜图片
await mcpImageGenerator.displayImage({
  dataUrl: filteredImage.dataUrl
});