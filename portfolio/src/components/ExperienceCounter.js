import React, { useState, useEffect } from 'react';

const calculateTimeUnits = (startDate) => {
    const now = new Date();
    const elapsed = now - startDate; // milliseconds since the start date

    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const days = Math.floor((elapsed / (1000 * 60 * 60 * 24)) % 365.25);
    const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365.25));

    return { years, days, hours, minutes, seconds };
};



const CircleTimer = ({ label, maxValue, value }) => {
    // Constants for size and strokeWidth
    const size = 60;
    const strokeWidth = 6;
    const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
    const progress = value / maxValue;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="circle-container">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="circle-background"
                    cx={size / 2}
                    cy={size / 2}
                    r={(size - strokeWidth) / 2}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="circle-progress"
                    cx={size / 2}
                    cy={size / 2}
                    r={(size - strokeWidth) / 2}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
                <text className="circle-timer-text" x="50%" y="50%" textAnchor="middle" dy=".3em">
                    {value}
                </text>
            </svg>
            <div className="circle-label">{label}</div>
        </div>
    );
};

function App() {
    const startDate = new Date('November 1, 2015');
    const [timeUnits, setTimeUnits] = useState(calculateTimeUnits(startDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUnits(calculateTimeUnits(startDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div>
            <CircleTimer label="Years" maxValue={100} value={timeUnits.years} />
            <CircleTimer label="Days" maxValue={365} value={timeUnits.days} />
            <CircleTimer label="Hours" maxValue={24} value={timeUnits.hours} />
            <CircleTimer label="Minutes" maxValue={60} value={timeUnits.minutes} />
            <CircleTimer label="Seconds" maxValue={60} value={timeUnits.seconds} />
        </div>
    );
}

export default App;
