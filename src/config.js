/**
 * 默认配置
 */
export default {
  // 服务相关配置
  server: {
    port: 3000,
    cors: true
  },
  
  // 图片生成相关配置
  imageDefaults: {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    format: 'png',
    quality: 90
  },
  
  // 缓存相关配置
  cache: {
    enabled: true,
    maxAge: 3600 // 缓存时间，单位：秒
  },
  
  // 安全相关配置
  security: {
    maxRequestsPerMinute: 60, // 每分钟最大请求数
    maxImageSize: 5000 * 5000, // 最大图片尺寸（像素总数）
    allowedHosts: ['*'] // 允许的域名，'*'表示所有
  },
  
  // 日志相关配置
  logging: {
    level: 'info', // 日志级别：debug, info, warn, error
    format: 'combined' // 日志格式：combined, common, dev, short, tiny
  }
};