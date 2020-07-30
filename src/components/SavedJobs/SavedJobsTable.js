import React from 'react';

const saveJobTable = (props) => {

    let tableItems = (<tr><td>No Results</td></tr>)

    if(props.savedJobs.length !== 0) {
        tableItems = props.savedJobs.map((job, index) => (
        <tr key={job._id}>
            <td><strong><a href={props.link} target="_blank" rel="noopener noreferrer">{job.title}</a></strong></td>
            <td>{job.company}</td>
            <td>{job.location}</td>
            <td className="is-hidden-mobile">{job.source}</td>
            <td className="is-hidden-mobile">{job.applied ? <button 
                className="button">Applied</button> : 
                <button className="button">Saved</button>}</td>
        </tr>
        ))
    }


    return (
        <table className="table" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th className="is-hidden-mobile">Source</th>
                    <th className="is-hidden-mobile">Status</th>
                </tr>
            </thead>
            <tbody>
                {tableItems}
            </tbody>
        </table>

    );
}

export default saveJobTable;