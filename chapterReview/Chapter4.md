# 4장 EventHandling

## index

-   [리엑트의 이벤트 시스템](#이벤트시스템) ★
-   [이벤트 핸들링 익히기](#이벤트핸들링) ★
-   [함수형 컴포넌트로 구현해보기](#함수형컴포넌트) ★
-   [정리](#정리) ★

## 이벤트시스템


### 이벤트를 사용할때 주의사항

> 이벤트 이름은 카멜표기법으로 작성한다.

예를들어 HTML의 ```onclick```은 리엑트에서 ```onClick```으로 작성해야한다.

> 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달합니다.

HTML에서 이벤트를 설정할 때는 큰 따옴표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달한다. 

> DOM 요소에만 이벤트르 설정할 수 있습니다.

```div```, ```button```, ```input```, ```form``` 등의 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 
설정할 수 없습니다. 하지만 전달받은 props를 컴포넌트 내부의 DOM이벤트로 설정할 수는 있다.

```
<div onClick = {this.props.onClick}>
    {/*(...) */}
</div>
```

### 이벤트 종류

> 리액트에서 지원하는 이벤트 종류는 다음과 같습니다.
```Clipboard```, ```Touch```, ```Composition```, ```UI```, ```Keyboard```, ```Wheel```, ```Focus```,
```Media```, ```Form```, ```Image```, ```Mouse```, ```Animation```, ```Selection```, ```Transition```

이외에 나머지 [리액트 매뉴얼](http://facebook.github.io/react/docs/events.html/)을 참고합니다.

[목차로 돌아가기](#index)

## 이벤트핸들링

이벤트 핸들링 익히기 실습 단계
### 컴포넌트 생성 및 모듈 불러오기
> 컴포넌트 생성
 src 디렉터리 내부에 EventPractice.js 파일을 만든 후 컨포넌트 초기 코드를 작성하세요.
 ```
 import React, {Component} from 'react';
 
 class EventPractice extends Component{
     render () {
        return(
            <div>
                <h1> 이벤트 연습</h1>
            </div>
        );
     }
 }

export default EventPractice;
```
> App.js에서 EventPractice 렌더링
App 컴포넌트에서 EventPractice를 불러와 렌더링

```
import React from 'react';
import EventPractice from './EventPractice';

const App = () => {
    return <EventPractice />;
};

export default App;
```

### onChange 이벤트 핸들링하기

#### onChange 이벤트 설정
EventPractice 컴포넌트에 input 요소를 렌더링하는 코드와 해당 요소에 onChange 이벤트를 설정 하는 코드를 작성합니다. 다음 코드를 EventPractice 컴포넌트의 render 메서드에 작성하세요.
> EventPractice.js
```
import React, {Component} from 'react';

class EventPractice extends Component{
    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                onChange={
                    (e)=>{
                        console.log(e);
                    }
                }
            />
        </div>
    );
    }
}

export default EventPractice;
```
코드를 저장하고, 웹 브라우저에서 크롬 개발자도구(F12)를 열어 인풋에 아무것이나 입력을 해보면
콘솔창에 이벤트 객체가 나타난다.

> EventPractice.js의 onChange 설정 부분 다시보기
```
onChange={
    (e)=>{
        console.log(e);
    }
}

```
여기서 콘솔에 기록되는 e 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체입니다. 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰떄와 똑같이 사용하면 됩니다.

SyntheticEvent 및 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화 되므로
정보를 참조할 수 없습니다. 예를들어, 0.5초 뒤에 e객체를 참조하면 e 객체 내부의 모든 값이 비워지게 됩니다.
만약 비동기적으로 이벤트 객체를 참조할 일이 있다면. ```e.persist()```함수를 호출해 주어야 합니다.
예를들어 onChange 이벤트가 발생할 때, 앞으로 변할 인풋 값인 ```e.target.value```를 콘솔에 기록해 보겠습니다.
코드를 다음과 같이 수정하세요.

```
onChange={
    (e)=>{
        console.log(e.target.value);
    }
}

```

### state에 input값 담기

 이번에는 3장에서 배운 state에 input 값을 담아 보겠습니다.
 3장에서 배운 대로 생성자 메서드인 constructor 에서 state 초기값을 설정하고, 이벤트 핸들링 함수 내부에서 ```this.setState```메서드를 호출하여 state를 업데이트해 봅시다.
 그다음에는 input의 value 값을 state에 있는 값으로 설정하세요.

>EventPractice.js
```
import React, {Component} from 'react';

class EventPractice extends Component{
    state= {
        message:''
    }
    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={
                    (e)=>{
                        this.setState({
                            message: e.target.value
                        })
                    }
                }
            />
        </div>
    );
    }
}

export default EventPractice;
```

#### 버튼을 누를때 comment값을 공백으로 설정

정말로 우리가 입력한 값이 state에 잘 들어갔는지, 그리고 인풋에서 그 값을 제대로 반영하는지 한번 검증해 보겠습니다.
input 요소 코드 아래쪽에 button을 하나 만들고, 클릭 이벤트가 발생하면 현재 comment값을 메시지 박스로 띄운 후 comment 값을 공백으로 
설정하겠습니다.

>EventPractice.js

```
import React, {Component} from 'react';

class EventPractice extends Component{
    state= {
        message:''
    }
    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={
                    (e)=>{
                        this.setState({
                            message: e.target.value
                        })
                    }
                }
            />
            <button onClick={
                ()=> {
                    alert(this.state.message);
                    this.setState({
                        message:''
                    });
                }
            }>확인</button>
        </div>
    );
    }
}

export default EventPractice;
```

alert를 사용하여 현재 message 값을 화면에 표시하게 했습니다.


### 임의 메서드 만들기

앞에서 "이벤트 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달합니다"
라고 배웠습니다. 그렇기에 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달해 주었습니다.
이 방법 대신 함수를 미리 준비하여 전달하는 방법도 있습니다. (성능상 차이는 없지만 가독성면에선 좋다.)
앞서 onChange와 onClick에 전달한 함수를 따로 빼내서 컴포넌트 임의 메서드를 만들어 보겠습니다.

#### 기본 방식
```
import React, {Component} from 'react';

class EventPractice extends Component{
    state= {
        message:''
    }
    
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(e){
        this.setState({
            message:e.target.value
        });
    }

    handleClick() {
        alert(this.state.message);
        this.setState({
            message:''
        })
    }

    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>확인</button>
        </div>
    );
    }
}

export default EventPractice;
```
함수가 호출될 때 ```this```는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 ```this```의 관계가 끊어져버립니다. 이 때문에 임의 메서드가 이벤트로 등록되어도 ```this```를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 ```this```와 바인딩하는 작업이 필요합니다. 만약 바인딩하지 않는 경우라면 ```this```가 ```undefined```를 가리키게 됩니다.
현재 constructor 함수에서 함수를 바인딩 하는 작업이 이루어 지고 있습니다.

#### Property Initializer Syntax를 사용한 메서드 작성

메서드 바인딩은 생성자 메서드에서 하는것이 정석입니다. 하지만 이작업을 불편하다고 느낄 수 도 있습니다. 새 메서드를 만들때 마다 constructor도 수정해야 하기 때문인데요. 이작업을 좀더 간단하게 하는 방법이 있습니다. 바로 바벨의 ```transform-class-properties```문법을 사용하여 화살표 함수 형태로 메서드를 정의하는 것입니다.

>EventPractice.js
```
import React, {Component} from 'react';

class EventPractice extends Component{
    state= {
        message:''
    }
    
    handleChange = (e) => {
        this.setState({
            message:e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.message);
        this.setState({
            message:''
        })
    }

    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>확인</button>
        </div>
    );
    }
}

export default EventPractice;
```

### input 여러개 다루기

input이 여러개일때는 메서드를 여러개 만드는 방법도 있지만 더 쉽게 처리하는 방법이 있습니다.
바로 event 객체를 활용하는 것입니다. ```e.target.name``` 값을사용하면 됩니다. ```onChange``` 이벤트 핸들러에서 ```e.target.name```은 해당 인풋의 ```name```을 가리킵니다. 지금은 ```message``` 겠죠? 이 값을 사용하여 ```state```를 설정하면 쉽게 해결할 수 있습니다. 코드를 한번 살펴봅시다. 

>EventPractice.js
```
import React, {Component} from 'react';

class EventPractice extends Component{
    state= {
        message:'',
        username:''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.username+ ' : ' +this.state.message);
        this.setState({
            message:'',
            username:''
        })
    }

    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={this.state.username}
                onChange={this.handleChange}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
            />
            
            <button onClick={this.handleClick}>확인</button>
        </div>
    );
    }
}

export default EventPractice;
```

여기서는 다음 코드가 핵심입니다.
>EventPractice.js의 handleChange 함수

```
handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
}
```
객체 안에서 key를 []로 감싸면 그 안에 넣은 래퍼런스가 가리키는 실제 값이 key값으로 사용됩니다.
예를들어 다음과 같은 객체를 만들면
```
const name = 'variantKey';
const object = {
    [name]:'value'
};
```

결과는 다음과 같습니다
```
{
    'variantKey': 'value'
}
```

### onKeyPress 이벤트 핸들링 하기

이번에는 키를 눌렀을 때 발생하는 KeyPress 이벤트를 처리하는 방법을 알아보겠습니다.  comment 인풋에서 (Enter) 를 눌렀을때 handleClick 메서드를 호출하도록 코드를 작성해 봅시다.

>EventPractice.js
```
import React, {Component} from 'react';

class EventPractice extends Component{
    state= {
        message:'',
        username:''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.username+ ' : ' +this.state.message);
        this.setState({
            message:'',
            username:''
        })
    }

    handleKeyPress=(e) =>{
        if(e.key === 'Enter'){
            this.handleClick();
        }
    }

    render () {
    return(
        <div>
            <h1> 이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={this.state.username}
                onChange={this.handleChange}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={this.state.message}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />
            
            <button onClick={this.handleClick}>확인</button>
        </div>
    );
    }
}

export default EventPractice;
```
[목차로 돌아가기](#index)
## 함수형컴포넌트
방금 우리가 했던 작업을 함수형 컴포넌트로 똑같이 구현할 수 있습니다. 기존 EventPractice 컴포넌트를 모두 지우고 다음과 같이 작성해 보세요.
```
import React, {useState} from 'react';

const EventPractice = () =>{
    const[username, setUsername] = useState('');
    const[message, setMessage] = useState('');
    const onChangeUsername = e=> setUsername(e.target.value);
    const onChangeMessage = e => setMessage(e.target.value);
    const onClick = () =>{
        alert(username + ' : '+ message);
        setUsername('');
        setMessage('');
    };

    const onKeyPress = e =>{
        if(e.key ==='Enter'){
            onClick();
        }
    };

    return(
        <div>
            <h1>이벤트 연습</h1>
            <input 
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChangeUsername}
            />
            <input 
                type="text"
                name="message"
                placeholder="아무거나 입력해보세요"
                value={message}
                onChange={onChangeMessage}
                onKeyPress={onKeyPress}
            />
            <button onClick = {onClick}>확인</button>
        </div>
    );

};
export default EventPractice;
```

위 코드에서는 ```e.target.name```을 활용하지 않고 ```onChange```관련 함수 두개를 따로 만들어 주었습니다.
인풋이 두 개밖에 없다면 이런 코드도 나쁘지는 않습니다. 하지만 인풋의 개수가 많아질 것 같으면 ```e.target.name```을 활용하는것이
더 좋을 수도 있습니다.
이번에는 useState를 통해 사용하는 상태에 문자열이 아닌 객체를 넣어 보겠습니다.

>EventPractice.js
```
import React, {useState} from 'react';

const EventPractice = () =>{
    const[form, setForm] = useState({
        username:'',
        message:''
    });
    const {username, message} = form;
    const onChange = e =>{
        const nextForm ={
            ...form, //기존의 form 내용을 이자리에 복사한 뒤
            [e.target.name]: e.target.value //원하는 값을 덮어 씌우기
        };
        setForm(nextForm);
    };


    const onClick = () =>{
        alert(username + ' : '+ message);
        setForm({
            username:'',
            message:''
        });
    };

    const onKeyPress = e =>{
        if(e.key ==='Enter'){
            onClick();
        }
    };

    return(
        <div>
            <h1>이벤트 연습</h1>
            <input 
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChange}
            />
            <input 
                type="text"
                name="message"
                placeholder="아무거나 입력해보세요"
                value={message}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <button onClick = {onClick}>확인</button>
        </div>
    );

};
export default EventPractice;
```

e.target.name 값을 할용하려면, 위아 같이 useState를 쓸 때 인풋 값들이 들어잇는 form 객체를 사용해주면 됩니다.
[목차로 돌아가기](#index)

## 정리

리엑트에서 이벤트를 다루는 것은 순수 자바스크립트 또느 jQuery를 사용한 웹 애플리케이션에서 이벤트를 다루는 것과 비슷합니다.
이 장에서 클래스형 컴포넌트로도 구현해보고 함수형 컴포넌트로도 구현해 보았습니다
또한 함수형 컴포넌트에서 여러 개의 인풋 상태를 과니하기 위해 userState에서 form 객체를 사용하는 방법도 배워보았는데요. 우리가
8장에서 배울 userReducer와 커스텀 Hooks를 사용하면 이작업을 훨씬더 수월하게 할 수 있습니다.

[목차로 돌아가기](#index)

