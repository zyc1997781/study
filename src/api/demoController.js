

class DemoController {
    constructor(){}

    async demo (ctx, next){
        console.log("hello world")
        ctx.body = {
            data:[{
                name: "a",
                age: 11,
                education: [{
                    eduName: "小学"
                }, {
                    eduName: "初中"
                }],
            },{
                name: "b",
                age: 12,
                education: [{
                    eduName: "小学"
                }, {
                    eduName: "初中"
                }],
            }]
        }
        next()
    }


}

export default new DemoController();
