import React, { useEffect, useState } from 'react';
import "../App.css";

const ProgressComponent = ({ userCount }) => {
    const [progress, setProgress] = useState({ processed: 0, total: 0 });
    useEffect(() => {

        const eventSource = new EventSource(process.env.REACT_APP_API_URL + '/progress');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setProgress(data);
        };

        eventSource.onerror = (error) => {
            console.error('Error receiving progress updates:', error);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const percentage = (progress.total === 0) ? 0 : Math.round((progress.processed / progress.total) * 100);

    return (
        <div >
            <p>Processed {progress.processed} out of {progress.total || userCount}</p>
            <progress value={percentage} max="100"></progress>
        </div>
    );
};

export default ProgressComponent;
