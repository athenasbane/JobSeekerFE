import React from 'react';

const login = (props) => (
    <form onSubmit={props.loginSubmitHandler}>
        <div className="field">
            <div className="control">
                <input onChange={(e) => props.loginEmailChangeHandler(e)} className="input" type="email" placeholder="Email"/>
                <input onChange={(e) => props.loginPasswordChangeHandler(e)} className="input" type="password" placeholder="Password"/>
            </div>
        </div>
        <div className="control is-grouped">
            <input className="button is-primary mr-3" type="submit" value="Submit" />
            <button onClick={props.loginRegisterBtnHandler} className="button is-info"> Register</button>
        </div>
        
    </form>
);

export default login;