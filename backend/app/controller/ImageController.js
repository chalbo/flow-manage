const moment = require("moment");
const fs = require('fs');
const path = require('path');
const utlis = require('../common/utlis');
const uuid = require('node-uuid'); 
const ImageService = require("../service/ImageService");

function getRouters() {
  return {
    'POST /api/image': Image.putImage,
    'GET /api/user/images': Image.getUserImages,
    'POST /api/user/image': Image.putUserImage,
    'DELETE /api/user/image/:id': Image.deleteUserImage,
    'DELETE /api/images/:id': Image.deleteImage,
  }
}
class Image {

  static getInstance() {
    if (!Image.instance) {
      Image.instance = new Image();
    }
    return Image.instance;
  }

  static async getUserImages(ctx, next) {
    let param = ctx.request.body;
    const userId=ctx.session.userid; 
    const data= await ImageService.getUserImages(userId);
    ctx.response.body = { "count": data.length, "list": data};
  }

  static async putUserImage(ctx, next) {
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

  static async putImage(ctx, next) {
    let param = ctx.request.body;
    const userId=ctx.session.userid;
    const file = ctx.request.files.file;
    const code= uuid.v1();
    await ImageService.putImage(file,userId,code);
    // var cameraId = param.cameraId;
    // var respUrl = param.respUrl;  
    ctx.response.type = 'application/json';
    ctx.response.body = {"url":`/images/${code}${file.name}`};

  }

  static async deleteUserImage(ctx, next) { 
    const userId=ctx.session.userid; 
    const id =ctx.params.id;
    await ImageService.deleteUserImage(id);
    // var cameraId = param.cameraId;
    // var respUrl = param.respUrl;  
    ctx.response.type = 'application/json';
    ctx.response.body = {message:'ok'};
  } 

  static async deleteImage(ctx, next) { 
    const userId=ctx.session.userid; 
    const id =ctx.params.id;
    const data= await ImageService.deleteImage(id); 
    ctx.response.type = 'application/json';
    ctx.response.body = data; 
  } 

  //
  
}
module.exports = getRouters();
