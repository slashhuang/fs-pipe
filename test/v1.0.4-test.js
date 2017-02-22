
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

inst.src(sourceStream)
     .pipe(destStream1)
     .pipe(destStream2)
     .empty(emptyStream)
     .final(()=>console.log('file stream done'));
