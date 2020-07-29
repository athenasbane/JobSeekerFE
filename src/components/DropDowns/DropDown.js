import React from 'react';

const dropDown = (props) => (
    <div style={{ width: "100%" }} className={props.userDropDown ? "dropdown is-active" : "dropdown"}>
        <div className="dropdown-trigger">
            <button 
                style={{ width: "100%" }}
                onClick={props.userDropDownHandler} 
                className="button is-primary" 
                aria-haspopup="true" 
                aria-controls="dropdown-menu">
                <span>User Actions</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
                <button onClick={props.userJobsModalOpenHandler} style={{border: "none"}} className="button dropdown-item">
                    Saved/Applied Jobs
                </button>
                <button style={{border: "none"}} className="button dropdown-item">
                Active dropdown item
                </button>
                <button style={{border: "none"}} className="button dropdown-item">
                Other dropdown item
                </button>
                <hr className="dropdown-divider" />
                <button onClick={props.logoutHandler} style={{border: "none"}} className="button dropdown-item">
                Logout
                </button>
            </div>
        </div>
    </div>
);

export default dropDown;