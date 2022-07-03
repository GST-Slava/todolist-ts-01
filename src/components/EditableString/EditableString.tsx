import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableStringPropsType = {
    title: string
    changeTitle: (editedTitle: string) => void
}

const EditableString: React.FC<EditableStringPropsType> = ({title, changeTitle}) => {
    const [text, setText] = useState(title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onChangeSetText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onKeyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(text)
    }
    return (
        editMode
            ? <input
                value={text}
                onChange={onChangeSetText}
                onKeyDown={onKeyDownChangeTitle}
                onBlur={offEditMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};

export default EditableString;