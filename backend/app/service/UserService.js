const path = require('path');
const utlis = require('../common/utlis');
const moment = require('moment');
const logger = require('../common/logger');
const mysql = require('../common/mysql');
const fs = require('fs');
// const walk = require('walk')


class UserService {
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

  static async getProfile() {
    const sql = 'select * from monitor.user';
    return await mysql.execQuery({ sql });
  }

}
module.exports = UserService;

