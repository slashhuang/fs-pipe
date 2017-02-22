
/*
 * built by slashhuang
 * 2017/2/22
 * add babel register hook
 */

require('babel-register');

require('./v1.0.4-test.js')

setTimeout(()=>require('./v1.0.5-test.js'),2000)
