# MCP 图片生成服务器

这是一个用于生成图片的MCP服务器，提供简单易用的API接口，可以生成各种自定义图片。

## 功能特点

- 生成基本图形（矩形、圆形、线条等）
- 添加文本到图片
- 图片合成和处理
- 应用滤镜和特效
- 支持自定义尺寸和格式

## 安装

```bash
# 克隆仓库
git clone https://github.com/qing-turnaround/mcp-image-generator.git
cd mcp-image-generator

# 安装依赖
npm install

# 启动服务
npm start
```

## 使用方法

### 在 Claude 中安装 MCP 服务器

```javascript
// 在 Claude 对话中输入以下命令安装 MCP 服务器
/mcp install @qing-turnaround/mcp-image-generator
```

### 基本用法

```javascript
// 生成简单图片示例
const image = await mcpImageGenerator.generate({
  width: 500,
  height: 300,
  backgroundColor: '#ffffff',
  elements: [
    {
      type: 'rectangle',
      x: 100,
      y: 50,
      width: 200,
      height: 100,
      fill: '#ff0000'
    },
    {
      type: 'text',
      x: 150,
      y: 100,
      text: 'Hello World!',
      font: '24px Arial',
      fill: '#000000'
    }
  ],
  format: 'png'
});

// 显示生成的图片
image.display();
```

## API 参考

### generate(options)

生成图片的主要方法

| 参数 | 类型 | 描述 |
|------|------|------|
| width | Number | 图片宽度（像素） |
| height | Number | 图片高度（像素） |
| backgroundColor | String | 背景颜色（CSS颜色格式） |
| elements | Array | 图片元素数组 |
| format | String | 输出格式（'png', 'jpeg', 'webp'） |

### 元素类型

#### 矩形

```javascript
{
  type: 'rectangle',
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  fill: String, // 填充颜色
  stroke: String, // 边框颜色（可选）
  strokeWidth: Number // 边框宽度（可选）
}
```

#### 圆形

```javascript
{
  type: 'circle',
  x: Number, // 圆心x坐标
  y: Number, // 圆心y坐标
  radius: Number, // 半径
  fill: String, // 填充颜色
  stroke: String, // 边框颜色（可选）
  strokeWidth: Number // 边框宽度（可选）
}
```

#### 文本

```javascript
{
  type: 'text',
  x: Number,
  y: Number,
  text: String, // 文本内容
  font: String, // CSS字体样式
  fill: String, // 文本颜色
  align: String // 对齐方式（'left', 'center', 'right'）
}
```

#### 图片

```javascript
{
  type: 'image',
  x: Number,
  y: Number,
  width: Number, // 可选，不指定则使用原图尺寸
  height: Number, // 可选，不指定则使用原图尺寸
  src: String // 图片URL或Base64数据
}
```

## 示例

更多示例请查看 [examples](./examples) 目录。

## 许可证

MIT