import React from 'react';
import './App.css'
import { useState } from 'react'

function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [editId, setEditID] = useState(0)

  const handleDelete = (id) => {
    setToDos(toDos.filter((toDos) => toDos.id !== id))
  };

  const addTodo = () => {
    if (toDo.trim() === '' || toDos.some((item) => item.text === toDo.trim())) {
      return;
    }
    setToDos([...toDos, { id: Date.now(), text: toDo, status: false }])
    setToDo('')
    if(editId){
      const editToDo = toDos.find((toDos)=>toDos.id === editId)
      const updateToDo = toDos.map((to)=>to.id === editToDo.id
      ? (to = {id : to.id , text : toDo})
      : (to = {id : to.id , text : to.text}))
      setToDos(updateToDo)
      setEditID(0)
      setToDo('')
    }
  }

  const onEdit = (id) => {
    const editTodo = toDos.find((toDos) => toDos.id === id)
    setToDo(editTodo.text)
    setEditID(editTodo.id)
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={addTodo} className={!editId ? 'fas fa-plus' : 'fas fa-pencil-alt'}></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {

          return (
            <div key={obj.id} className="todo">
              <div className="left">
                <input onChange={(e) => {
                  setToDos(toDos.filter(obj2 => {
                    if (obj2.id === obj.id) {
                      obj2.status = e.target.checked
                    }
                    return obj2
                  }))
                }} value={obj.status} type="checkbox" name="" id="" />
                <p className={obj.status ? 'list':''}>{obj.text}</p>
              </div>
              <div className="right">
                <i onClick={() => onEdit(obj.id)} className="fas fa-pencil-alt"></i>
                <i onClick={() => handleDelete(obj.id)} className="fas fa-times"></i>
              </div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App;
