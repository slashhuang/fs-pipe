# fs-pipe

> a Promise based file stream work flow

> if you are familiar with gulp

> you will find fs-pipe very useful to you to handle file IO


## install

```bash
    npm install fs-pipe
```

## soure code
[fs-pipe](./babel/index.js)

## usage case

```javascript
    const path = require('path');
    import FsPiper from 'fs-pipe';
    const inst =   new FsPiper();
    let getFile = (...name)=> path.resolve.apply(null,[process.cwd(),...name])
    let sourceStream = getFile(".babelrc");
    let destStream1 = getFile("example","hello");
    let destStream2 = getFile("example","hello1");
    let emptyStream = getFile("test","readme.md");
    let callback = ()=>console.log("stream done")
    inst.src(sourceStream,callback)
         .pipe(destStream1,callback) // write stream
         .pipe(destStream2,callback) // write stream
         .empty(emptyStream,callback) // empty file
         .final(()=>console.log('file stream done')); // final callback

```

## changeLog

- v1.0.5
> Add callback for pipe/src/empty to detailize stream detection
> [使用代码](./test/v1.0.5-test.js)




