const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),     // 添加别名 @，会指向到 ./src 目录
      '@css': path.resolve(__dirname, 'src', 'assets', 'styles')   // 添加别名 @less，会指向到 ./src/assets/styles 目录
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',    // 代理请求转发到本地 3000 端口
        changeOrigin: true,                 // 开启跨域支持
        pathRewrite: {
          '^/api': '',                      // 将请求路径中的 /api 替换为空字符串
        },
      },
    },
  },
};