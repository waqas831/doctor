import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import './TopDoctors.css';

const TopDoctors = ({ doctors }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [sortOption, setSortOption] = useState('View All');
    const [sortedDoctors, setSortedDoctors] = useState(doctors || []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSort = (option) => {
        setSortOption(option);
        setDropdownOpen(false);

        let sortedList = [...(doctors || [])];
        if (option === 'Alphabetically') {
            sortedList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (option === 'By Reviews') {
            sortedList.sort((a, b) => b.reviews - a.reviews);
        }

        setSortedDoctors(sortedList);
    };

    return (
        <div className="top-doctors">
            <div className="top-doctors-header">
                <h2>Top Doctors</h2>
                <div className="filter-options">
                    <div className="dropdown">
                        <button className="filter-button" onClick={toggleDropdown}>
                            {sortOption} ⋮
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li onClick={() => handleSort('View All')}>View All</li>
                                <li onClick={() => handleSort('Popular')}>Popular</li>
                                <li onClick={() => handleSort('Most Reviewed')}>Most Reviewed</li>
                                <li onClick={() => handleSort('Alphabetically')}>Alphabetically</li>
                                <li onClick={() => handleSort('By Reviews')}>By Reviews</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <ul className="doctors-list">
                {(sortedDoctors || []).map((doctor, index) => (
                    <li key={index} className="doctor-item">
                        <div className="doctor-info">
                            <Avatar
                                name={doctor.name}
                                src={doctor.image} // Can be undefined or a valid URL
                                size="50" // Adjust the size as needed
                                round={true} // Makes the avatar round
                                className="doctor-avatar"
                            />
                            <div className="doctor-details">
                                <h3 className="doctor-name">{doctor.name}</h3>
                                <p className="doctor-specialization">{doctor.specialization}</p>
                            </div>
                        </div>
                        <div className="doctor-stats">
                            <p className="doctor-reviews">{doctor.reviews} Reviews</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TopDoctors.propTypes = {
    doctors: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string, // Make image optional
        specialization: PropTypes.string.isRequired,
        reviews: PropTypes.number.isRequired,
    })).isRequired,
};

export default TopDoctors;
