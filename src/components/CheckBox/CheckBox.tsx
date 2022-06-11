import React, {ChangeEvent} from "react";

type PropsType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

export const CheckBox = (props: PropsType) => {

    const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }

    return (
        <input type='checkbox' checked={props.isDone}
               onChange={changeIsDoneHandler}/>
    );
};