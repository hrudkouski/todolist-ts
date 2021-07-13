import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

    const {
        addItem,
        disabled = false
    } = props;

    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('')

    const onClickAddItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            addItem(trimmedTitle)
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        <div>
            <TextField
                size={'small'}
                disabled={disabled}
                value={title}
                onKeyPress={onKeyPressAddItem}
                onChange={onChangeTitle}
                error={!!error}
                label={'Title'}
                variant={"outlined"}
                helperText={error && 'Title is required'}
            />
            <IconButton
                disabled={disabled}
                color={'primary'}
                onClick={onClickAddItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})