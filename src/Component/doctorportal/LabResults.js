import React from 'react';
import { FaFlask } from 'react-icons/fa'; // Import icon from react-icons
import './LabResults.css'; // Import CSS for styling

const labResults = [
    { name: 'X-Ray-John Smith', date: '06/01/2020' },
    { name: 'Allergen-Specific IgE', date: '06/01/2020' },
    { name: 'Nasal Endoscopy', date: '06/01/2020' },
    { name: 'CT-John Smith', date: '06/01/2020' },
    { name: 'X-Ray-John Smith', date: '06/01/2020' },
    { name: 'Allergen-Specific IgE', date: '06/01/2020' },
    { name: 'Nasal Endoscopy', date: '06/01/2020' },
    { name: 'CT-John Smith', date: '06/01/2020' },
];

const LabResults = () => {
    return (
        <div className="lab-results">
            <div className="lab-results-header">
                <h3>Lab Results</h3>
                <FaFlask className="action-icon" />
            </div>
            <ul className="lab-results-list">
                {labResults.map((result, index) => (
                    <li key={index} className="lab-result-item">
                        <div className="result-info">
                            <FaFlask className="result-icon" />
                            <span className="result-name">{result.name}</span>
                        </div>
                        <span className="result-date">{result.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LabResults;
