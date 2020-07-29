import React from 'react';

const BoardTicks = (props) => (
    <div style={{width: "100%"}}>
        <div className="columns">
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">Indeed</span>
                    <span className={props.boards.indeed ? "tag is-medium is-success" : "tag is-medium is-info"}>
                        <i className={props.boards.indeed ? "fa fa-check-circle" : "fa fa-bullseye"} aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">Reed</span>
                    <span className={props.boards.reed ? "tag is-medium is-success" : "tag is-medium is-info"}>
                        <i className={props.boards.reed ? "fa fa-check-circle" : "fa fa-bullseye"} aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">CV Library</span>
                    <span className={props.boards.cvlibrary ? "tag is-medium is-success" : "tag is-medium is-info"}>
                        <i className={props.boards.cvlibrary ? "fa fa-check-circle" : "fa fa-bullseye" } aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">Monster</span>
                    <span className={props.boards.monster ? "tag is-medium is-success" : "tag is-medium is-info"}>
                        <i className={props.boards.monster ? "fa fa-check-circle" : "fa fa-bullseye"} aria-hidden="true"></i>
                    </span>
                </div>
            </div>       
        </div>
    </div>
);

export default BoardTicks;