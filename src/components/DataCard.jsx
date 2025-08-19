import React from 'react';

const DataCard = ({title, value}) => {

    return (
        <div className="data-card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
}

export default DataCard; 