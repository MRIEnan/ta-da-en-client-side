import React, { useRef } from "react";
import {Grid,Button, Container, TextareaAutosize} from '@mui/material';

interface ITodo {
  id: number;
  text: string;
  status: boolean;
}
const Todos = ({todoArray,setTodoArray,setIsDel}:{
  todoArray: Array<{id:number;text:string;status:boolean}>;
  setTodoArray: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setIsDel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const newTodoRef = useRef<HTMLTextAreaElement>(null);
  
  const onAddTodo = () =>{
    if (newTodoRef.current?.value) {
      let todoId = 1;
      if(todoArray.length>0){
        todoId = todoArray[todoArray.length-1]['id']+1;
      }
      const addTodoInfo = { id: todoId, text: newTodoRef.current.value, status: false }
      setTodoArray([...todoArray,addTodoInfo]);
      newTodoRef.current.value = "";
    }
  };
  const onStatusChange = async (id: number, status: boolean) => {
    console.log('now status',status);
  

    todoArray.map(tAr => {
      if(tAr.id==id){
        tAr['status'] = status;
      }
    })
    setTodoArray([...todoArray]);
  };
  const onRemoveTodo = (id: number) => {
    setIsDel(true);
    const filteredArray = todoArray.filter(tdo => tdo.id != id);
    setTodoArray([...filteredArray]);
  };

  return (
    <div>
      <h2 style={{backgroundColor: '#f2f2f2', margin:'10px',padding:'10px'}}>Ta-Da</h2>
      <Grid container pt={5} spacing={3}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={3} style={{height: 'calc( 100vh - 100px)'}}>
          <TextareaAutosize ref={newTodoRef}
          style={{ width: 'calc(100% - 20px)', height: 'calc(90vh - 100px)'}}
          /><br/>
          <button onClick={onAddTodo}>Add</button>
        </Grid>
        {todoArray.length<1 && <div><h3>Please add task.</h3></div>}
        {todoArray.length>0 && <Grid item xs={12} sm={9} style={{height: 'calc( 90vh - 100px)', overflowX:'hidden',overflowY:'scroll',}}>
          {todoArray.map((todo, index) => (
            <Container style={{backgroundColor:'#d7d7d7',width: 'calc(100% - 10px)', margin:'5px',padding:'5px',border:'2px solid #2f2f2f'}} key={todo.id}>
              <h2 style={{wordWrap: 'break-word'}}>{todo.text}</h2>
              {todo.status ? <p>Completed</p> : <p>Not Completed</p>}
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button onClick={() => onRemoveTodo(todo.id)} variant="outlined" color="error">
                        Delete
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button onClick={() => onStatusChange(todo.id, !todo.status)} variant="contained" color="success">
                        {todo.status?'Not Completed':'Completed'}
                    </Button>
                  </Grid>
              </Grid>
            </Container>
          ))}
          
        </Grid>}
      </Grid>
    </div>
  );
};

export default Todos;
