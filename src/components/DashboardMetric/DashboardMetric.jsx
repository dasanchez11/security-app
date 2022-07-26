import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardMetric = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-Light">
      <p className="text-gray-600 uppercase text-xs">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </p>
      <p className="text-3xl text-Main font-bold">{value}</p>
    </div>
  );
};

export default DashboardMetric;