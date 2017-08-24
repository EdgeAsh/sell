var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next){
  req.url = '/index.html';
  next();
});

app.use(router);

// ---------- 数据mock

// 定义接口，接受数据
var appData = require('./data.json');
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
// 获取路由
var apiRoutes = express.Router();

apiRoutes.get('/seller',function(req,res){
  res.json({
    errno:0,
    data:seller
  })
});
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  })
});
apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno:0,
    data:ratings
  })
});

app.use('/api',apiRoutes);

// ----------- mock结束


app.use(express.static('./dist'));


// ----------复制而来

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});