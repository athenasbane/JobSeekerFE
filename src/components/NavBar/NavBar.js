import React from 'react';

import DropDown from '../DropDowns/DropDown';
import logo from '../../assets/img/logo.png';

const navBar = (props) => (
    <nav className="navbar is-light mb-3" role="navigation" aria-label="main navigation">
        <div className="navbar-start">
            <div className="columns multiline is-mobile mt-1">
                <div className="column is-3">
                    <figure style={{justifyContent: "center"}} className="image is-centered is-96x96">
                        <img className="mb-3" src={logo} alt="logo" />
                    </figure>
                </div>
                <div className="column">
                    <div style={{borderLeft: "3px solid black"}} >
                        <h1 className="title is-1 ml-3">Job Seeker</h1>
                        <p className="subtitle is-5 ml-3">Simplify your job search</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="navbar-end">
            <div className="navbar-item">
                <div className="is-centered">
                    {props.userAuthed ? (
                        <DropDown 
                            addJobModalOpenHandler={props.addJobModalOpenHandler}
                            addJobModalOpen={props.addJobModalOpen}

                            userDropDown={props.userDropDown}
                            userDropDownHandler={props.userDropDownHandler}

                            userJobsModalOpenHandler={props.userJobsModalOpenHandler}
                            userJobsModalOpen={props.userJobsModalOpen}

                            logoutHandler={props.logoutHandler}
                        />
                    ) : (
                    <button  
                        onClick={props.loginModalOpenHandler} 
                        style={{width: "100%"}} 
                        className={"button is-primary mb-1"}
                    >Login</button>)}
                    <button 
                        style={{width: "100%"}} 
                        onClick={props.aboutModalOpenHandler} 
                        className="button is-info">About
                    </button>
                    
                </div>
            </div>
        </div>
    </nav>
);

export default navBar;
