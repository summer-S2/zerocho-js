/* 
  1. 함수와 함수의 호출, 고차함수

  - 함수의 호출 ex)add()을 보면 함수의 return값으로 대체해서 생각해보기
  - 고차함수의 경우 함수를 리턴함
*/
/*
const add = (a, b) => a + b; // return 생략
// const add1 = (a, b) => ({a + b}); //  객체를 return하는데 return을 생략할때는 괄호 사용
// 위의 원본 const add = (a, b) =>  { return a + b; }

function calculator(func, a, b) { // 함수 선언
  return func(a, b);
}

console.log(add(3, 5)); // 8
console.log(calculator(add, 3, 5)); // 8


add() // 함수호출 -> return값을 생각하면 됨
console.log(add()); // undefined + undefined: NaN
// return a+b인데 a,b의 값이 없으니 (파라미터로 전달된 값이 없으니) undefined + undefined

const onClick = () => () => { // 함수를 return함 고차함수!
  console.log('hello');
};

// 위의 코드의 원형
// const onClick = () => {
//   return () => {
//     console.log('hello');
//   };
// }

// onClick();의 리턴값은 () => { console.log('hello')}; 가 됨
*/

/*
  2. callstack

  - callstack은 debugger로 확인가능

*/
/*
const x = 'x';

function c() {
  const y = 'y';
  console.log('c');

}

function a() {
  const x = 'x';
  console.log('a');
  function b() {
    const z = 'z';
    console.log('b');
    c();
  }
  b();
}

a();
// a함수 호출 -> console.log('a') -> b함수호출 -> console.log('b'); -> c함수 호출 -> console.log('c'); -> c함수 종료 -> b함수 종료 -> a함수 종료

c();
// c함수 호출 ->  console.log('c') -> c함수 종료
*/


/*
  3. scope chain

  - 함수에서 어떤값에 접근이 가능한가 ?
*/
/*
const x = 'x';

function c() {
  const y = 'y';
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c();
  }
}

function a() {
  const x = 'x';
  console.log('a');
  b();
}
// 렉시컬 스코프 : 자기자신에서 찾음 -> 위로올라가면서 찾음
// c -> anony
// a -> anony
// b -> c -> anony
*/


/*
  4. 호이스팅

  - 선언보다 호출이 먼저 된 경우..
  - function은 var는 호이스팅 가능
  
  - 호이스팅은 웬만하면 사용하지 말기
  - var 선언, function 맨 위로 올리기

*/
/*
function a() {
  console.log(z);
}

const z = 'z1';
a(); // z1

// a(); // 에러
// const z = 'z1';
*/


/*
  5. this

  - this는 호출될때 결정! 선언될때는 모름
  - this는 js에서 기본적으로 window, globalThis
  - this는 node에서 기본적으로 global,  globalThis
  - use strict 모드에서는 undefined

  * this가 바뀌는 경우
    - 객체에 붙여서 사용하는경우 this는 객체 자신
    - new 붙여서 사용하면 this는 객체 자신
    - bind, call, apply
    - () => {} 사용하면 this는 부모함수의 this

  * 예외 !!!!
    - callback의 this는 확인할 수 없음. 

    addEventListener
    태그.addEventListener('click', function() { // 클릭한 태그가 this
      console.log(this); 
    });
     - 여기서 function는 호출이 아닌 선언. 호출이 언제될지는 모름
     - addEventListener에서 쓰이는 this는 태그가 됨 

    - callback함수에 화살표함수를 넣으면 this는 window가 됨 
    태그.addEventListener('click', () => { // window가 this
      console.log(this);
    })

*/
/*
// 객체에 붙여서 사용하는경우 this는 객체 자신
const obj = {
  name: '짱구',
  sayName() {
    console.log(this.name);
  }
}
// 함수앞에 객체가 있으면 함수내부에서 this는 객체자신임
obj.sayName(); // 짱구

// 하지만 변수에 대입하면 this는 window가 됨
const sayN = obj.sayName;
sayN(); // undefined

// 객체 내부함수에서 사용하지만 화살표 함수인 경우는 this가 window 
const obj2 = {
  name: '유리',
  sayName: () => {
    console.log(this.name);
  }
}
obj2.sayName(); // undefined

// 객체를 new로 생성하는경우 this는 객체 자신
function Human(name) {
  this.name = name;
}
new Human('철수'); // name: '철수'


// bind, apply, call 하면 this는 객체 자신
function sayName2() {
  console.log(this.name);
}
sayName2({ name: '맹구' }); // undefined (this는 window)
sayName2.bind({ name: '맹구' })(); // 맹구 bind는 this를 바꿔서 함수를 다시 생성 -> 호출 작업이 필요
sayName2.apply({ name: '맹구' }); // 맹구 apply는 생성과 동시에 호출 (인수를 배열로 넣음)
sayName2.call({ name: '맹구' }); // 맹구 (인수를 순서대로 넣음)


const obj = {
  name: '짱구',
  sayName() {
    console.log(this.name);
    function inner() {
      console.log(this.name);
    }
    inner();
  }
}
obj.sayName(); // 짱구, undefined
// obj.sayName()은 객체에 붙여 함수를 호출했으니 this는 obj자신이고, 그 다음 실행되는 inner()는 this를 처리해주는게 없으니 this는 window가 되어 undefined임

// 화살표함수를 쓰면 this는 호출될때 부모함수의 this를 가져옴
const obj = {
  name: '짱구',
  sayName() {
    console.log(this.name);
    const inner= () => {
      console.log(this.name);
    }
    inner();
  }
}
obj.sayName(); // 짱구, 짱구
  // this는 호출될때 결정되는것 중요
  // sayName이 호출될때 obj에 붙어있기때문에 this는 obj가 되고, sayName함수의 this가 obj이기때문에 inner함수의 this는 부모함수의 this를 가져와 obj가 됨. sayName이 어떻게 호출되냐에따라 this는 달라질 수 있음!!.

  */

