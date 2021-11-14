const path = require('path');
const express = require('express');
const compression = require ('compression')
const httpProxy = require ('http-proxy')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const config = require('../config/config')

const publicPath = path.join(__dirname, '..', 'public');
const app = express();
const port = process.env.PORT || 3000;

const proxy = httpProxy.createProxyServer({ target:config.apiUrl, changeOrigin: true});

app.use(express.static(publicPath));

app.use('/api',(req,res)=> proxy.web(req,res,{target: config.apiUrl})   );

app.use(compression());

app.use('/', connectHistoryApiFallback());

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
//this router place in the final line

app.listen(port, () => {
  console.log(`Server is up on port : ${port}`);
});

