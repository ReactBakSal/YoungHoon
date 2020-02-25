import React, {useState} from 'react';
//import Counter from './components/Counter';
import Average from './components/Average'

const App = () =>{
  const [visible, setVisible] = useState(true);
  return(
    <div>
      <button
        onClick={()=> {
          setVisible(!visible);
        }}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <Average />}
    </div>
  
  );
};

export default App;