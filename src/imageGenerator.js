import { createCanvas } from 'canvas';
import sharp from 'sharp';

/**
 * 图片生成器类
 */
class ImageGenerator {
  /**
   * 生成图片
   * @param {Object} options - 图片生成配置选项
   * @param {number} options.width - 图片宽度
   * @param {number} options.height - 图片高度
   * @param {string} options.backgroundColor - 背景颜色
   * @param {Array} options.elements - 图片元素数组
   * @param {string} options.format - 输出格式 (png, jpeg, webp)
   * @returns {Promise<Buffer>} 图片数据缓冲区
   */
  async generate(options) {
    const {
      width = 800,
      height = 600,
      backgroundColor = '#ffffff',
      elements = [],
      format = 'png'
    } = options;

    // 创建Canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 填充背景
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // 渲染元素
    for (const element of elements) {
      await this.renderElement(ctx, element);
    }

    // 转换为指定格式
    const buffer = canvas.toBuffer(`image/${format === 'jpg' ? 'jpeg' : format}`);
    
    // 使用sharp进行额外处理（如果有需要）
    return buffer;
  }

  /**
   * 渲染单个元素
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} element - 元素配置
   */
  async renderElement(ctx, element) {
    const { type } = element;

    switch (type) {
      case 'rectangle':
        this.renderRectangle(ctx, element);
        break;
      case 'circle':
        this.renderCircle(ctx, element);
        break;
      case 'text':
        this.renderText(ctx, element);
        break;
      case 'image':
        await this.renderImage(ctx, element);
        break;
      case 'line':
        this.renderLine(ctx, element);
        break;
      default:
        console.warn(`未知元素类型: ${type}`);
    }
  }

  /**
   * 渲染矩形
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} element - 矩形元素配置
   */
  renderRectangle(ctx, element) {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke,
      strokeWidth = 1,
      borderRadius = 0
    } = element;

    ctx.save();

    if (borderRadius > 0) {
      // 绘制圆角矩形
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + width - borderRadius, y);
      ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
      ctx.lineTo(x + width, y + height - borderRadius);
      ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
      ctx.lineTo(x + borderRadius, y + height);
      ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
      ctx.closePath();
      
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
      }
    } else {
      // 普通矩形
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fillRect(x, y, width, height);
      }
      
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
        ctx.strokeRect(x, y, width, height);
      }
    }

    ctx.restore();
  }

  /**
   * 渲染圆形
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} element - 圆形元素配置
   */
  renderCircle(ctx, element) {
    const {
      x,
      y,
      radius,
      fill,
      stroke,
      strokeWidth = 1
    } = element;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
    }
    
    ctx.restore();
  }

  /**
   * 渲染文本
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} element - 文本元素配置
   */
  renderText(ctx, element) {
    const {
      x,
      y,
      text,
      font = '16px Arial',
      fill = '#000000',
      align = 'left',
      baseline = 'alphabetic',
      maxWidth,
      stroke,
      strokeWidth = 1
    } = element;

    ctx.save();
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    
    if (fill) {
      ctx.fillStyle = fill;
      if (maxWidth) {
        ctx.fillText(text, x, y, maxWidth);
      } else {
        ctx.fillText(text, x, y);
      }
    }
    
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      if (maxWidth) {
        ctx.strokeText(text, x, y, maxWidth);
      } else {
        ctx.strokeText(text, x, y);
      }
    }
    
    ctx.restore();
  }

  /**
   * 渲染线条
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} element - 线条元素配置
   */
  renderLine(ctx, element) {
    const {
      x1,
      y1,
      x2,
      y2,
      stroke = '#000000',
      strokeWidth = 1,
      lineDash = []
    } = element;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    
    if (lineDash.length > 0) {
      ctx.setLineDash(lineDash);
    }
    
    ctx.stroke();
    ctx.restore();
  }

  /**
   * 渲染图片
   * @param {CanvasRenderingContext2D} ctx - Canvas上下文
   * @param {Object} element - 图片元素配置
   */
  async renderImage(ctx, element) {
    const {
      x,
      y,
      width,
      height,
      src,
      opacity = 1
    } = element;

    try {
      const { createCanvas, loadImage } = require('canvas');
      const image = await loadImage(src);
      
      ctx.save();
      
      if (opacity !== 1) {
        ctx.globalAlpha = opacity;
      }
      
      if (width && height) {
        ctx.drawImage(image, x, y, width, height);
      } else {
        ctx.drawImage(image, x, y);
      }
      
      ctx.restore();
    } catch (error) {
      console.error('加载图片失败:', error);
    }
  }

  /**
   * 应用滤镜效果
   * @param {Buffer} imageBuffer - 图片数据
   * @param {Object} filters - 滤镜配置
   * @returns {Promise<Buffer>} 处理后的图片数据
   */
  async applyFilters(imageBuffer, filters = {}) {
    let sharpImage = sharp(imageBuffer);
    
    if (filters.brightness !== undefined) {
      sharpImage = sharpImage.modulate({
        brightness: filters.brightness
      });
    }
    
    if (filters.contrast !== undefined) {
      sharpImage = sharpImage.modulate({
        contrast: filters.contrast
      });
    }
    
    if (filters.grayscale) {
      sharpImage = sharpImage.grayscale();
    }
    
    if (filters.blur !== undefined) {
      sharpImage = sharpImage.blur(filters.blur);
    }
    
    if (filters.sharpen !== undefined) {
      sharpImage = sharpImage.sharpen(filters.sharpen);
    }
    
    if (filters.rotate !== undefined) {
      sharpImage = sharpImage.rotate(filters.rotate);
    }
    
    return await sharpImage.toBuffer();
  }
}

export default new ImageGenerator();