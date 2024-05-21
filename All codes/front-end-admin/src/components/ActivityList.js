// src/components/ActivityList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/activities`);
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container">
      <h2>Activity List</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity._id}>
            <strong>Type:</strong> {activity.type}<br />
            <strong>Project ID:</strong> {activity.projectId}<br />
            <strong>User:</strong> {activity.user}<br />
            <strong>Details:</strong> {JSON.stringify(activity.details)}<br />
            <strong>Timestamp:</strong> {new Date(activity.timestamp).toLocaleString()}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;
