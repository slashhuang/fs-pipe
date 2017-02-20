
/*
 * 测试用例
 */


const path = require('path');
const fsPipe = require('fs-pipe');
const inst =   new fsPipe();

let sourceStream =path.resolve(process.cwd(),".babelrc");
let destStream =path.resolve(process.cwd(),"example","hello");


inst.src(sourceStream)
     .pipe(destStream)
     // .empty(LogStreamPath)
     .final(()=>console.log('file stream done'));
