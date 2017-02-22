
/*
 * 测试用例
 */


const path = require('path');
import FsPiper from '../babel/index';
const inst =   new FsPiper();
let getFile = (...name)=> path.resolve.apply(null,[process.cwd(),...name])
let sourceStream = getFile(".babelrc");
let destStream1 = getFile("example","hello");
let destStream2 = getFile("example","hello1");
let emptyStream = getFile("test","readme.md");

inst.src(sourceStream,()=>{console.log(sourceStream,"done")})
     .pipe(destStream1,()=>{console.log(destStream1,"done")})
     .pipe(destStream2,()=>{console.log(destStream2,"done")})
     .empty(emptyStream,()=>{console.log(emptyStream,"done")})
     .final(()=>console.log('file stream done'));
