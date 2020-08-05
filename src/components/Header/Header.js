import React from 'react';

import Login from '../LoginRegister/Login/Login';
import Register from '../LoginRegister/Register/Register';
import BoardTicks from '../BoardTicks/BoardTicks';

const Header = (props) => (
    <header className="is-centered mb-2  ml-0-mobile mr-0-mobile">
        <div className="columns ml-0-mobile mr-0-mobile">
            <div className="column is-three-fifths ml-0 mr-0">
                <div className="box ml-0-mobile mr-0-mobile" style={{height: "100%"}}>
                    <form 
                        onSubmit={(e) => props.searchSubmitHandler(e)} 
                        style={{margin: "10px"}}>
                        <div 
                            className="control">
                            <input 
                                type="text" 
                                className="input is-primary" 
                                onChange={(e) => props.searchTitleChangeHandler(e)} 
                                placeholder="Title Search"
                                value={props.searchTitle}
                            />
                        </div>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input is-primary" 
                                onChange={(e) => props.searchLocationChangeHandler(e)}  
                                placeholder="Location Search"
                                value={props.searchLocation}
                                />
                        </div>
                        <div className="field is-grouped">
                            <div className="select is-primary">
                                <select 
                                    value={props.searchTimeScale}
                                    onChange={(e) => props.searchTimeScaleChangeHandler(e)}>
                                    <option value="1 Day">1 Day</option>
                                    <option value="3 Days">3 Days</option>
                                    <option value="1 Week">1 Week</option>
                                    <option value="2 Weeks">2 Weeks</option>
                                    <option value="4 Weeks">4 Weeks</option>
                                </select>
                            </div>
                            <div className="select is-primary">
                                <select 
                                    value={props.searchRadius}
                                    onChange={(e) => props.searchRadiusChangeHandler(e)}>
                                    <option value="1 Mile">1 Mile</option>
                                    <option value="5 Miles">5 Miles</option>
                                    <option value="10 Miles">10 Miles</option>
                                    <option value="15 Miles">15 Miles</option>
                                    <option value="20 Miles">20 Miles</option>
                                </select>
                            </div>
                            <button 
                                type="submit" 
                                className={props.searchButtonClasses} 
                                style={{width: "100%"}} 
                                value="Search">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                    </div>
                    <div className="column is-two-fifths ml-0-mobile mr-0-mobile">
                        <div  style={{width: "100%", height: "100%"}} className="box ml-0-mobile mr-0-mobile">
                            <BoardTicks 
                                boards={props.boards}
                            />
                        </div>                                 
            </div>
            <div 
                className={props.loginOpen ? "modal is-active" : "modal"}>
                <div 
                    onClick={props.loginModalOpenHandler} 
                    className="modal-background">
                </div>
                    <div 
                        className="modal-card">
                        <header 
                            className="modal-card-head">
                            {props.loginNotRegister ? (<p className="modal-card-title">Login</p> 
                            ) : ( 
                            <p 
                                className="modal-card-title">
                                    Register
                            </p>
                            )}
                            <button 
                                onClick={props.loginModalOpenHandler} 
                                className="delete" 
                                aria-label="close">
                            </button>
                        </header>
                        <section className="modal-card-body">
                            {props.loginNotRegister ? (
                            <Login 
                                loginEmailChangeHandler={props.loginEmailChangeHandler}
                                loginPasswordChangeHandler={props.loginPasswordChangeHandler}
                                loginSubmitHandler={props.loginSubmitHandler}
                                loginRegisterBtnHandler={props.loginRegisterBtnHandler}
                                loginError={props.loginError}
                            />
                            ) : (
                            <Register 
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
        </div>
    </header>
);

export default Header;