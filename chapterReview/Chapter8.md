# Chapter 8 Hooks

## index

-    [커스텀 Hooks 만들기](#customHook)



## customHook

커스텀훅 
- 반복되는 로직
- 비슷한 코드
- 코드 재사용

### useReducer로 작성했던 Info.js
```js
import React, { useReducer} from 'react';

function reducer(state, action){
    return{
        ...state,
        [action.name]: action.value
    };
}
const Info = () =>{
    const [state,dispatch] = useReducer(reducer, {
        name: '',
        nickname: ''
    });

    const {name,nickname} = state;
    const onChange = e =>{
        dispatch(e.target);
    };
    return(
        <div>
            <div>
                <input name="name" value = {name} onChange={onChange} />
                <input name="nickname" value = {nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b> 이름 :</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```
커스텀 Hooks를 만들때에는 보통 ```use```라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성.

커스텀 Hooks를 만드는 방법은 ```useState```, ```useEffect```, ```useReducer```, ```useCallback``` 등 Hooks를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해 주면 된다.

### useInputs.js

```js
import {useReducer} from 'react';

function reducer(state,action){
    return {
        ...state,
        [action.name]:action.value
    };
}

export default function useInputs(initialForm) {
    const[state,dispatch] = useReducer(reducer, initialForm);
    const onChange = e =>{
        dispatch(e.target);
    };
    return [state, onChange];
}
```


### Info.js

```js
import React from 'react';
import useInputs from './useInputs';


const Info = () =>{
    const [state, onChange] = useInputs({
        name:'',
        nickname:''
    });
    const {name, nickname} = state;
    
    return(
        <div>
            <div>
                <input name="name" value = {name} onChange={onChange} />
                <input name="nickname" value = {nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b> 이름 :</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```