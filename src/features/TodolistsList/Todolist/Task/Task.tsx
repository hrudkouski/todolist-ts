import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TasksType} from "../../../../api/todoList-api";

export type TasksPropsType = {
    task: TasksType
    removeTask: (taskID: string, todoListID: string) => void
    todoListID: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    disabled?: string
}

export const Task = React.memo((props: TasksPropsType) => {

    const {
        task,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        todoListID,
        disabled,
    } = props;

    const removeTaskHandler = useCallback(() => removeTask(task.id, todoListID), [task.id, todoListID, removeTask])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(task.id,
                newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
                todoListID)
        }, [task.id, todoListID, changeTaskStatus]
    )

    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todoListID)
    }, [task.id, todoListID, changeTaskTitle])

    return (
            <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
                color={'primary'}
            />
            <EditableSpan
                disabled={disabled === 'loading'}
                changeTitle={changeTaskTitleHandler}
                value={task.title}/>
            <IconButton
                disabled={disabled === 'loading'}
                onClick={removeTaskHandler}
            >
                <Delete/>
            </IconButton>
        </div>
    )
})