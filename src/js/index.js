// import '@babel/polyfill'
import '../assets/css/index.scss';
import print from './print';

console.log('index被加载了');

const add = (x, y) => x + y;

console.log(add(1, 2), 1111111);

print();

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了');
    resolve();
  }, 1000);
});

console.log(promise);

if (module.hot) {
  module.hot.accept('./print.js', () => {
    print();
  });
}
