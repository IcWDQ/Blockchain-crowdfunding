document.addEventListener('DOMContentLoaded', function() {
    fetchProjects();
    fetchActivities();
    fetchMilestones();
  });
  
  function fetchProjects() {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('projects-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach((project, index) => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${project.projectId}</td>
            <td>${project.projectName}</td>
            <td>${project.projectType}</td>
            <td>${project.projectDescription}</td>
            <td>${project.creator}</td>
            <td>${project.fundingGoal}</td>
            <td>${project.amountRaised}</td>
            <td>${project.status}</td>
            <td>${project.contributors.join(', ')}</td>
            <td>${new Date(project.createdAt).toLocaleString()}</td>
            <td>${new Date(project.projectDDL).toLocaleString()}</td>
          `;
        });
      })
      .catch(error => console.error('Error fetching projects:', error));
  }
  
  function fetchActivities() {
    fetch('/api/activities')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('activities-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach((activity, index) => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${activity.type}</td>
            <td>${activity.projectId}</td>
            <td>${activity.user}</td>
            <td>${JSON.stringify(activity.details)}</td>
            <td>${new Date(activity.timestamp).toLocaleString()}</td>
          `;
        });
      })
      .catch(error => console.error('Error fetching activities:', error));
  }
  
  function fetchMilestones() {
    fetch('/api/milestones')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('milestones-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach((milestone, index) => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${milestone.projectId}</td>
            <td>${milestone.projectName}</td>
            <td>${milestone.milestoneId}</td>
            <td>${milestone.goal}</td>
            <td>${milestone.milestoneDescription}</td>
            <td>${milestone.otherDocuments}</td>
            <td>${milestone.milestonestatus}</td>
            <td>${new Date(milestone.milestoneDDL).toLocaleString()}</td>
          `;
        });
      })
      .catch(error => console.error('Error fetching milestones:', error));
  }
  