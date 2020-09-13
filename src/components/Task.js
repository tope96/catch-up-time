import React, { useState } from 'react';
import '../styles/taskStyle.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Task = ({task, index, complete, remove, edit}) => {
    const [t, i18n] = useTranslation();
    const [titleInput, setTitleInput] = useState(task.title);
    const [descriptionInput, setDescriptionInput] = useState(task.description);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(task.title !== event.target.changedTitle.value || task.description !== event.target.changeddescription.value){
            edit(index, event.target.changedTitle.value, event.target.changeddescription.value);
        }
    }

    return(
        <div>
            <li key={index} className={task.completed ? "list-group-item doneItem": "list-group-item"}>
                <div className="row" style={{ textDecoration: task.completed ? "line-through" : "" }}>
                    <div className="col-sm-2 align icons">
                        <i className={task.completed ? 'fa fa-check doneIcon': 'fa fa-circle notDoneIcon'} onClick={() => {complete(index)}}> </i>
                    </div>
                    <div className="col-sm-7 align taskText">
                        <div className="row">
                            <div className="col-sm-12 align">
                                {task.title}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 align">
                                <div className="description">{task.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 align icons">
                        <i className="fa fa-trash removeIcon" onClick={() => remove(index)}></i>
                        <i className="fa fa-edit editIcon" data-toggle="modal" data-target={"#modal" + index} ></i>
                    </div>

                </div>
            </li>

                <div className="modal fade" id={"modal" + index} tabIndex="-1" role="dialog" aria-labelledby="EditTask" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditTask">{i18n.t("toDo.taskEdit")}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-sm-4 col-form-label">{i18n.t("toDo.nameEdit")}:</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="changedTitle"
                                            value={titleInput}
                                            onChange={(e) => setTitleInput(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="description" className="col-sm-4 col-form-label">{i18n.t("toDo.descEdit")}:</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="changeddescription"
                                            value={descriptionInput}
                                            onChange={(e) => setDescriptionInput(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">{i18n.t("close")}</button>
                                <button type="submit" className="btn btn-success" onClick={() => toast.success("✔ " + i18n.t("saved"), {autoClose: 1500})}><i className="fa fa-save"></i> {i18n.t("save")}</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Task;