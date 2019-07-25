const express=require('express');
//创建路由器对象
const pool=require('../pool.js');
var router=express.Router();
//商品列表
router.get('/list',function(req,res){
	
	var obj=req.query;
	var pno=obj.pno;
	var count=obj.count;
	if(!pno) pno=2;
	if(!count) count=3;
	pno=parseInt(pno);
	count=parseInt(count);
	var stear=(pno-1)*count;
	pool.query('select lid,price,title from xz_laptop LIMIT ?,?',[stear,count],function(err,result){
	if(err) throw err;
	res.send(result);
	});
});
//商品详情
router.get('/detail',function(req,res){
	var obj=req.query;
	if(!obj.lid){res.send({code:401,msg:required})}
	pool.query('select * from xz_laptop where lid=?',[obj.lid],function(err,result){
	if(err) throw err;
	res.send(result);
	});
});
//3.商品添加
//4.删除商品
//5.修改商品

















module.exports=router;