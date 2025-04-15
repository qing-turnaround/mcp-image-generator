import express from 'express';
import imageGenerator from './src/imageGenerator.js';
import config from './src/config.js';

/**
 * MCP图片生成服务器
 */
class MCPImageGenerator {
  constructor() {
    this.config = config;
    
    // 初始化Express服务器（用于本地开发和测试）
    if (process.env.NODE_ENV !== 'production') {
      this.initExpressServer();
    }
  }

  /**
   * 初始化Express服务器
   */
  initExpressServer() {
    const app = express();
    const { port } = this.config.server;
    
    app.use(express.json({ limit: '10mb' }));
    
    // 健康检查接口
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });
    
    // 图片生成API
    app.post('/generate', async (req, res) => {
      try {
        const options = req.body;
        const imageBuffer = await this.generate(options);
        
        res.set('Content-Type', `image/${options.format || 'png'}`);
        res.send(imageBuffer);
      } catch (error) {
        console.error('生成图片失败:', error);
        res.status(500).json({ error: error.message });
      }
    });
    
    app.listen(port, () => {
      console.log(`MCP图片生成服务器已启动，端口: ${port}`);
    });
  }

  /**
   * MCP函数：生成图片
   * @param {Object} params - 图片生成参数
   * @returns {Promise<Object>} 生成结果
   */
  async generate(params) {
    try {
      // 参数验证
      this.validateParams(params);
      
      // 生成图片
      const imageBuffer = await imageGenerator.generate(params);
      
      // 应用滤镜（如果有）
      let processedBuffer = imageBuffer;
      if (params.filters) {
        processedBuffer = await imageGenerator.applyFilters(imageBuffer, params.filters);
      }
      
      // 返回base64编码的图片数据和元数据
      const base64Data = processedBuffer.toString('base64');
      const format = params.format || 'png';
      
      return {
        success: true,
        format,
        width: params.width || 800,
        height: params.height || 600,
        size: processedBuffer.length,
        base64: base64Data,
        dataUrl: `data:image/${format};base64,${base64Data}`
      };
    } catch (error) {
      console.error('生成图片失败:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * MCP函数：显示生成的图片
   * @param {Object} params - 显示参数
   * @param {string} params.dataUrl - 图片的dataUrl
   * @returns {Object} 显示结果
   */
  async displayImage(params) {
    try {
      const { dataUrl } = params;
      
      if (!dataUrl) {
        throw new Error('缺少图片数据');
      }
      
      // 在Claude对话中显示图片
      return {
        success: true,
        html: `<img src="${dataUrl}" alt="Generated Image" style="max-width:100%; height:auto;" />`
      };
    } catch (error) {
      console.error('显示图片失败:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 验证参数
   * @param {Object} params - 图片生成参数
   */
  validateParams(params) {
    const { width, height } = params;
    const { maxImageSize } = this.config.security;
    
    // 验证图片尺寸
    if (width && height && width * height > maxImageSize) {
      throw new Error(`图片尺寸过大，最大允许尺寸: ${maxImageSize}像素`);
    }
    
    // 验证格式
    const format = params.format || 'png';
    if (!['png', 'jpeg', 'jpg', 'webp'].includes(format)) {
      throw new Error(`不支持的图片格式: ${format}`);
    }
  }
}

// 创建MCP服务器实例
const mcpImageGenerator = new MCPImageGenerator();

// 导出MCP函数
export const generate = mcpImageGenerator.generate.bind(mcpImageGenerator);
export const displayImage = mcpImageGenerator.displayImage.bind(mcpImageGenerator);

// 用于本地测试
export default mcpImageGenerator;