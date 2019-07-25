const express=require('express');
//引入连接池(../pool.js)上一级的
const pool=require('../pool.js')
var router=express.Router();
router.post('/reg',function(req,res){
	var obj=req.body;
	console.log(obj);
	//验证数据是否为空//(return)阻止往后执行
	if(!obj.uname){res.send({code:401,msg:'uname required'});return;}else 
	if(!obj.upwd){res.send({code:402,msg:'upwd required'});return}else 
	if(!obj.email){res.send({code:403,msg:'email required'});return}else
	if(!obj.phone){res.send({code:404,msg:'phone required'});return}
	//执行SQL语句
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
		if(err) throw err;
		//console.log(result)
		if(result.affectedRows>0){
		res.send({code:200,msg:'register suc'})
		};
	});
});
//用户登陆
router.post('/login',function(req,res){
	var obj=req.body;//获取数据
	//验证数据是否为空
	if(!obj.uname){res.send({code:401,msg:'uname required'});return}else
	if(!obj.upwd){res.send({code:402,msg:'upwd required'});return}
	//执行SQl语句
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
	if(err) throw err;
	//console.log(result);
	//查找用户和密码同时满足的数据
	if(result.length>0){
	res.send({code:200,msg:'login suc'});
	}else{
	res.send({code:301,msg:'login err'})
	}
});
});
//用户检索
router.get('/detail',function(req,res){
	//获取数据
	var obj=req.query;
	//验证是否为空
	if(!obj.uid){res.send({code:401,msg:'uid required'});return}
	//执行SQL语句
	pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
	if(err) throw err;
	//console.log(result);
	if(result.length>0){
	res.send(result[0])
	}else{res.send({code:301,msg:'can not found'})
	}
	});
});
//修改用户(批量验证)
router.get('/update',function(req,res){
	//获取数据
	var obj=req.query;
	//验证数据是否为空
	//遍历对象，获取每个属性值
	var i=400;
	for(var key in obj){
	    i++
	if(!obj[key]){
	
	//如果属性值为空，则提示属性名必须的
	res.send({code:i,msg:key+' requied'});
	return;
	}
	}
	pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
	if(err) throw err;
	//console.log(result);
	//判断是否修改成功
	if(result.affectedRows>0){
	res.send({code:200,msg:'update suc'});
	}else{
	res.send({code:301,msg:'update err'});
	};
	});
});
//列表查询
router.get('/list',function(req,res){
	var obj=req.query;
	//验证数据是否为空
	var pno=obj.pno;
	var size=obj.size;
	if(!pno) pno=1;
	if(!size) size=3;
	//转为整形
	pno=parseInt(pno);
	size=parseInt(size);
	//计算开始查询的值
	var start=(obj.pno-1)*obj.size;
	//执行SQL语句
	pool.query('select *from xz_user LIMIT ?,?',[start,size],function(err,result){
	if(err) throw err;
	res.send(result);
	});
	/*if(!obj.pno){parseInt(obj.pno=1)return}else
	if(!obj.size){parseInt(obj.size=3)return};
	*/
	});
//删除用户
router.get('/delete',function(req,res){
	var obj=req.query;
	if(!obj.uid){res.send({code:400,msg:'uid required'});return}
	pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
	if(err) throw err;
	if(result.addectedows>0){
	res.send({code:200,msg:' update suc'});}else{res.send({code:301,msg:'delete err'});
	}
	});
});
//导出路由器对象
module.exports=router;



//完成用户模块的下的删除路由，按照编号删除（get/delete），
//完成商品模块路由器下的路由，