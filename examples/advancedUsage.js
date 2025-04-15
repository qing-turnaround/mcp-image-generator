/**
 * MCP图片生成器高级用法示例
 */

// 生成图表示例
const chartImage = await mcpImageGenerator.generate({
  width: 600,
  height: 400,
  backgroundColor: '#f8f9fa',
  elements: [
    // 标题
    {
      type: 'text',
      x: 300,
      y: 30,
      text: '简单柱状图示例',
      font: 'bold 20px Arial',
      fill: '#333333',
      align: 'center'
    },
    
    // X轴
    {
      type: 'line',
      x1: 50,
      y1: 350,
      x2: 550,
      y2: 350,
      stroke: '#333333',
      strokeWidth: 2
    },
    
    // Y轴
    {
      type: 'line',
      x1: 50,
      y1: 50,
      x2: 50,
      y2: 350,
      stroke: '#333333',
      strokeWidth: 2
    },
    
    // 柱状图数据
    // 第一个柱子
    {
      type: 'rectangle',
      x: 100,
      y: 150,
      width: 40,
      height: 200,
      fill: '#3498db'
    },
    {
      type: 'text',
      x: 120,
      y: 370,
      text: 'Q1',
      font: '14px Arial',
      fill: '#333333',
      align: 'center'
    },
    
    // 第二个柱子
    {
      type: 'rectangle',
      x: 200,
      y: 100,
      width: 40,
      height: 250,
      fill: '#2ecc71'
    },
    {
      type: 'text',
      x: 220,
      y: 370,
      text: 'Q2',
      font: '14px Arial',
      fill: '#333333',
      align: 'center'
    },
    
    // 第三个柱子
    {
      type: 'rectangle',
      x: 300,
      y: 200,
      width: 40,
      height: 150,
      fill: '#e74c3c'
    },
    {
      type: 'text',
      x: 320,
      y: 370,
      text: 'Q3',
      font: '14px Arial',
      fill: '#333333',
      align: 'center'
    },
    
    // 第四个柱子
    {
      type: 'rectangle',
      x: 400,
      y: 120,
      width: 40,
      height: 230,
      fill: '#f39c12'
    },
    {
      type: 'text',
      x: 420,
      y: 370,
      text: 'Q4',
      font: '14px Arial',
      fill: '#333333',
      align: 'center'
    },
    
    // Y轴刻度
    {
      type: 'text',
      x: 40,
      y: 350,
      text: '0',
      font: '12px Arial',
      fill: '#333333',
      align: 'right'
    },
    {
      type: 'text',
      x: 40,
      y: 250,
      text: '100',
      font: '12px Arial',
      fill: '#333333',
      align: 'right'
    },
    {
      type: 'text',
      x: 40,
      y: 150,
      text: '200',
      font: '12px Arial',
      fill: '#333333',
      align: 'right'
    },
    {
      type: 'text',
      x: 40,
      y: 50,
      text: '300',
      font: '12px Arial',
      fill: '#333333',
      align: 'right'
    },
    
    // 图例
    {
      type: 'rectangle',
      x: 480,
      y: 100,
      width: 15,
      height: 15,
      fill: '#3498db'
    },
    {
      type: 'text',
      x: 500,
      y: 112,
      text: 'Q1: 200',
      font: '12px Arial',
      fill: '#333333',
      align: 'left'
    },
    {
      type: 'rectangle',
      x: 480,
      y: 125,
      width: 15,
      height: 15,
      fill: '#2ecc71'
    },
    {
      type: 'text',
      x: 500,
      y: 137,
      text: 'Q2: 250',
      font: '12px Arial',
      fill: '#333333',
      align: 'left'
    },
    {
      type: 'rectangle',
      x: 480,
      y: 150,
      width: 15,
      height: 15,
      fill: '#e74c3c'
    },
    {
      type: 'text',
      x: 500,
      y: 162,
      text: 'Q3: 150',
      font: '12px Arial',
      fill: '#333333',
      align: 'left'
    },
    {
      type: 'rectangle',
      x: 480,
      y: 175,
      width: 15,
      height: 15,
      fill: '#f39c12'
    },
    {
      type: 'text',
      x: 500,
      y: 187,
      text: 'Q4: 230',
      font: '12px Arial',
      fill: '#333333',
      align: 'left'
    }
  ],
  format: 'png'
});

// 显示图表图片
await mcpImageGenerator.displayImage({
  dataUrl: chartImage.dataUrl
});

