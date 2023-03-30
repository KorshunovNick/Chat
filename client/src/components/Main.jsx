import React from 'react';
import { useState } from 'react';
import styles from '../style/Main.module.css'
import { Link } from 'react-router-dom'
import logo from '../style/img/spy.png'

const FIELDS = {
    NAME : 'name',
    ROOM: 'room',
}

const Main = ()=>{

    const {NAME,ROOM} = FIELDS

    const [values,setValues] = useState({
        [NAME]: "",
        [ROOM]:"",
    });

    const changeChat =({target:{value,name}}) => {
        
        setValues({...values,[name]:value})
    }

    const handleClick = (e)=>{
        const isDisabled = Object.values(values).some(val=>!val)
    
        if (isDisabled) e.preventDefault()
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}><em>Secter</em><img src={logo}/><b>talk</b></h1>
                <form className={styles.inputs}>
                    <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={values[NAME]}
                            placeholder='Your name'
                            onChange={changeChat}
                            autoComplete='off'
                        />
                    <label htmlFor="room">Room</label>
                        <input 
                            type="text"
                            name='room'
                            value={values[ROOM]}
                            placeholder='Change room'
                            onChange={changeChat}
                            autoComplete='off'
                        />
                    </form>
                <Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
                <button 
                className={styles.button}
                onClick = {handleClick}
                >JOIN</button>
                </Link>
                
                </div>
        </div>
    )
}
export default Main