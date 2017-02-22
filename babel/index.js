/*
 * promise版本的文件处理机制
 * @author slashhuang
 * 2017/2/19
 */
const fs = require('fs');
const path = require('path');
//日志采用异步读取，优化IO效率
module.exports =
class FsPiper{
    constructor(){
        this.promiseStream = Promise.resolve();
    }
    //模拟pipe api
    pipe(targetFile,callback){
        let nextChain = fileData =>this.PromiseStreamWriter(targetFile,fileData)
        this.thenChain(nextChain,callback)
        return this;
    }
    //promise filedata source
    src(sourceFile,callback){
        let nextChain =()=>this.PromiseStreamReader(sourceFile);
        this.thenChain(nextChain,callback);
        return this;
    }
    //清空文件
    empty(targetFile,callback){
        let nextChain = ()=>this.PromiseStreamWriter(targetFile,'');
        this.thenChain(nextChain,callback);
        return this;
    }
    //最后的回调
    final(finalCallback){
        if(typeof finalCallback =='function'){
            this.thenChain(finalCallback)
        }
    }
    thenChain(nextChain,callback){
        this.promiseStream = this.promiseStream.then(data=>{
            callback && callback(data);
            // maintain promise chain
            return nextChain(data);
        })
    }
    PromiseStreamReader(sourceFile){
       return new Promise((resolve)=>{
                fs.readFile(sourceFile,'utf8',(err,data)=>{
                    if(err){
                        reject({
                            source:sourceFile,
                            errorStack : err.stack
                        });
                    }else{
                        resolve(data)
                    }
                })
            })
    }
    PromiseStreamWriter(targetFile,fileData){
        return new Promise((resolve)=>{
            fs.writeFile(targetFile,fileData,(err,data)=>{
                if(err){
                    reject({
                        source:targetFile,
                        errorStack : err.stack
                    });
                }else{
                    //保持promise chain的数据
                    resolve(fileData)
                }
            })
        })
    }
}
