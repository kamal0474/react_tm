import React, { useState } from 'react';

const TaskList = ({ tasks, onUpdateTaskStatus, onDeleteTask }) => {
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const filteredTasks = tasks.filter(task => {
    if (filterAssignee && task.assignee !== filterAssignee) return false;
    if (filterPriority && task.priority !== filterPriority) return false;
    if (startDateFilter && new Date(task.startDate) < new Date(startDateFilter)) return false;
    if (endDateFilter && new Date(task.endDate) > new Date(endDateFilter)) return false;
    return true;
  });

  const handleAssigneeFilterChange = (e) => {
    setFilterAssignee(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleStartDateFilterChange = (e) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateFilterChange = (e) => {
    setEndDateFilter(e.target.value);
  };

  const handleEditStatus = (taskID, status) => {
    onUpdateTaskStatus(taskID, status);
  };
  const handleDeleteTask = (taskId, status) => {
    if (status !== 'Completed') {
      onDeleteTask(taskId, status);
    } else {
      alert('Completed tasks cannot be deleted.');
    }
  };

  /*const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };*/
  

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <div className="filters">
      <div className="filter">
          <label htmlFor="assigneeFilter">Assignee:</label>
          <input type="text" id="assigneeFilter" value={filterAssignee} onChange={handleAssigneeFilterChange} />
        </div>
        <div className="filter">
          <label htmlFor="priorityFilter">Priority:</label>
          <select id="priorityFilter" value={filterPriority} onChange={handlePriorityFilterChange}>
            <option value="">All</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="startDateFilter">Start Date From:</label>
          <input type="date" id="startDateFilter" value={startDateFilter} onChange={handleStartDateFilterChange} />
        </div>
        <div className="filter">
          <label htmlFor="endDateFilter">End Date To:</label>
          <input type="date" id="endDateFilter" value={endDateFilter} onChange={handleEndDateFilterChange} />
        </div>
        {/* Filter controls */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>
                <select value={task.status} onChange={(e) => handleEditStatus(index, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Deferred">Deferred</option>
                </select>
              </td>
              <td>{task.assignee}</td>
              <td>{task.priority}</td>
              <td>
               {task.status !== 'Completed' && (
               <button onClick={() => handleDeleteTask(task.id, task.status)}>Delete</button>
               )}
              </td>

            </tr>
          ))}

            

        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
