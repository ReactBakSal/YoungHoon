import React, {useState, useMemo, useCallback, useRef} from 'react';

const getAverage = numbers =>{
    console.log('평균값 계산 중..');
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((a,b) => a+b);
    return sum/ numbers.length;
};

const Average = () =>{
    const [list ,setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);

    const onChange = useCallback(e =>{
        setNumber(e.target.value);
    }, []); //컴포넌트가 처음 렌더링 될 때만 함수 생성.
    const onInsert = useCallback(()=>{   // useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째는 배열을 넣음 이 배열에는 어떤 값이 바뀌었을때 함수를 새로 생성해야하는지 명시해야함
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus();
    }, [number, list]);
    
    const avg = useMemo(()=> getAverage(list),[list]);
    return(
        <div>
            <input value = {number} onChange = {onChange} ref={inputEl} />
            <button onClick = {onInsert}>등록</button>
            <ul>
                {list.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b> {avg}
            </div>
        </div>
    );
}
export default Average;