/* 예시
const x = true;
let y = false;
function a() {
  let a = 4;
  y = true; // 전역변수 y가 true
  if (x) { // 전역변수 x가 true니까 실행됨
    let a = 3; // if문의 지역변수
    for (let i = 0; i < a; i++) { // i < 3
      console.log(i); // 0,1,2
    }
    if (!y) { // y는 true로 바뀌었기때문에 실행되지 않음
      kkk()
    }
  }
  z(); // a함수를 실행한 시점에서 z함수는 선언되지 않았으므로 오류. function이었으면 실행됨
}
a();
const z = () => {};
*/


/*
  promise

  - 실행은 바로 하되, 결괏값을 나중에 원할 때 쓸 수 있는 것
  - new Promise하면 콜백함수가 호출됨 !
  - resolve함수가 호출되면 실행됨

*/
/*
const promise = new Promise((resolve, reject) => { // 결과값을 promise에 담아놓음
  setTimeout(() => {
    resolve();
  }, 5000);
});
// 중간에 다른 코드 실행
promise.then(() => {
  console.log('a');
})
*/


/*
  비동기

  - 한 번 비동기는 영원한 비동기
  - 비동기는 동시의 문제가 아니다. 순서의 문제다
  - 비동기코드를 동기로 만들 수 없음
  - 매크로큐 : ajax, timer, e-listener, 등등
  - 마이크로큐 : promise, process.nextTick
  - 마이크로큐에 있던 요청이 먼저 callstack으로 넘어감

*/

/*
// setImmediate와 Promise가 거의 동시에 실행되지만 promise는 마이크로큐로 들어가기때문에 먼저 실행됨
setImmediate(() => { // 즉시실행
  console.log('a');
})
setTimeout(() => {
  console.log('b');
}, 1000)
setTimeout(() => {
  console.log('c');
}, 2000)
Promise.resolve().then(() => {
  console.log('p');
})
// 결과 -> p,a,b,c


let a = 2;
setTimeout(() => {
  a = 5;
  console.log(a);
  // 한번 비동기는 영원한 비동기함수이기때문에 a = 5 라는 값을 비동기함수 바깥에서 사용할 수 없음 !
  // 함수 내부의 값은 함수 내부에서만 사용해야함
}, 0);


// 위의 함수를 promise로 바꾸면 ? 
const p = new Promise((resolve, reject) => { // 호출 // 동기임
  console.log('제일먼저'); 
  setTimeout(() => {
    a = 5;
    console.log(a);
    resolve(a); // return할 값을 저장
  }, 0)
});
console.log('중간');
// resolve에 저장된 값을 언제든 불러올 수 있음
p.then((result) => { // 호출 -> 백그라운드에 기록 -> 특정조건이 실행됐을때(resolve호출) -> setTimeout이 실행돼서 resolve(a)를 호출하면 그제서야 동작
  console.log('result', result); // result 5
})



p.then((result) => {
  console.log('result', result);
}).then(() => {
  // 여기서 에러나면
}).then(() => {
  // 건너뜀
}).then(() => {
  // 건너뜀
}).then(() => {
  // 건너뜀
}).catch(() => {
  // 여기로 이동 // catch는 앞의 전체에 대한 에러임
  // catch는 중간에 있어도 됨
}).finally(() => {

})



function delayP(ms) {
  return new Promise ((resolve, result) => {
    setTimeout(resolve, ms);
  });
};


p.then((result) => {
  console.log('result', result);
  return 1; // 여기서 리턴한 값이
  // return Promise.resolve(1); // return으로 프로미스를 넘겨주면 resolve한 값이 리턴
}).then((result) => { // 여기 result에 반영
  console.log(result); // 1
  // return하지 않으면
}).then((result) => { 
  console.log(result); // undefined
}).then(() => {
  
}).then(() => {
  
}).catch(() => {
  
}).finally(() => {

})

*/
async function a() {
  try {
    await delayP(1000);
  } catch (error) {
    console.error(error);
  }
  try {
    await delayP(1000);
    await delayP(1000);
    await delayP(1000);
    await delayP(1000);
  } catch (error) {

    console.error(error);

  }
}


// async 함수를 promise로 바꾸기
async function a() { // await -> then
  const a = await 1;
  console.log('a', a);
  console.log('hmm');
  await null;
  const b = await Promise.resolve(1);
  console.log('b', b);
  return b;
}

Promise.resolve(1)
  .then((a) => {
    console.log('a', a);
    console.log('hmm');
    return null;
  })
  .then(() => {
    Promise.resolve(1);
  })
  .then((b) => {
    console.log('b', b);
    return b;
  })