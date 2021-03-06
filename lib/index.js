'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * promise版本的文件处理机制
 * @author slashhuang
 * 2017/2/19
 */
var fs = require('fs');
var path = require('path');
//日志采用异步读取，优化IO效率
module.exports = function () {
    function FsPiper() {
        _classCallCheck(this, FsPiper);

        this.promiseStream = Promise.resolve();
    }
    //模拟pipe api


    _createClass(FsPiper, [{
        key: 'pipe',
        value: function pipe(targetFile, callback) {
            var _this = this;

            var nextChain = function nextChain(fileData) {
                return _this.PromiseStreamWriter(targetFile, fileData);
            };
            this.thenChain(nextChain, callback);
            return this;
        }
        //promise filedata source

    }, {
        key: 'src',
        value: function src(sourceFile, callback) {
            var _this2 = this;

            var nextChain = function nextChain() {
                return _this2.PromiseStreamReader(sourceFile);
            };
            this.thenChain(nextChain, callback);
            return this;
        }
        //清空文件

    }, {
        key: 'empty',
        value: function empty(targetFile, callback) {
            var _this3 = this;

            var nextChain = function nextChain() {
                return _this3.PromiseStreamWriter(targetFile, '');
            };
            this.thenChain(nextChain, callback);
            return this;
        }
        //最后的回调

    }, {
        key: 'final',
        value: function final(finalCallback) {
            if (typeof finalCallback == 'function') {
                this.thenChain(finalCallback);
            }
        }
    }, {
        key: 'thenChain',
        value: function thenChain(nextChain, callback) {
            this.promiseStream = this.promiseStream.then(function (data) {
                callback && callback(data);
                // maintain promise chain
                return nextChain(data);
            });
        }
    }, {
        key: 'PromiseStreamReader',
        value: function PromiseStreamReader(sourceFile) {
            return new Promise(function (resolve) {
                fs.readFile(sourceFile, 'utf8', function (err, data) {
                    if (err) {
                        reject({
                            source: sourceFile,
                            errorStack: err.stack
                        });
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    }, {
        key: 'PromiseStreamWriter',
        value: function PromiseStreamWriter(targetFile, fileData) {
            return new Promise(function (resolve) {
                fs.writeFile(targetFile, fileData, function (err, data) {
                    if (err) {
                        reject({
                            source: targetFile,
                            errorStack: err.stack
                        });
                    } else {
                        //保持promise chain的数据
                        resolve(fileData);
                    }
                });
            });
        }
    }]);

    return FsPiper;
}();
