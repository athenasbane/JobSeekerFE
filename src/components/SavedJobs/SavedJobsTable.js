import React from 'react';

const saveJobTable = (props) => {

    const dateSpliter = (date) => {
        const result = [];
        result.push(date.split('-')[2].split('T')[0], '-', date.split('-')[1], '-', date.split('-')[0]);

        return result;
    }

    let tableItems = (<tr><td>No Results</td></tr>)

    if(props.savedJobs.length !== 0) {
        tableItems = props.savedJobs.map((job, index) => {
            
            const date = dateSpliter(job.updatedAt);

            return (
            <tr key={job._id}>
                <td><strong><a className="is-size-7-mobile" href={props.link} target="_blank" rel="noopener noreferrer">{job.title}</a></strong></td>
                <td className="is-size-7-mobile">{job.company}</td>
                <td className="is-hidden-mobile">{job.location}</td>
                <td className="is-hidden-mobile">{job.source}</td>
                <td>{job.applied ? (<button 
                    className="button is-size-7-mobile">Applied</button>
                    ) : (
                    <button className="button is-size-7-mobile">Saved</button>
                    )}
                </td>
                    <td className="is-hidden-mobile">{date}</td>
            </tr>
        )});
    }


    return (
        <table className="table" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th className="is-hidden-mobile">Location</th>
                    <th className="is-hidden-mobile">Source</th>
                    <th>Status</th>
                    <th className="is-hidden-mobile">Last Update</th>
                </tr>
            </thead>
            <tbody>
                {tableItems}
            </tbody>
        </table>

    );
}

export default saveJobTable;