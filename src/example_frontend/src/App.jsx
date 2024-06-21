import React, { useState, useEffect } from 'react';
import { example_backend } from 'declarations/example_backend';
import './index.scss';

function App() {
  

  const [departments, setDepartments] = useState([]);
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ DeptId: '', departmentName: '' });
  

 
  
  const fetchDepartments = async () => {
    try {
      const departmentsList = await example_backend.getDepartments();
      console.log("Fetched departments:", departmentsList);
      setDepartments(departmentsList);
      localStorage.setItem('departments', JSON.stringify(departmentsList)); // Store fetched department in local storage
    } catch (error) {
      console.error("Failed to fetch department:", error);
    }
  };
  
 
  const handleAddDepartment = async (event) => {
    event.preventDefault();
    console.log("Submitting department:", newDepartment);
    try {

      const existingIdDepartment = departments.find(dep => dep.DeptId === newDepartment.DeptId);
      const existingNameDepartment = departments.find(dep => dep.departmentName === newDepartment.departmentName);

      if (existingIdDepartment) {
        alert('Department already exists!');
        return;
      }
      else if (existingNameDepartment) {
        alert('Department already exists!');
        return;
      }
      await example_backend.addDepartment(newDepartment.DeptId, newDepartment.departmentName);
      console.log("Department added successfully");
      setNewDepartment({ DeptId: '', departmentName: '' });
      setShowAddDepartmentForm(false);
      fetchDepartments(); // Fetch courses after adding a new department
    } catch (error) {
      console.error("Failed to add department:", error);
    }
  };

 

  return (
    <main>
       
      <h1>Department Registration</h1>
     
        <>
          
          
          <button onClick={() => setShowAddDepartmentForm(true)}>Add New Department</button>
          
          <button onClick={fetchDepartments}>Fetch Department</button>
          
          {showAddDepartmentForm && (
            <form onSubmit={handleAddDepartment}>
              <label>
                Department ID:
                <input
                  type="text"
                  value={newDepartment.DeptId}
                  onChange={(e) => setNewDepartment({ ...newDepartment, DeptId: e.target.value })}
                  required
                />
              </label>
              <label>
                Department Name:
                <input
                  type="text"
                  value={newDepartment.departmentName}
                  onChange={(e) => setNewDepartment({ ...newDepartment, departmentName: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Save Department</button>
            </form>
          )}
          <h2>Department List</h2>
          <ul>
            {departments.map((department, index) => (
              <li key={index}>
                {department.DeptId} - {department.departmentName}
              </li>
            ))}
          </ul>
  

         
         
        </>
       
    </main>
  );
}

export default App;
