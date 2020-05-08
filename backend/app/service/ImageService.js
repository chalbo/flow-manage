const path = require('path');
const utlis = require('../common/utlis');
const moment = require('moment');
const mysql = require('../common/mysql');
const logger = require('../common/logger');
const uuid = require('node-uuid');
const fs = require('fs');
// const walk = require('walk')


class ImageService {
  constructor() {
  }
  static async putImage(file, userId, code) {
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../static/images/') + `${code}${file.name}`;
    // 创建可写流
    try {
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
    } catch (error) {

    }

    // 可读流通过管道写入可写流

    const sql = 'INSERT INTO monitor.node_image(id, image,userId,createdAt) VALUES (?,?,?,?)';
    const args = [code, `/images/${code}${file.name}`, userId, moment().format('YYYY-MM-DD HH:mm:ss')]
    await mysql.execQuery({ sql, args });
  }

  static async getUserImages(userId) {
    const sql = 'select * from  monitor.userimage where userId=? and image not like \'%blob\' ';
    const args = [userId];
    const data = await mysql.execQuery({ sql, args });
    return data;
  }
  static async deleteUserImage(id) {
    const sql = 'delete from  monitor.node_image where id=?';
    const args = [id];
    const data = await mysql.execQuery({ sql, args });
    return data;
  }

  static async deleteImage(id) {
    const fileName = `${id}`;
    let filePath = path.join(__dirname, '../../static/images/') + fileName;
    return utlis.getAsync((resolve, reject) => {
      fs.unlink(filePath, function (error) {
        if (error) {
          console.log(error);
          reject({ error: 'ok' });
          return false;
        }
        resolve({ message: 'ok' });
      })

    });
  }


  //deleteImage



}
module.exports = ImageService;

