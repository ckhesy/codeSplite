async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
// 其实就是
async function async1() {
  console.log('async1 start');
  Promise.resolve(async2()).then(()=>console.log('async1 end'))
}



// 这段代码在浏览器上的输出是什么？
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');

// ==============



// 定时器问题
const s = new Date().getSeconds();

setTimeout(function() {
  // 输出 "2"，表示回调函数并没有在 500 毫秒之后立即执行
  //如果不知道事件循环机制，那么想当然就认为 setTimeout 中的事件会在 500 毫秒后执行，但实际上是在 2 秒后才执行，原因大家应该都知道了，主线程一直有任务在执行，直到 2 秒后，主线程中的任务才执行完成，这才去执行 macrotask 中的 setTimeout 回调任务。
// 因为你执行 setTimeout(task,100) 后，其实只是确保这个任务，会在100毫秒后进入macrotask队列，但并不意味着他能立刻运行，可能当前主线程正在进行一个耗时的操作，也可能目前microtask队列有很多个任务，所以用 setTimeout 作为倒计时其实并不会保证准确。

  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);

while(true) {
  if(new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds");
    break;
  }
}
// https://juejin.cn/post/6844903968292749319