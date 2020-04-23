class Abnormal {

    constructor(){
        //Abnormal:{id:status} eg:{"56da8fa6":'2'};
        // 拓扑图更新状态 PUT /api/abnormal    参数{Abnormal:{"56da8fa6":'2',"57da8fa6":'1',"58da8fa6":'1',}}  1:正常，2：预警 3: 错误（不通）
        this.Abnormal={"56da8fa6":'2'};
    }
    getRouters() {
        return {
            'PUT /api/abnormal': this.updateAbnormalData.bind(this),
            'POST /api/abnormal': this.AbnormalListData.bind(this),
            'GET /api/abnormal': this.getAbnormalData.bind(this),
        }
    }
    static getInstance() {
        if (!Abnormal.instance) {
            Abnormal.instance = new Abnormal();
        }
        return Abnormal.instance;
    }
 
    //updateAbnormalData
    async updateAbnormalData(ctx, next) {
        let param = ctx.request.body; 
        ctx.response.type = 'application/json'; 
        if(param.Abnormal){
            this.Abnormal=param.Abnormal;
            ctx.response.body = {message:'ok'};
            return;
        }
        ctx.response.body = {error:'no json data'};
    }
    async AbnormalListData(ctx, next) {
        let data;
        try{
            let param = ctx.request.body;
            let idList=param.idList;
            const abnormal={}
            idList.map((id)=>{if(this.Abnormal[id]){abnormal[id]=this.Abnormal[id]}})
            data={data:abnormal,message:'ok'};
        }
        catch(e){ 
            data={error:e.message}
        }  
        ctx.response.type = 'application/json'; 
        ctx.response.body = data;
    }
    async getAbnormalData(ctx, next) {
        let param = ctx.request.body;
        let data={};
        if(param.id){
            data={data:this.Abnormal[param.id],message:'ok'};
        }else{
            data={data:this.Abnormal,message:'ok'};
        }
        ctx.response.type = 'application/json'; 
        ctx.response.body = data;
    }
}
module.exports = new Abnormal().getRouters();