# Chapter 5 ref: DOM에 이름달기

## index
-   [ref는 어떤 상황에서 사용해야할까?](#ref) ★
-   [ref 사용](#ref사용) ★
-   [컴포넌트에 ref 달기](#ref컴포넌트) ★
-   [정리](#정리) ★


## ref

특정 DOM에 작업을 해야 할 때 ref를 사용한다는 것은 이미 파악했다. 하지만 대체 '어떤'작업을 할때 ref를 사용해야할까요?
정답은 'DOM을 꼭 직접적으로 건드려야할때' 입니다. 
하지만 리액트에서 이런 작업은 굳이 DOM에 접근하지 않아도 state로 구현할 수 있습니다.
앞으로 작성할 코드를 확인해 봅시다.

### 예제 컴포넌트 생성

src 디렉터리 안에 ValidationSample.css와 ValidationSample.js 파일을 만들어주세요

>ValidationSample.css
```
.success{
    background-color: lightgreen;
}

.failure{
    background-color: lightcoral;
}
```

>ValidationSample.js
```
import React, {Component} from 'react';
import './ValidationSample.css';
class ValidationSample extends Component{
    state = {
        password: '',
        clicked: false,
        validated : false
    }

    handleChange = (e) => {
        this.setState({
            password:e.target.value
        });
    }

    handleButtonClick = () =>{
        this.setState({
            clicked:true,
            validated:this.state.password === '0000'
        })
    }

    render() {
        return(
            <div>
                <input
                type = "password"
                value={this.state.password}
                onChange= {this.handleChange}
                className={this.state.clickde ? (this.state.validated ? 'success' : 'failure') : ''}
                ></input>
                <button onClick = {this.handleButtonClick}> 검증하기 </button>
            </div>
        )
    }
}

export default ValidationSample;
```

```input``` 에서는 onChange 이벤트가 발생하면 handleChange를 호출하여 ```state```의 ```password``` 값을 데이트하게 했습니다.
```button``` 에서는 ```onClick``` 이벤트가 발생하면 ```handleButtonClick```을 호출하여 ```Clicked``` 값을 참으로 설정했고, ```validated```값을 검증 결과로 설정했습니다.

### App 컴포넌트에서 예제 컴포넌트 렌더링

추후 App 컴포넌트에서 ref를 사용할 것이기 때문에 클래스형 컴포넌트로 작성했습니다.
```
import React, {Component} from 'react';
import ValidationSample from './ValidationSample';

class App extends Component {
  render() {
    return(
      <ValidationSample/>
    );
  }
}

export default App;

```

### DOM을 꼭 사용해야 하는 상황

앞 예제에서는 State를 사용하여 우리에게 필요한 기능을 구현했지만, 가끔 ```state```만으로 해결할 수 없는 기능이 있습니다.
다음과 같습니다
- 특정 ```input```에 포커스 주기
- 스크롤 박스 조작하기
- ```Canvas``` 요소에 그림 그리기 등

이때는 어쩔 수 없이 DOM 에 직접적으로 접근해야 하는데, 이를위해 바로 ```ref```를 사용합니다.

[목차로 돌아가기](#index)

## ref사용

```ref```를 사용하는 방법은 두가지입니다

### 콜백 함수를 통한 ref 설정

```ref```를 달고자 하는 요소에 ```ref``` 라는 콜백함수를 ```props```로 전달해 주면 됩니다.
이 콜백 함수는 ```ref```값을 파라미터로 전달받습니다. 그리고 함수 내부에서 파라미터로 받은 ```ref```를 컴포넌트의 멤버 변수로 설정해 줍니다.

>콜백함수 사용 예시
```
<input ref={(ref)=> {this.input=ref}} />
```
이렇게 하면 앞으로 this.input은 input 요소의 DOM을 가리킵니다. ref의 이름은 원하는 것으로 자유롭게 지정할 수 있습니다. DOM 타입과 관계없이
this.superman = ref 처럼 마음대로 지정합니다.

### createRef를 통한 ref 설정

ref를 만드는 또 다른 방법은 리액트에 내장되어 있는 createRef라는 함수를 사용하는 것입니다.
이 함수를 사용해서 만들면 더 적은 코드로 쉽게 사용할 수 있습니다.

예시코드를 한번 살펴봅시다.

```
import React, { Component } from 'react';

class RefSample extends Component {
    input = React.createRef();

    handleFocus = () =>{
        this.input.current.focus();
    }

    render() {
        return(
            <div>
                <input ref = {this.input} />
            </div>
        );
    }
}


export default RefSample;
```
- create ref를 사용하여 ref를 만들려면 우선 컴포넌트 내부에서 멤버 변수로 React.createRef() 를 담아 주어야 합니다. 
- 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 ref 설정이 완료됨.
- ref를 설정해준 DOM에 접근하려면 ```this.input.current```를 조회하면 된다. 

 지금까지 두 가지의 ref 를 사용하는 방법에 대해서 알아보았다. 자신이 편한방법을 사용하세요.

### 적용

#### input에 ref 달기

앞서 배운 대로 콜백 함수를 사용하여 ValidationSample.js 컴포넌트에도 ref를 담아보겠다.
>ValidationSample.js의 input 요소
```
<input
    ref={(ref) =>this.input=ref}
    />
```

#### 버튼 onClick 이벤트 코드 수정

버튼에서 ```onClick``` 이벤트가 발생할 때 ```input```에 포커스를 주도록 코드를 수정해 보세요.
```this.input```이 컴포넌트 내부의 ```input``` 요소를 가리키고 있으니, 일반 DOM을 다루듯이 코드를 작성하면 됩니다.

>ValidationSample.js - handlingButtonClick 메서드
```
handleButtonClick = () =>{
    this.setState({
        clicked:true,
        validated:this.state.password === '0000'
    });
    this.input.focus();
}
```


[목차로 돌아가기](#index)
## ref컴포넌트

> 컴포넌트에 ref 달기
- 리액트에서는 컴포넌트에도 ref를 달 수 있습니다.

이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 씁니다. 컴포넌트에 ref를 다루는 방법은 DOM에 ref를 다는방법과 똑같습니다.

### 사용법
```
<MyComponent
 ref={(ref)=>{this.myComponent=ref}}
>
```

이렇게 접근하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다. 즉, 내부의 ref에도 접근할 수 있습니다.(예: myComponent.handleClick, myComponent.input등 )
이번에는 스크롤 박스가 있는 컴포넌트 하나를 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행해 보겠습니다.

### 컴포넌트 초기 설정

먼저 ScrollBox라는 컴포넌트 파일을 만들겠습니다. JSX의 인라인 스타일링 문법으로 스크롤 박스를 만들어 보세요. 그 다음에는 최상위 DOM에 ref를 달아주세요.

#### 컴포넌트 파일 생성
```
import React, {Component} from 'react';

class ScrollBox extends Component {
    render() {
        const style = {
            border : '1px solid black',
            height : '300px',
            width : '300px',
            overflow : 'auto',
            position : 'relative'
        };

        const innerStyle = {
            width : '100%',
            height : '650px',
            background : 'linear-gradient(white, black)'
        }

        return (
            <div
                style ={style}
                ref={(ref)=> {this.box = ref}}>
                <div style={innerStyle}/>
                </div>
        );
    }
}

export default ScrollBox;
```

#### App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링

```
import React, {Component} from 'react';
import ScrollBox from './components/ScrollBox';

class App extends Component {
  render() {
    return(
      <div>
      <ScrollBox />
      </div>
    );
  }
}

export default App;
```

### 컴포넌트에 메서드 생성

컴포넌트에 스크롤바를 맨 아래쪽으로 내리는 메서드를 만들겠습니다. 자바스크립트로 스크롤바를 내릴떄는 DOM 노드가 가진 다음 값들을 사용합니다.
- scrollTop : 새로운 스크롤바 위치(0 ~ 350)
- scrollHeight : 스크롤이 있는 박스 안의 div 높이(650)
- clientHeight : 스크롤이 있는 박스의 높이(300)

스크롤바를 맨 아래쪽으로 내리려면 scrollHeight 에서 clientHeight 높이를빼면 되겠지요?
>scrollBox.js
```
import React, {Component} from 'react';

class ScrollBox extends Component {
    scrollToBottom = () =>{
        const {scrollHeight, clientHeight} = this.box;
        /* 앞 코드에는 비 구조화 할당 문법을 사용했습니다. 
        다음 코드와 같은 의미 입니다.
        const scrollHeight = this.box.scrollHeight;
        const clientHeight = this.box.clientHeight;
         */
        this.box.scrollTop = scrollHeight - clientHeight;
    }
    render() {
        const style = {
            border : '1px solid black',
            height : '300px',
            width : '500px',
            overflow : 'auto',
            position : 'relative'
        };

        const innerStyle = {
            width : '100%',
            height : '1000px',
            background : 'linear-gradient(white, black)'
        }

        return (
            <div
                style ={style}
                ref={(ref)=> {this.box = ref}}>
                <div style={innerStyle}/>
                </div>
        );
    }
}

export default ScrollBox;
```

scrollToBottom 메서드의 첫 번째 줄에서는 ES6의 비구조화 할당 문법을 사용했습니다. 이렇게 만든 메서드는 부모 컴포넌트인 App 컴포넌트에 ScrollBox에 ref를 달면 사용할 수 있습니다.

### 컴포넌트에 ref 달고 내부 메서드 사용

```
import React, {Component} from 'react';
import ScrollBox from './components/ScrollBox';

class App extends Component {
  render() {
    return(
      <div>
      <ScrollBox ref={(ref)=> this.scrollBox = ref }/>
      <button onClick= {()=> this.scrollBox.scrollToBottom()}>
        맨 밑으로
      </button>
      </div>
    );
  }
}

export default App;
```


[목차로 돌아가기](#index)
## 정리

컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용합니다 먼저 ref를 사용하지 않고도 원하는 기능을 구현 할 수 있는지 반드시 고려한 후에 활용하세요.
이 시점에서 오해할 수 있는 부분이 있는데. 서로 다른 컴포넌트 끼리 데이터를 교류할때 ref를 사용한다면 이는 잘못 사용된 것입니다. 물론 할 수는 있습니다. 컴포넌트에 ref를 달고 그 ref를다른 컴포넌트로 전달하고 .... 다른 컴포넌트에서 ref로 전달 받은 컴포넌트의 메서드를 실행하고... 하지만 이 방법은 리액트 사상에 어긋난 설계입니다. 앱 규모가 커지면 마치 스파게티 처럼 구조가 꼬여 버려서 유지 보수가 불가능합니다. 컴포넌트끼리 데이터를 교류할때는 언제나 데이터를 부모 <-> 자식 흐름으로 교류해야 합니다. 나중에 리덕스 혹은 Context API를 사용하여 효율적으로 교류하는 방법을 배울것입니다. 아직 함수형 컴포넌트에서 ref를 사용하는 것은 배우지 않았는데요. 함수형 컴포넌트에서는 useRef 라는 Hook 함수를 사용합니다. 사용법은 이 장에서 배운 React.createRef와 유사합니다. 

[목차로 돌아가기](#index)