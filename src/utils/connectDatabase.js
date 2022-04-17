// 操作数据库
import {MongoClient} from "mongodb";

const connect = (cb)=>{
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
const find = (body) => {
    return new Promise((resolve,reject)=>{
        connect((dbUser,mongoClient)=>{
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
const insert = (body) => {
    return new Promise((resolve,reject)=>{
        connect((dbUser,mongoClient)=>{
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
const remove = (body) => {
    return new Promise((resolve,reject)=>{
        connect((dbUser,mongoClient)=>{
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
const deleteOne = (body) => {
    return new Promise((resolve,reject)=>{
        connect((dbUser,mongoClient)=>{
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

const update =(body, updateData) =>{
    return new Promise((resolve,reject)=>{
        connect((dbUser,mongoClient)=>{
            dbUser.update(body,{$set: updateData}, function (error, result) {
                if(!error){
                    console.log("更新数据成功！")
                    resolve("更新数据成功！")
                } else {
                    reject(error)
                }
            })

        })
    })
}
export { connect,find, insert, remove, deleteOne,update  }


