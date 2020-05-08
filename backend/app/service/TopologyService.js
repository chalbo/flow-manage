const path = require('path');
const utlis = require('../common/utlis');
const moment = require('moment');
const logger = require('../common/logger');
const uuid = require('node-uuid');
const mysql = require('../common/mysql');
const fs = require('fs');
// const walk = require('walk')


class TopologyService {
  constructor() {
  }
  static async putImage(file) {
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../static/images/') + `test_${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  static async getTopology(id) {
    const sql = 'select * from monitor.file where id=?';
    const args = [id]
    return await mysql.execQuery({ sql, args });
  }

  // static async getTopologys(userId, pageIndex, pageCount) {
  //   const sql = `select * from monitor.userfileinfo where userId=? order by createdAt desc limit ${pageIndex},${pageCount}`;
  //   const args = [userId]
  //   return await mysql.execQuery({ sql, args });
  // }

  static async getTopologysCount() {
    const sql = 'SELECT count(1) as num FROM monitor.file ';
    const args = [];
    const count = await mysql.execQuery({ sql, args });
    return count[0].num;
  }

  static async getTopologys(userId, pageIndex, pageCount) {
    const sql = `select * from monitor.userfileinfo where userId=? order by createdAt desc limit ${(pageIndex - 1) * pageCount},${pageCount}`;
    const args = [userId]
    return await mysql.execQuery({ sql, args });
  }

  //获取单个历史拓扑图
  static async getHistoriesTopology(fileId, hisId) {
    const sql = 'select * from monitor.history where id=? and fileId=?';
    const args = [hisId, fileId]
    return await mysql.execQuery({ sql, args });
  }

  //获取拓扑图历史总数
  static async getHistoriesTopologies(id, pageIndex, pageCount) {
    const sql = `select * from monitor.history where fileId=? order by updatedAt desc limit ${(pageIndex - 1) * pageCount},${pageCount}`;
    const args = [id];
    return await mysql.execQuery({ sql, args });
  }
  //获取拓扑图历史总数
  static async getHistoriesTopologiesCount(id) {
    const sql = 'SELECT count(1) as num FROM monitor.history where fileId=?';
    const args = [id];
    const count = await mysql.execQuery({ sql, args });
    return count[0].num;
  }

  //获取拓扑图历史总数
  static async deleteHistoriesTopologies(id) {
    const sql = 'delete FROM monitor.history where id=?';
    const args = [id];
    return await mysql.execQuery({ sql, args });
  }

  static async saveTopology(param) {
    const args = [param.id, param.name, param.desc, param.shared, JSON.stringify(param.data), param.image, param.userid, moment().format('YYYY-MM-DD HH:mm:ss')];
    const sql = `INSERT INTO monitor.file(id,
      name,
      \`desc\`,
      shared,
      data,
      image,
      userId,
      createdAt) VALUES (?,?,?,?,?,?,?,?)`;
    const rtcont = await mysql.execQuery({ sql, args });
    await TopologyService.insertUpdatePlane(param);
    return rtcont;
  }

  static async updateNameTopology(param) {
    const args = [param.name, param.id];
    const sql = `UPDATE monitor.file SET 
      name=? WHERE id=?`;
    return await mysql.execQuery({ sql, args });
  }

  static async updateTopology(param) {
    //放入历史文件
    const insertSql = `insert into  monitor.history (
      id,
      name,
      fileId, 
      data,
      image,
      \`desc\`,
      updatedAt)
      select '${uuid.v1()}' as id,a.name ,a.id as fileId ,a.data,a.image ,a.\`desc\`,'${moment().format('YYYY-MM-DD HH:mm:ss')}' as updatedAt from  monitor.file a where a.id='${param.id}'`;
    //const insertargs = [uuid.v1(), moment().format('YYYY-MM-DD HH:mm:ss'), param.id];
    const insertargs = [];
    await mysql.execQuery({ sql: insertSql, args: insertargs });
    //更新
    const args = [param.name, param.desc, param.shared, JSON.stringify(param.data), param.image, param.userid, moment().format('YYYY-MM-DD HH:mm:ss'), param.id];
    const sql = `UPDATE monitor.file SET 
      name=?,
      \`desc\`=?,
      shared=?,
      data=?,
      image=?,
      userId=?,
      updatedAt=? WHERE id=?`;
    const rtcont = await mysql.execQuery({ sql, args });
    // await TopologyService.insertUpdatePlane(param)

    return rtcont;

  }
  static async insertUpdatePlane(param) {
    const nodeList = param.data.nodes;
    for (let i = 0; i < nodeList.length; i++) {
      let node = nodeList[i];
      const { agent, agentIp, agentCmdType, agentMsgType, agentCmd, agentCycle, agentInfo, id, text } = node;
      const argsplane = [id, id, agent, agentIp, text, agentCmdType, agentMsgType, agentCmd, agentCycle, agentInfo];
      const sqlplane = `delete FROM monitor.MONITOR_PLAN where NODE_ID=?;
        INSERT INTO monitor.MONITOR_PLAN(NODE_ID,
        AGENT,
        AGENT_IP,
        AGENT_NAME,
        CMD_TYPE,
        MSG_TYPE,
        CMD,
        CYCLE,
        INFO) VALUES (?,?,?,?,?,?,?,?,?)
      `;
      await mysql.execQuery({ sql: sqlplane, args: argsplane });
    }
  }

}
module.exports = TopologyService;

