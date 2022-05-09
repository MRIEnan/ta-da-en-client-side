import React, { useEffect, useState } from 'react';
import './App.css';
import Todos from './components/Todos';



function App() {
  interface ITodo {
    id: number;
    text: string;
    status: boolean;
  }
  const [isDel,setIsDel] = useState<boolean>(false);
  const [isR,setIsR] = useState<boolean>(false);
  const [todoArray,setTodoArray] = useState<ITodo[]>([]);
  useEffect(()=>{
    if(!window.localStorage.getItem("todoArray")){
      setTodoArray([
        {
          id: 0,
          text: "Hello, This is first todo",
          status: false,
        }
      ])
      window.localStorage.setItem("todoArray",JSON.stringify([
        {
          id: 0,
          text: "Hello, This is test todo",
          status: false,
        }
      ]));
    }
    const todoArrayIns = window.localStorage.getItem("todoArray");
    console.log('from frontend',todoArrayIns);
    if(todoArrayIns){
      console.log('hello');
      setTodoArray([...JSON.parse(todoArrayIns)]);
    }
    setIsR(true);
  },[]);

  
  useEffect(()=>{
    if(todoArray.length>0 && isR){
      window.localStorage.setItem("todoArray",JSON.stringify(todoArray))
    }
    if(todoArray.length==0 && isDel){
      window.localStorage.setItem("todoArray",JSON.stringify([]))
      setIsDel(false);
    }
  },[todoArray]);
  
  return (
    <div className="App">
      <Todos todoArray={todoArray} setIsDel={setIsDel} setTodoArray={setTodoArray}/>
    </div>
  );
}

export default App;
