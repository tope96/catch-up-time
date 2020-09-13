import React, { useState } from 'react';
import '../styles/todoStyle.css'
import Task from './Task';
import { useTranslation } from 'react-i18next';

const Todo = () => {
    const [collapseIcon, setCollapseIcon] = useState(true);
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [todoInput, setTodoInput] = useState("");
    const [t, i18n] = useTranslation();

    const handleSubmit = (event) => {
        let newTodoList = [...todoList, {title: event.target.todoInputName.value, description: "", completed: false}];
        event.preventDefault();
        setTodoInput("");
        setTodoList(newTodoList);
        localStorage.setItem('tasks', JSON.stringify(newTodoList));
    }

    const completeTodo = (index) => {
        const newTodoList = [...todoList];
        todoList[index].completed = !todoList[index].completed;
        setTodoList(newTodoList);
        localStorage.setItem('tasks', JSON.stringify(newTodoList));
    }

    const removeTodo = (index) => {
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
        localStorage.setItem('tasks', JSON.stringify(newTodoList));
    }

    const editTodo = (index, title, description) => {
        const newTodoList = [...todoList];
        todoList[index].title = title;
        todoList[index].description = description;
        setTodoList(newTodoList);
        localStorage.setItem('tasks', JSON.stringify(newTodoList));
    }

    return(
        <div className="collapseButton">
            <p>
                <button className="roundButton" type="button" onClick={() => setCollapseIcon(!collapseIcon)} data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <i className={collapseIcon ? 'fa fa-chevron-down': 'fa fa-chevron-up'}></i>
                </button>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body container-fluid todoContainer">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>{i18n.t("toDo.title")}</h3>
                            <hr></hr>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="todoInput" className="col-sm-4 col-form-label">{i18n.t("toDo.inputTaskLabel")}:</label>
                                        <div className="col-sm-6">
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="todoInput"
                                            name='todoInputName'
                                            value={todoInput}
                                            onChange={e => setTodoInput(e.target.value)}
                                            placeholder={i18n.t("toDo.inputTaskHint")}
                                            required
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
                                            edit={editTodo}
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