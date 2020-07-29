import React from 'react';

import Login from '../LoginRegister/Login/Login';
import Register from '../LoginRegister/Register/Register';
import BoardTicks from '../BoardTicks/BoardTicks';
import DropDown from '../DropDowns/DropDown';

const Header = (props) => (
    <header className="is-centered mb-2">
        <div className="columns">
            <div className="column is-one-third">
                <div className="box" style={{height: "100%"}}>
                    <h1 className="title is-1">Job Searcher</h1>
                    <p className="subtitle is-5">Simplify your job search</p>
                    <div className="columns">
                        <div style={{ width: "100%" }} className="column is-one-half">
                            {props.userAuthed ? (
                                <DropDown 
                                    userDropDown={props.userDropDown}
                                    userDropDownHandler={props.userDropDownHandler}

                                    userJobsModalOpenHandler={props.userJobsModalOpenHandler}
                                    userJobsModalOpen={props.userJobsModalOpen}

                                    logoutHandler={props.logoutHandler}
                                />) : (<button  
                                onClick={props.loginModalOpenHandler} 
                                style={{width: "100%"}} 
                                className={"button is-primary"}
                                >Login</button>)}
                        </div>
                        <div className="column is-one-half">
                            <button style={{width: "100%"}} onClick={props.aboutModalOpenHandler} className="button is-info">About</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={props.loginOpen ? "modal is-active" : "modal"}>
                <div onClick={props.loginModalOpenHandler} className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            {props.loginNotRegister ? <p className="modal-card-title">Login</p> : 
                            <p className="modal-card-title">Register</p>}
                            <button onClick={props.loginModalOpenHandler} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            {props.loginNotRegister ? (<Login 
                                loginEmailChangeHandler={props.loginEmailChangeHandler}
                                loginPasswordChangeHandler={props.loginPasswordChangeHandler}
                                loginSubmitHandler={props.loginSubmitHandler}
                                loginRegisterBtnHandler={props.loginRegisterBtnHandler}
                                loginError={props.loginError}
                            />) : (<Register 
                                registerError={props.registerError}
                                registerEmailChangeHandler={props.registerEmailChangeHandler}
                                registerPasswordChangeHandler={props.registerPasswordChangeHandler}
                                registerPasswordRepeatChangeHandler={props.registerPasswordRepeatChangeHandler}
                                registerSubmitHandler={props.registerSubmitHandler}
                                registerLoginBtnHandler={props.registerLoginBtnHandler}
                                registerMessageDismissHandler={props.registerMessageDismissHandler}
                            />)}
                        </section>
                    </div>
                </div>
            <div className="column is-two-thirds">
                <div className="box">
                    <form onSubmit={(e) => props.searchSubmitHandler(e)} style={{margin: "10px"}}>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input is-primary" 
                            onChange={(e) => props.searchTitleChangeHandler(e)} 
                            placeholder="Title Search"/>
                        </div>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input is-primary" 
                            onChange={(e) => props.searchLocationChangeHandler(e)}  
                            placeholder="Location Search"/>
                        </div>
                        <div className="field is-grouped">
                            <div className="select is-primary">
                                <select onChange={(e) => props.searchTimeScaleChangeHandler(e)}>
                                    <option>1 Day</option>
                                    <option>3 Days</option>
                                    <option>1 Week</option>
                                    <option>2 Weeks</option>
                                    <option>4 Weeks</option>
                                </select>
                            </div>
                            <div className="select is-primary">
                                <select onChange={(e) => props.searchRadiusChangeHandler(e)}>
                                    <option>1 Mile</option>
                                    <option>5 Miles</option>
                                    <option>10 Miles</option>
                                    <option>15 Miles</option>
                                    <option>20 Miles</option>
                                </select>
                            </div>
                            <button type="submit" 
                                className={props.searchButtonClasses} 
                                style={{width: "100%"}} 
                                value="Search">Search</button>
                        </div>
                    </form>
                    <BoardTicks 
                        boards={props.boards}
                    /> 
                </div>
            </div>
        </div>
    </header>
);

export default Header;