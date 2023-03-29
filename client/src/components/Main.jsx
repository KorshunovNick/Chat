import React from 'react';
import { useState } from 'react';
import styles from '../style/Main.module.css'
import { Link } from 'react-router-dom'
import logo from '../style/img/spy.png'

const FIELDS = {
    name : 'name',
    room: 'room'
}

const Main = ()=>{

    const {name,room} = FIELDS

    const [values,setValues] = useState({
        [name]: "",
        [room]:""
    });

    const changeChat =({target:{value,name}}) => {
        
        setValues({...values,[name]:value})
    }

console.log(values)

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}><em>Secter</em><img src={logo}/><b>chat</b></h1>
                <form className={styles.inputs}>
                    <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={values[name]}
                            placeholder='Your name'
                            onChange={changeChat}
                            autoComplete='off'
                        />
                    <label htmlFor="room">Room</label>
                        <input 
                            type="text"
                            name='room'
                            value={values[room]}
                            placeholder='Change room'
                            onChange={changeChat}
                            autoComplete='off'
                        />
                    </form>
                <Link to={`/chat?name=${values[name]}?room=${values[room]}`}>
                <button className={styles.button}>JOIN</button>
                </Link>
                
                </div>
        </div>
    )
}
export default Main