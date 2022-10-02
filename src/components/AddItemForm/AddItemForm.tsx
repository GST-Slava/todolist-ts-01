import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {PlaylistAdd} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    console.log('AddItemForm called')
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField
                label={'Title'}
                size={'small'}
                color={'primary'}
                variant={'outlined'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                error={error}
                helperText={error && 'Title is required!'}

            />
            <IconButton
                color={'primary'}
                onClick={onClickAddItem}>
                <PlaylistAdd/>
            </IconButton>
            {/*<button onClick={onClickAddItem}>+</button>*/}
            {/*{error && <div style={{color: 'red', fontWeight: 'bold'}}>Title is required!</div>}*/}
        </div>
    );
});

