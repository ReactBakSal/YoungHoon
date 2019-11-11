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
```button``` 에서는 ```onClick``` 이벤트가 발생하면 ```handleButtonClick```을 호출하여 ```Clicked``` 값을 참으로 설정했고, ```validated```값을 검증 결과로 설장했습니다.

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


## ref사용

```ref```를 사용하는 방법은 두가지입니다

### 콜백 함수를 통한 ref 설정

```ref```를 달고자 하는 요소에 ```ref``` 라는 콜백함수를 ```props```로 전달해 주면 됩니다.
이 콜백 함수는 ```ref```값을 파라미터로 전달받습니다. 그리고 함수 내부에서 파라미터로 받은 ```ref```를 컴포넌트의 멤버 변수로 설정해 줍니다.

>콜백함수 사용 예시
```
<input ref={(ref)=> {this.input=ref}} />
```


## 컴포넌트

## 정리