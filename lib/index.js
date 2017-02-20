'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var FsPiper = exports.FsPiper = function () {
    function FsPiper() {
        _classCallCheck(this, FsPiper);

        this.promiseStream = Promise.resolve();
    }
    //模拟pipe api


    _createClass(FsPiper, [{
        key: 'pipe',
        value: function pipe(targetFile) {
            var _this = this;

            var nextChain = function nextChain(fileData) {
                return _this.PromiseStreamWriter(targetFile, fileData);
            };
            this.thenChain(nextChain);
            return this;
        }
        //chained data structure

    }, {
        key: 'src',
        value: function src(sourceFile) {
            var _this2 = this;

            var nextChain = function nextChain() {
                return _this2.PromiseStreamReader(sourceFile);
            };
            this.thenChain(nextChain);
            return this;
        }
        //清空文件

    }, {
        key: 'empty',
        value: function empty(targetFile) {
            var _this3 = this;

            var nextChain = function nextChain() {
                return _this3.PromiseStreamWriter(targetFile, '');
            };
            this.thenChain(nextChain);
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
        value: function thenChain(nextChain) {
            this.promiseStream = this.promiseStream.then(nextChain);
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
