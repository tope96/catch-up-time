import React from 'react';
import '../styles/taskStyle.css';

const Task = ({task, index, complete, remove}) => {

    return(
        <div className="row">
            <div className="col-lg-12">
                <div style={{ textDecoration: task.completed ? "line-through" : "" }}>
                    <li key={index} className={task.completed ? "list-group-item doneItem": "list-group-item"}>
                        <i className={task.completed ? 'fa fa-check doneIcon': 'fa fa-circle notDoneIcon'} onClick={() => {complete(index)}}> </i>
                            {task.title}
                        <i className="fa fa-trash removeIcon" onClick={() => remove(index)}></i>
                    </li>
                </div>
            </div>

        </div>
    );
}

export default Task;