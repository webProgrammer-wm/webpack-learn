console.log('index文件被加载了')

import { mul } from './test'

document.querySelector('#btn').onclick = function () {
    // 懒加载：当文件需要使用时才加载
    // 预加载：webpackPrefetch: true 会提前加载js文件
    // 正在加载可以认为是并行加载（同一时间加载多个文件）
    // 预加载则是等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
    import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
        console.log(mul(4, 5))
    })
}
