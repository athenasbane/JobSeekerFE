import React from 'react';

const jobDropDown = (props) => (
    <div className={props.job.action ? "dropdown is-right is-active" : "dropdown"}>
        <div className="dropdown-trigger">
            <button 
                onClick={props.jobDropDownClickHandler} 
                className="button is-primary" 
                aria-haspopup="true" 
                aria-controls="dropdown-menu">
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
                <button onClick={() => props.jobSavedClickHandler(props.job.index)} style={{border: "none"}} className="button dropdown-item">
                Save
                </button>
                <button onClick={() => props.jobAppliedClickHandler(props.job.index)} style={{border: "none"}} className="button dropdown-item">
                Applied
                </button>
                {/* <button style={{border: "none"}} className="button dropdown-item">
                Active dropdown item
                </button>
                <button style={{border: "none"}} className="button dropdown-item">
                Other dropdown item
                </button> */}
            </div>
        </div>
    </div>
);

export default jobDropDown;