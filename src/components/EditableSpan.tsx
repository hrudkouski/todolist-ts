import React, {useState, ChangeEvent, KeyboardEvent, useCallback} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    value: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    const {
        value,
        changeTitle
    } = props;

    const [title, setTitle] = useState<string>(value)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onEditMode = useCallback(() => {
        setEditMode(true)
        changeTitle(value)
    }, [changeTitle, value])

    const offEditMode = useCallback(() => {
        setEditMode(false)
        changeTitle(title);
    }, [changeTitle, title])

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
            : <span onDoubleClick={onEditMode}>{value}</span>
    )
})