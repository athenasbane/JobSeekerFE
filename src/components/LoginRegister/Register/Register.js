import React from 'react'; 

const register = (props) => (
    <form onSubmit={props.registerSubmitHandler}>
        <div className="field">
            {props.registerError.length === 0 ? null : (
            <article className="message is-danger">
                <div className="message-body">
                    {props.registerError}      
                    <button onClick={props.registerMessageDismissHandler} className="delete is-pulled-right" aria-label="delete"></button>  
                </div>
                
            </article>)}
            <div className="control">
                <input onChange={(e) => props.registerEmailChangeHandler(e)} type="email" className="input" placeholder="Email"/>
                <input onChange={(e) => props.registerPasswordChangeHandler(e)} type="password" className="input" placeholder="Password" />
                <input onChange={(e) => props.registerPasswordRepeatChangeHandler(e)} type="password" className="input" placeholder="Password Repeat" />
            </div>
            <div className="control is-grouped">
                    <input  type="submit" className="button is-primary mr-3 mt-3" value="Submit" />
                    <button onClick={props.registerLoginBtnHandler} className="button is-info mt-3">Login</button>
            </div>
        </div>
    </form>
)

export default register;