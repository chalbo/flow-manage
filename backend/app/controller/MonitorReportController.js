const moment = require("moment");
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid'); 
const ImageService = require("../service/ImageService");
const MonitorReportService = require("../service/MonitorReportService");

function getRouters() {
  return { 
    'POST /api/getMonitorReport': MonitorReport.getMonitorReport,
    'POST /api/getMonitorDetail': MonitorReport.getMonitorDetail,
    'POST /api/getMonitorPlaneChart': MonitorReport.getMonitorPlaneChart,
    'POST /api/getWarnMonitorPlane': MonitorReport.getWarnMonitorPlane,
    'POST /api/getManage': MonitorReport.getMonitorReport,
    'POST /api/getPerson': MonitorReport.getPerson,
  }
}
class MonitorReport {

  static getInstance() {
    if (!MonitorReport.instance) {
      MonitorReport.instance = new MonitorReport(); 
    }
    return MonitorReport.instance;
  }

  static async getMonitorReport(ctx, next) {
    let query = ctx.request.query;  
    let param = ctx.request.body; 
    ctx.response.body ={data:[{id:'123',agent:1,agentIp:'123.123.123.13',cmdType:'',msgType:'',cmd:'',cycle:'',info:''},{id:'456',agent:1,agentIp:'123.123.123.13',cmdType:'',msgType:'',cmd:'',cycle:'',info:''}],count:100}; 
  }
  static async getMonitorDetail(ctx, next) {
    let query = ctx.request.query;
    let param = ctx.request.body; 
    ctx.response.body ={data:[{id:'123',ctime:'2017-02-02',fromIp:'123.123.123.13',fromName:'xxx',cmdType:'',msgType:'',cmd:'',msg:'',info:''}],count:100}; 
  
  }
  static async getMonitorPlaneChart(ctx, next) {
    let query = ctx.request.query;
    let param = ctx.request.body; 
    ctx.response.body ={timeType:'48',data:[1,2,3,4,5,6,7,8,9,0,12,12]}; 
  }
 
  static async getPerson(ctx, next) {
    let query = ctx.request.query;
    let param = ctx.request.body; 
    ctx.response.body ={data:[{id:'123',name:1,tel:'1231231231',email:'123@123.com'}]}; 
  
  }
  static async getWarnMonitorPlane(ctx, next) {
    let query = ctx.request.query;
    let param = ctx.request.body; 
    ctx.response.body ={data:[{id:'123',agent:1,agentIp:'123.123.123.13',cmdType:'',msgType:'',cmd:'',cycle:'',info:''}]}; 
  
  }


}
module.exports = getRouters();
