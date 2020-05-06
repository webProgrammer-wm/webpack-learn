/*
    通过js代码，让某个文件被单独打包成一个chunk
    import 动态导入语法：能将某个文件单独打包
 */
import(/* webpackChunkName: 'test' */'./test')
    // 文件加载成功
    .then(({add, mul}) => {
        console.log(add(1, 12))
    })
    // 文件加载失败
    .catch(err => {
        console.log(err)
    })
