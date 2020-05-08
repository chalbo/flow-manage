
const moment = require("moment");
const fs = require('fs');
const path = require('path');
const utlis = require('../common/utlis');
const uuid = require('node-uuid');
// const officegen = require('officegen');

// const pptx = officegen('pptx');//pptx
class Word {
  getRouters() {
    return {
      'GET /api/download/word': function () { },
    }
  }

  static getInstance() {
    if (!Word.instance) {
      Word.instance = new Word();
    }
    return Word.instance;
  }
  async downloadWord(ctx, next) {
    const fs = require('fs');
    const docx = officegen('docx');//word
    console.log('exportWord-------------');
    docx.on('finalize', function (written) {
      console.log('Finish to create Word file.\nTotal bytes created: ' + written + '\n');
    });
    docx.on('error', function (err) {
      console.log(err);
    });
    let fields = {
      id: '',
      provinceZh: '',
      leaderZh: '',
      cityZh: '',
      cityEn: ''
    }
    var table = [
      [{
        val: "No.",
        opts: {
          align: "center",
          vAlign: "center",
          sz: '36',
        }
      }, {
        val: "省份",
        opts: {
          align: "center",
          vAlign: "center",
          sz: '36',
          b: true,
          color: "A00000",
          align: "right",
          shd: {
            fill: "92CDDC",
            themeFill: "text1",
            "themeFillTint": "80"
          }
        }
      }, {
        val: "市",
        opts: {
          align: "center",
          vAlign: "center",
          sz: '36',
          // cellColWidth: 42,
          // b:true,
          // sz: '48',
          // shd: {
          //   fill: "92CDDC",
          //   themeFill: "text1",
          //   "themeFillTint": "80"
          // }
        }
      }, {
        val: "区/县",
        opts: {
          align: "center",
          vAlign: "center",
          sz: '36',
          // cellColWidth: 42,
          // b:true,
          // sz: '48',
          // shd: {
          //   fill: "92CDDC",
          //   themeFill: "text1",
          //   "themeFillTint": "80"
          // }
        }
      }],
    ]

    var tableStyle = {
      tableColWidth: 2400,
      tableSize: 24,
      tableColor: "ada",
      tableAlign: "center",
      tableVAlign: "center",
      tableFontFamily: "Comic Sans MS",
      borders: true
    }
    var pObj = docx.createP({ align: 'center' });// 创建行 设置居中 大标题
    pObj.addText('全国所有城市', { bold: true, font_face: 'Arial', font_size: 18 });// 添加文字 设置字体样式 加粗 大小

    /************************* 表格 *******************************/
    let SingleRow = ['11111', '22222', '33333', '44444']
    table.push(SingleRow);
    table.push(SingleRow);
    table.push(SingleRow);
    table.push(SingleRow);

    docx.createTable(table, tableStyle);
    const tmpFilePath = path.join(__dirname, '../../static/wordDoc.docx');
    var out = fs.createWriteStream(tmpFilePath);// 文件写入
    out.on('error', function (err) {
      console.log(err);
    });

    docx.generate(out);// 服务端生成word
    // ctx.body = { a: 1, b: 2 };
    ctx.res.writeHead(200, {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      'Content-disposition': 'attachment; filename=out' + moment(new Date().getTime()).format('YYYYMMDDhhmmss') + '.docx'
    });
    docx.generate(ctx.res);// 客户端导出word

  }

}
module.exports = new Word().getRouters();
