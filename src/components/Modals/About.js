import React from 'react';

import logo from '../../assets/img/logo.png';

const about = (props) => (
    <div className={props.aboutModalOpen ? "modal is-active" : "modal"}>
        <div onClick={props.aboutModalOpenHandler} className="modal-background"></div>
            <div style={{width: "90%"}} className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">About This Site</p>
                    <button onClick={props.aboutModalOpenHandler} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                <div className="columns multiline is-mobile mt-1">
                    <div className="column is-2">
                        <figure style={{justifyContent: "center"}} className="image is-centered is-96x96 is-square-mobile">
                            <img className="mb-3" src={logo} alt="logo" />
                        </figure>
                    </div>
                    <div className="column is-10 is-hidden-mobile">
                        <div style={{borderLeft: "3px solid black"}} >
                            <h1 className="title is-1 ml-3 is-size-5-mobile">Job Seeker</h1>
                            <p className="subtitle is-5 ml-3 is-size-7-mobile">Simplify your job search</p>
                        </div>
                    </div>
            </div>
                    <h2 className="title is-4">Why did you make this?</h2>
                    <p className="content">
                    Due to the “unprecedented times” we find ourselves in at the moment I found myself for the first time, in a long time, searching for my next role. While searching across the main job boards I found myself spending increasing amount of time searching through irrelevant	jobs because some of the job board providers do not allow title searches or, their search functionality is not strict enough. 
                    </p>
                    <p className="content">
                    After spending an hour a day of this I decided that I could shrink this time down to a couple of minutes if I had the ability to pull all the boards into one place. This coincided with me spending my new found empty diary with learning to code.
                    </p>
                    <h2 className="title is-4">What is this app for?</h2>
                    <p className="content">
                        I have two main aims for this app:
                    </p>
                    <div className="content">
                        <ol type="1">
                            <li>Make it less time consuming for jobseekers to find relevant roles during this time.</li>
                            <li>A place to track jobs you have applied for so you can chase or track lagging applications.</li>
                        </ol>
                    </div>
                    <h2 className="title is-4">Feature road map</h2>
                    <div className="content">
                        <ol type="1">
                            <li>Daily/weekly email reports for jobs from saved searches.</li>
                            <li>Adding custom jobs.</li>
                            <li>Additional job boards to be added.</li>
                            <li>Chrome extension for adding job boards and maybe even auto tracking applications (no promises).</li>
                            <li>Statics for application wait times to keep track of chasing / result of applications i.e. Interviews etc.</li>
                        </ol>
                    </div>
                    <h2 className="title is-4">How was this built?</h2>
                    <p className="content">
                        <strong>MERN Stack:</strong> (MongoDB, Express.js, React.js, Node.js) 
                    </p>
                    <div className="columns is-centered">
                        <div className="column">
                            <figure className="image is-128x128">
                                <img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" alt="mongodb" />
                            </figure>
                        </div>
                        <div className="column">
                            <figure className="image is-128x128">
                                <img src="https://expressjs.com/images/express-facebook-share.png" alt="node" />
                            </figure>
                        </div>
                        <div className="column">
                            <figure className="image is-128x128">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react" />
                            </figure>
                        </div>
                        <div className="column">
                            <figure className="image is-128x128">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="node" />
                            </figure>
                        </div>
                    </div>
                    
                    <p className="content">
                        <strong>GitHub Repos:</strong> 
                    </p>
                    <p className="content">
                        <a href="https://github.com/athenasbane/JobseekerAppBE">API </a>
                        | 
                        <a href="https://github.com/athenasbane/JobSeekerFE"> React</a>
                    </p>
                    <p className="content">
                        <strong>Contact:</strong> <a href="mailto:enquires@artemis.works">enquires@artemis.works</a> 
                    </p>
                    <p className="content">
                        I hope you enjoy the site!
                    </p>
                    <p className="content">
                        <strong>Ben</strong>
                    </p>
                </section>
            </div>
    </div>
);

export default about;