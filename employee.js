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

//It should take the details of an employee (object) and adds this object to the table
function addEmployee(employee) {
    //check the employee is already exist or not.
    for(let i = 0; i<employees.length; i++){
        let e = employees[i];
        if (e.email === employee.email) {
            alert('Email Already Exist');
            //if employee found do not add the current employee.
            return;
        }
        else if(e.empId == employee.empId){
            alert('Employee Id Is Already Taken');
            return;
        }
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.empId}</td>
        <td>${employee.company}</td>
        <td>${employee.designation}</td>
        <td>
            <button class="btn" onclick="deleteEmployee(this)" data-empid="${employee.empId}">Delete</button>
        </td>
    `;
    tbody.appendChild(tr);
    employees.push(employee);
    //after adding an employee into the table clear the form.
    form.reset();
}

// Below function deletes employee

function deleteEmployee(buttonRef) {
    let empId = buttonRef.getAttribute("data-empid");
    //using the above empId delete the corresponding object in the employee array
    for(let i=0 ;i<=employees.length;i++){
        if(employees[i].empId==empId ){
            employees.splice(i, 1);
            break;
        }
    }

    //also remove the employee from the DOM tree
    let parentTd = buttonRef.parentNode;
    let parentTr = parentTd.parentNode;

    //the below line removes the <tr></tr> from the DOM tree
    parentTr.remove();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let employee = {
        name: event.target.name.value,
        email: event.target.email.value,
        empId: event.target.empId.value,
        company: event.target.company.value,
        designation: event.target.designation.value,
    }
    addEmployee(employee);
})