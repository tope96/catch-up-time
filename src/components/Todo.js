import React, { useState } from 'react';
import '../styles/todoStyle.css'
import Task from './Task';

const Todo = () => {
    const [collapseIcon, setCollapseIcon] = useState(true);
    const [todoList, setTodoList] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodoList([...todoList, {title: event.target.todoInputName.value, completed: false}]);
        setTodoInput("");
    }

    const completeTodo = (index) => {
        const newTodoList = [...todoList];
        todoList[index].completed = !todoList[index].completed;
        setTodoList(newTodoList);
    }

    const removeTodo = (index) => {
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    return(
        <div className="collapseButton">
            <p>
                <button className="roundButton" type="button" onClick={() => setCollapseIcon(!collapseIcon)} data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <i className="fa fa-tasks"> </i>
                    <i className={collapseIcon ? 'fa fa-chevron-down': 'fa fa-chevron-up'}></i>
                </button>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body container-fluid todoContainer">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>To-do list</h3>
                            <hr></hr>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="todoInput" className="col-sm-4 col-form-label">Enter the task:</label>
                                        <div className="col-sm-6">
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="todoInput"
                                            name='todoInputName'
                                            value={todoInput}
                                            onChange={e => setTodoInput(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-sm-2">
                                        <button type="submit" className="btn btn-success addTask"><i className="fa fa-plus "></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row list">
                        <div className="col-lg-12">
                            <ul className="list-group">
                                {todoList.map((task, index) => (
                                    <div key={index}>
                                        <Task
                                            task={task}
                                            index={index}
                                            complete={completeTodo}
                                            remove={removeTodo}
                                        />
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Todo;