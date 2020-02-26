import React, {useState} from 'react';
//import Counter from './components/Counter';
import SassComponent from './components/SassComponent';

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
      {visible && <SassComponent />}
    </div>
  
  );
};

export default App;