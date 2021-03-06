export default {
  title: "通用流程管理",
  logo: "A",
  author: "",
  whiteList: ["/login", "/404", "/401", "/lock"],
  lockPage: '/lock',
  tokenTime: 6000,
  info: {
    title: "通用流程管理系统",
    list: [
      'Avue 是一个基于vue+vuex+vue-router快速后台管理模板，采用token交互验证方式。',
      '您可以 Avue 为基础，不只限制于vue的页面，你可以嵌入任意第三方网站，基于iframe框架。',
      'Avue 构建简单上手快，最大程度上帮助企业节省时间成本和费用开支。',
    ]
  },
  wel: {
    title: '通用流程管理系统',
    list: [
      'vuex本地持久化存储,封装h5的sessionStorage和localStorage',
      '加入了本地离线的包引入方法去引入vue，vue-router等第三方包',
      '支持SSR服务端渲染(express)',
      '支持阿里巴巴图标库在线调用，自动同步图标',
      '支持iframe嵌套第三方网站',
      '支持js动态可配CRUD和FORM,节约大量开发成本，配置字典接口自动匹配字典',
      '支持多种登录方式,本地验证码校验和服务端验证码校验',
      '全局错误日志记录',
      'scss模块化开发',
      '增加系统管理模板(用户管理,角色管理,菜单管理——基于本框架的crud组件自动生成)',
      '打包后docker一键部署脚本基于nginx镜像（具体的可以修改./src/docker/Dockerfile）'
    ]
  }
}