/* 
1. User should be able to add employees'
{
    name: "",
    email: "",
    employeeId: "",
    company: "",
    designation: "",
}

2. Added employees should be displayed on the webpage in the form of a table.

3. Every added employee can be deleted or removed.

4. Add edit feature for every employee under the options section.

when clicked on edit button the data of that employee should be pre populated in the form upon the submission of that form update record in the UI.
*/

const form = document.getElementById("form");
const tbody = document.getElementById("tbody");

const employees = [];
let isEditing = false; // Added variable for tracking edit mode

// Function to change the form's submit button text
function setSubmitButtonText() {
    const submitButton = document.getElementById("submit-button");
    if (isEditing) {
        submitButton.textContent = "Update Employee";
    } else {
        submitButton.textContent = "Add Employee";
    }
}

// Function to add an employee to the table
function addEmployee(employee) {
    // Check if the employee already exists
    for (let i = 0; i < employees.length; i++) {
        let e = employees[i];
        if (e.email === employee.email) {
            alert('Email Already Exists');
            return; // Employee already exists, do not add
        } else if (e.empId === employee.empId) {
            alert('Employee ID Is Already Taken');
            return; // Employee ID already taken, do not add
        }
    }

    const tr = document.createElement("tr");
    const imageSrc = URL.createObjectURL(employee.image); // Create a URL for the uploaded image
    tr.innerHTML = `<td>${employees.length + 1}</td>
        <td><img src="${imageSrc}" class="employee-image" />${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.empId}</td>
        <td>${employee.company}</td>
        <td>${employee.designation}</td>
        <td>
            <button class="btn" class="fas fa-trash-alt" onclick="deleteEmployee(this)" data-empid="${employee.empId}">Delete</button>
            <button class="btn" onclick="editEmployee(this)" data-empid="${employee.empId}">Edit</button>
        </td>
    `;
    tbody.appendChild(tr);
    employees.push(employee);
    form.reset();
    isEditing = false; // Reset edit mode
    setSubmitButtonText(); // Change the submit button text
}

// Function to delete an employee
function deleteEmployee(buttonRef) {
    let empId = buttonRef.getAttribute("data-empid");
    // Find and remove the employee from the array
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empId === empId) {
            employees.splice(i, 1);
            break;
        }
    }
    // Remove the employee row from the table
    let parentTd = buttonRef.parentNode;
    let parentTr = parentTd.parentNode;
    parentTr.remove();
}

// Function to edit an employee
function editEmployee(buttonRef) {
    let empId = buttonRef.getAttribute("data-empid");
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empId === empId) {
            form.name.value = employees[i].name;
            form.email.value = employees[i].email;
            form.empId.value = employees[i].empId;
            form.company.value = employees[i].company;
            form.designation.value = employees[i].designation;
            isEditing = true; // Set edit mode
            setSubmitButtonText(); // Change the submit button text
            break;
        }
    }
}

// Function to update an employee's data
function updateEmployee(employee) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empId === employee.empId) {
            employees[i] = employee; // Update the employee in the array
            // Update the corresponding row in the table
            const rows = tbody.getElementsByTagName("tr");
            for (let j = 0; j < rows.length; j++) {
                const empId = rows[j].getElementsByTagName("td")[3].textContent;
                if (empId === employee.empId) {
                    const imageSrc = URL.createObjectURL(employee.image); // Create a URL for the uploaded image
                    rows[j].getElementsByTagName("td")[1].innerHTML = `<img src="${imageSrc}" class="employee-image" />${employee.name}`;
                    rows[j].getElementsByTagName("td")[2].textContent = employee.email;
                    rows[j].getElementsByTagName("td")[4].textContent = employee.company;
                    rows[j].getElementsByTagName("td")[5].textContent = employee.designation;
                    break;
                }
            }
            form.reset();
            isEditing = false; // Reset edit mode
            setSubmitButtonText(); // Change the submit button text
            break;
        }
    }
}

// Function to add a new employee (default submit event)
function addNewEmployee(event) {
    event.preventDefault();
    const employee = {
        name: event.target.name.value,
        email: event.target.email.value,
        empId: event.target.empId.value,
        company: event.target.company.value,
        designation: event.target.designation.value,
        image: event.target.image.files[0], // Get the uploaded image File object
    };
    if (isEditing) {
        updateEmployee(employee);
    } else {
        addEmployee(employee);
    }
}

// Add event listener for the form submission to add a new employee
form.addEventListener("submit", addNewEmployee);

// Initial setup for submit button text
setSubmitButtonText();