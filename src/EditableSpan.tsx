import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanType) {

    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title);
    }

    const onPressEnterOffEditMode = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        editMode
            ? <TextField
                onChange={onChangeTitle}
                value={title}
                onBlur={offEditMode}
                onKeyPress={onPressEnterOffEditMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}