// 生成信息卡片示例
const cardImage = await mcpImageGenerator.generate({
  width: 400,
  height: 200,
  backgroundColor: '#ffffff',
  elements: [
    // 卡片背景
    {
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 400,
      height: 200,
      fill: '#f8f9fa',
      borderRadius: 10,
      stroke: '#e9ecef',
      strokeWidth: 1
    },
    
    // 头像背景
    {
      type: 'circle',
      x: 80,
      y: 100,
      radius: 50,
      fill: '#e9ecef'
    },
    
    // 用户图标
    {
      type: 'circle',
      x: 80,
      y: 85,
      radius: 20,
      fill: '#adb5bd'
    },
    {
      type: 'circle',
      x: 80,
      y: 140,
      radius: 30,
      fill: '#adb5bd'
    },
    
    // 用户信息
    {
      type: 'text',
      x: 170,
      y: 70,
      text: '张三',
      font: 'bold 20px Arial',
      fill: '#212529',
      align: 'left'
    },
    {
      type: 'text',
      x: 170,
      y: 100,
      text: '软件工程师',
      font: '16px Arial',
      fill: '#6c757d',
      align: 'left'
    },
    {
      type: 'text',
      x: 170,
      y: 130,
      text: 'ID: 12345678',
      font: '14px Arial',
      fill: '#6c757d',
      align: 'left'
    },
    
    // 底部信息
    {
      type: 'line',
      x1: 20,
      y1: 160,
      x2: 380,
      y2: 160,
      stroke: '#dee2e6',
      strokeWidth: 1
    },
    {
      type: 'text',
      x: 200,
      y: 180,
      text: '生成于 2025-04-15',
      font: '12px Arial',
      fill: '#6c757d',
      align: 'center'
    }
  ],
  format: 'png'
});

// 显示卡片图片
await mcpImageGenerator.displayImage({
  dataUrl: cardImage.dataUrl
});

// 生成二维码示例（模拟）
const qrCodeImage = await mcpImageGenerator.generate({
  width: 300,
  height: 300,
  backgroundColor: '#ffffff',
  elements: [
    // 二维码背景
    {
      type: 'rectangle',
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 1
    },
    
    // 二维码定位图案（左上角）
    {
      type: 'rectangle',
      x: 70,
      y: 70,
      width: 30,
      height: 30,
      fill: '#000000'
    },
    {
      type: 'rectangle',
      x: 75,
      y: 75,
      width: 20,
      height: 20,
      fill: '#ffffff'
    },
    {
      type: 'rectangle',
      x: 80,
      y: 80,
      width: 10,
      height: 10,
      fill: '#000000'
    },
    
    // 二维码定位图案（右上角）
    {
      type: 'rectangle',
      x: 200,
      y: 70,
      width: 30,
      height: 30,
      fill: '#000000'
    },
    {
      type: 'rectangle',
      x: 205,
      y: 75,
      width: 20,
      height: 20,
      fill: '#ffffff'
    },
    {
      type: 'rectangle',
      x: 210,
      y: 80,
      width: 10,
      height: 10,
      fill: '#000000'
    },
    
    // 二维码定位图案（左下角）
    {
      type: 'rectangle',
      x: 70,
      y: 200,
      width: 30,
      height: 30,
      fill: '#000000'
    },
    {
      type: 'rectangle',
      x: 75,
      y: 205,
      width: 20,
      height: 20,
      fill: '#ffffff'
    },
    {
      type: 'rectangle',
      x: 80,
      y: 210,
      width: 10,
      height: 10,
      fill: '#000000'
    },
    
    // 二维码内容（简单模拟）
    ...Array.from({ length: 10 }, (_, i) => ({
      type: 'rectangle',
      x: 110 + (i % 5) * 10,
      y: 110 + Math.floor(i / 5) * 10,
      width: 8,
      height: 8,
      fill: Math.random() > 0.5 ? '#000000' : '#ffffff'
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
      type: 'rectangle',
      x: 120 + (i % 5) * 10,
      y: 130 + Math.floor(i / 5) * 10,
      width: 8,
      height: 8,
      fill: Math.random() > 0.5 ? '#000000' : '#ffffff'
    })),
    ...Array.from({ length: 12 }, (_, i) => ({
      type: 'rectangle',
      x: 130 + (i % 4) * 10,
      y: 150 + Math.floor(i / 4) * 10,
      width: 8,
      height: 8,
      fill: Math.random() > 0.5 ? '#000000' : '#ffffff'
    })),
    
    // 底部文字
    {
      type: 'text',
      x: 150,
      y: 280,
      text: '扫描二维码',
      font: '16px Arial',
      fill: '#000000',
      align: 'center'
    }
  ],
  format: 'png'
});

// 显示二维码图片
await mcpImageGenerator.displayImage({
  dataUrl: qrCodeImage.dataUrl
});