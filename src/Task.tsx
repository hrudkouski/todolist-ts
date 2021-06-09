import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./AppWithRedux";

export type TasksPropsType = {
    task: TasksType
    removeTask: (taskID: string, todoListID: string) => void;
    todoListID: string
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
}

export const Task = React.memo((props: TasksPropsType) => {

    const {
        task,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        todoListID,
    } = props;

    const removeTaskHandler = useCallback(() => removeTask(task.id, todoListID), [task.id, todoListID, removeTask])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todoListID), [task.id, todoListID, changeTaskStatus])

    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todoListID)
    }, [task.id, todoListID, changeTaskTitle])

    return (
        <div className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeHandler}
                color={'primary'}
            />
            <EditableSpan
                changeTitle={changeTaskTitleHandler}
                value={task.title}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete color="secondary"/>
            </IconButton>
        </div>
    )
})