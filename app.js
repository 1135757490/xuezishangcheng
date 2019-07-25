const express=require('express');
const userRouter=require('./routes/user.js');
const productRouter=require('./routes/product.js')
const bodyParser=require('body-parser');
var app=express();
app.listen(8080);

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
//托管静态资源到public目录
app.use( express.static('./public'));
//使用路由器挂载到/user下
app.use('/user',userRouter);
app.use('/product',productRouter);