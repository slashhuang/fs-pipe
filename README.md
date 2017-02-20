# fs-pipe

> a Promise based file stream work flow
> if you are familiar with gulp
> you will finde fs-pipe very useful to you to handle file type


## install

```bash
    npm install fs-pipe
```

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

    inst.src(sourceStream)
         .pipe(destStream1) // write stream
         .pipe(destStream2) // write stream
         .empty(emptyStream) // empty file
         .final(()=>console.log('file stream done')); // final callback

```


