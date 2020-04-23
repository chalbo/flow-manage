const UserService=require('../service/UserService');

function getRouters() {
  return {
    'GET /api/user/profile': User.getProfile,
    'GET /api/user/login': User.getLogin,
  }
}
class User {

  static getInstance() {
      if (!Image.instance) {
        Image.instance = new Video();
      }
      return Image.instance;
  }
  static async getProfile(ctx, next) {
    let param = ctx.request.body;
    // var cameraId = param.cameraId;
    // var respUrl = param.respUrl; 
    ctx.response.type = 'application/json'; 
    const data=await UserService.getProfile();
    if(data.length>0){
      ctx.session.userid=data[0].id;
      ctx.session.logged = true;
      ctx.response.body =data[0];
    }else{
      ctx.response.body ={};
    }
  }
  static async getLogin(ctx, next) {
    let param = ctx.request.body; 
    ctx.response.type = 'application/json'; 
    const data=await UserService.getProfile();
    if(data.length>0){
      ctx.session.userid=data[0].id;
      ctx.session.logged = true;
      console.log('sessionid:'+data[0].id);
      ctx.response.body =data[0];
    }else{
      ctx.response.body ={error:'login failed'};
    }
  }
}
module.exports = getRouters();