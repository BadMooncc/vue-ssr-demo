const express = require('express');
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');

const app = express();

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const template = fs.readFileSync(path.resolve('./src/index.template.html'), 'utf-8');

const render = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest
});

app.use(express.static('./dist',{index:false}))

app.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  render.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })
})
app.listen(3003);