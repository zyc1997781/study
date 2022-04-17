import {MongoClient} from "mongodb";
import { connect,find, insert, remove, deleteOne,update } from "../utils/connectDatabase"
// 类内部创建方法  普通函数this指向为undifined   箭头函数 this指向当前类  建议创建使用箭头函数
class SqlTestController {
    constructor(){
        this.name = "boka"
    }
    // 链接数据库
    connect = (cb)=>{
        let url = "mongodb://localhost:27017/";
        let dbName = "koa"
        //链接数据库
        const mongoClient = new MongoClient(url);
        mongoClient.connect((err,client)=> {
            if (err) {
                // console.log(err)
                return;
            }
            let db = client.db(dbName)
            let dbUser = db.collection("user")
            cb && cb(dbUser,mongoClient)
        })
    }
    // 查找
   find = (body) => {
        return new Promise((resolve,reject)=>{
                this.connect((dbUser,mongoClient)=>{
                    dbUser.find(body).toArray(function(err,data){ //查找
                        if(err){
                            // console.log(err);
                            reject(err)
                            return;
                        }
                        // console.log(data);
                        resolve(data)
                    }) ;
                })
        })
    }

    // 插入
    insert = (body) => {
        return new Promise((resolve,reject)=>{
            this.connect((dbUser,mongoClient)=>{
                dbUser.insert({
                    "userName": "Boka",
                    "age" : 11,
                    "sex": "男",
                }, function (error, result) {
                    if(!error){
                        console.log("插入一个数据成功！")
                        resolve("插入一个数据成功！")
                    } else {
                        reject(error)
                    }
                })
            })
        })
    }

    // 删除全部
    remove = (body) => {
        return new Promise((resolve,reject)=>{
            this.connect((dbUser,mongoClient)=>{
                dbUser.remove(body, function (error, result) {
                    if(!error){
                        console.log("删除数据成功！")
                        resolve("删除数据成功！")
                    } else {
                        reject(error)
                    }
                })

            })
        })
    }
    // 删除一个
    deleteOne = (body) => {
        return new Promise((resolve,reject)=>{
            this.connect((dbUser,mongoClient)=>{
                dbUser.deleteOne(body, function (error, result) {
                    if(!error){
                        console.log("删除数据成功！")
                        resolve("删除数据成功！")
                    } else {
                        reject(error)
                    }
                })

            })
        })
    }

     demo = async (ctx)=>{
        console.log("hello world");
         // 获取数据库的数据
         // let insertMsg = this.insert({
         //     "userName": "Boka",
         //     "age" : 12,
         //     "sex": "男",
         // })
         // let removeMsg = this.remove({
         //     "userName": "Boka",
         // })
         update({"userName": "YTang"},{"userName": "tjy", "age": "13"})
         // let deleteMsg = this.deleteOne({
         //     "userName": "Boka",
         // })
         let userData = await this.find({})
         console.log(userData)
         ctx.body ={
             // insertMsg: insertMsg,
             // removeMsg: removeMsg,
             // deleteMsg: deleteMsg,
             data : userData,
         }
    }
}

export default new SqlTestController();
