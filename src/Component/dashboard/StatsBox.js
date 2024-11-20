
import React from 'react';
import PropTypes from 'prop-types';
import './StatsBox.css';

const StatsBox = ({ color, imageSrc, title, count }) => {
    return (
        <div className="stats-box" style={{ backgroundColor: color }}>
            <div className="stats-icon">
                <img src={imageSrc} alt={title} />
            </div>
            <div className="stats-content">
                <div className="stats-title">
                    {title}
                </div>
                <div className="stats-count">
                    {count}
                </div>
            </div>
        </div>
    );
};

StatsBox.propTypes = {
    color: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default StatsBox;
