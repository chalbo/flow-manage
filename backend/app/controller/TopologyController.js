const moment = require("moment");
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid'); 
const ImageService = require("../service/ImageService");
const TopologyService = require("../service/TopologyService");

function getRouters() {
  return { 
    'POST /api/user/topology': Topology.userTopologies,
    'PATCH /api/user/topology': Topology.updateNameTopologies,
    'PUT /api/user/topology': Topology.updateUserTopologies,
    'GET /api/user/topology/histories': Topology.getHistoriesTopologies,
    'DELETE /api/user/topology/history/:id': Topology.deleteHistoriesTopologies,
    'GET /api/topology':Topology.getTopology,
    'GET /api/topologies':Topology.getTopologies,
  }
}
class Topology {

  static getInstance() {
    if (!Topology.instance) {
      Image.instance = new Topology();
    }
    return Topology.instance;
  }

  static async userTopologies(ctx, next) {
    let query = ctx.request.query;
    let param = ctx.request.body;
    param.userid=ctx.session.userid;
    ctx.response.type = 'application/json';
    let cont={};
    if(!query.id){
      param.id= uuid.v1(); 
      cont=await TopologyService.saveTopology(param)//id,name,desc,shared,data,image, userId,createdAt
    
    }else{
      param.id=query.id
      cont=await TopologyService.updateTopology(param);
    }
   if(cont.affectedRows>0){
      ctx.response.body ={id:param.id};
    }else{
      ctx.response.body =null;
    }
  }
  static async getTopology(ctx, next) {
    let param = ctx.request.query;
    const fileid = param.id;
    const hisId = param.version;
    // var respUrl = param.respUrl; 
    ctx.response.type = 'application/json'; 
    let data={}
    if(!hisId){
       data=await TopologyService.getTopology(fileid);
    }else{
      data=await TopologyService.getHistoriesTopology(fileid,hisId);
    }

    if(data.length>0){
      data[0].data=JSON.parse(data[0].data);
      ctx.response.body = data[0];
    }else{
      ctx.response.body = {error:'none data'};
    }
  }
  static async updateNameTopologies(ctx, next) {
    const param = ctx.request.body;
    param.userid=ctx.session.userid;
    // var respUrl = param.respUrl; 
    ctx.response.type = 'application/json'; 
    const cont=await TopologyService.updateNameTopology(param);
    if(cont.affectedRows>0){
      ctx.response.body ={id:param.id};
    }else{
      ctx.response.body ={error:'error'};
    }
  }
 
  static async updateUserTopologies(ctx, next) {
    const param = ctx.request.body;
    param.userid=ctx.session.userid;
    // var respUrl = param.respUrl; 
    ctx.response.type = 'application/json'; 
    const cont=await TopologyService.updateTopology(param);
    if(cont.affectedRows>0){
      ctx.response.body ={id:param.id};
    }else{
      ctx.response.body ={error:'error'};
    }
  }

  //获取历史修改记录
  static async getHistoriesTopologies(ctx, next) {
    const param = ctx.request.query;
    param.userid=ctx.session.userid;
    ctx.response.type = 'application/json'; 
    const list=await TopologyService.getHistoriesTopologies(param.id,param.pageIndex,param.pageCount);
    const count=await TopologyService.getHistoriesTopologiesCount(param.id);
    const parseList= list.map((val)=>{val.data=JSON.parse(val.data);return val})
    ctx.response.body = {count,list:parseList}; 
  }
  //获取历史修改记录
  static async deleteHistoriesTopologies(ctx, next) { 
    const id =ctx.params.id;
    ctx.response.type = 'application/json'; 
    const cont=await TopologyService.deleteHistoriesTopologies(id);
    if(cont.affectedRows>0){
      ctx.response.body ={id};
    }else{
      ctx.response.body ={error:'error'};
    }
  }
// 获取拓扑图列表
  static async getTopologies(ctx, next) {
    const param = ctx.request.query;
    const userid=ctx.session.userid;
    ctx.response.type = 'application/json'; 
    const list=await TopologyService.getTopologys(userid,param.pageIndex,param.pageCount);
    const count=await TopologyService.getTopologysCount(); 
    ctx.response.body = {count,list};
  }

  static async putTopology(ctx, next) {
    // let param = ctx.request.body;
    // const file=ctx.request.files;
    // const reader = fs.createReadStream(file.path);
    // let filePath = path.join(__dirname, 'static/images/') + `/test_${file.name}`;
    // // 创建可写流
    // const upStream = fs.createWriteStream(filePath);
    // // 可读流通过管道写入可写流
    // reader.pipe(upStream);
    // var cameraId = param.cameraId;
    // var respUrl = param.respUrl; 
    ctx.response.type = 'application/json';
    ctx.response.body = { message: "ok", status: true };
  }

  // static async putImage(ctx, next) {
  //   let param = ctx.request.body;
  //   const file = ctx.request.files.file; 
  //   await ImageService.putImage(file);
  //   // var cameraId = param.cameraId;
  //   // var respUrl = param.respUrl; 
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = {"url":`/images/test_${file.name}`};

  // }
}
module.exports = getRouters();
