
/*
 * 测试用例
 */


const path = require('path');
import FsPiper from '../lib/index';
const inst =   new FsPiper();
let getFile = (...name)=> path.resolve.apply(null,[process.cwd(),...name])
let sourceStream = getFile(".babelrc");
let destStream = getFile("example","hello");
let emptyStream = getFile("test","readme.md");

inst.src(sourceStream)
     .pipe(destStream)
     .empty(emptyStream)
     .final(()=>console.log('file stream done'));
