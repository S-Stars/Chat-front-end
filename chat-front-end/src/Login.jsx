import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000')

export const Login = () => {
    const [loggedIn, setLogIn] = useState(false)
    const [username, changeUsername] = useState('')
    const [message, setMessage] = useState('')
    useEffect(()=> {
        socket.on('userStatus',(data)=> {
            setLogIn(data);
            if(!data){
                setMessage('user name has been taken')
            }
        })
        return () => {
            socket.off('userID')
        }
    })

    const onSubmit = (event) => {
        event.preventDefault();
        if(username === '') {return setMessage('user name is empty please fill in an user name')}
        socket.emit('join',username)
    }

    const inputOnChange = (event) => {
        event.preventDefault();
        const inputName = event.target.value;
        changeUsername(inputName)
    }

    return(
        <>
        {loggedIn? <Redirect to='/chat'></Redirect>:
        <div>
        <h1>My Chat App</h1>
            <label>Enter an username</label>
            <input type='text' name='username' onChange={inputOnChange}/>
            <button onClick={onSubmit}>Submit Username</button>
            <p>{message}</p>
        </div>}
        </>
    )
}