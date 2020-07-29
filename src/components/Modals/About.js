import React from 'react';

const about = (props) => (
    <div className={props.aboutModalOpen ? "modal is-active" : "modal"}>
        <div onClick={props.aboutModalOpenHandler} className="modal-background"></div>
            <div style={{width: "90%"}} className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">About This Site</p>
                    <button onClick={props.aboutModalOpenHandler} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <h2 className="title is-4">Why did I make this?</h2>
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
                            <li>Statics for application wait times to keep track of chasing / result of applications I.e. Interviews etc.</li>
                        </ol>
                    </div>
                    <h2 className="title is-4">How Was This Built?</h2>
                    <p className="content">
                        MERN stack: (MongoDB, Express.js, React.js, Node.js) 
                    </p>
                    <p className="content">
                        GitHub Repo Any help is greatly appreciated!
                    </p>
                    <p className="content">
                        Contact: enquires@artemis.works 
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