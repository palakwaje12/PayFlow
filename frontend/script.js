
// PayFlow frontend - FastAPI integration

const API_BASE_URL = "";

const employeeTableBody = document.getElementById("employeeTableBody");
const employeeForm = document.getElementById("employeeForm");
const messageBox = document.getElementById("message");

const totalEmployeesElement = document.getElementById("totalEmployees");
const totalDepartmentsElement = document.getElementById("totalDepartments");
const recentEmployeesElement = document.getElementById("recentEmployees");
const recordCountElement = document.getElementById("recordCount");

const employeeSearch = document.getElementById("employeeSearch");
const departmentFilter = document.getElementById("departmentFilter");

let employees = [];

// Safely display database values in HTML.
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// Display success and error messages.
function showMessage(message, type = "success") {
    messageBox.textContent = message;
    messageBox.className = `message ${type}`;

    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function hideMessage() {
    messageBox.textContent = "";
    messageBox.className = "message hidden";
}

// Format dates without displaying an invalid date.
function formatDate(value) {
    if (!value) return "—";

    const date = new Date(String(value).slice(0, 10) + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return escapeHTML(value);
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// Retrieve the employee ID, regardless of common ID naming styles.
function getEmployeeId(employee) {
    return employee.employee_ID
        ?? employee.employee_id
        ?? employee.Employee_ID
        ?? employee.id
        ?? "—";
}

// Update the dashboard statistics.
function updateStatistics() {
    totalEmployeesElement.textContent = employees.length;

    const departments = new Set(
        employees
            .map(employee =>
                employee.Department_ID ?? employee.department_id
            )
            .filter(value => value !== null && value !== undefined && value !== "")
    );

    totalDepartmentsElement.textContent = departments.size;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentlyJoined = employees.filter(employee => {
        const joiningDate =
            employee.Date_of_Joining
            ?? employee.date_of_joining
            ?? employee.dateOfJoining;

        if (!joiningDate) return false;

        const date = new Date(String(joiningDate).slice(0, 10) + "T00:00:00");

        return !Number.isNaN(date.getTime())
            && date >= thirtyDaysAgo
            && date <= today;
    });

    recentEmployeesElement.textContent = recentlyJoined.length;
    recordCountElement.textContent =
        `${employees.length} employee${employees.length === 1 ? "" : "s"}`;
}


function populateDepartmentFilter() {
    const currentSelection = departmentFilter.value;

    const departments = [
        ...new Set(
            employees
                .map(employee =>
                    employee.Department_ID
                    ?? employee.department_id
                )
                .filter(id => id !== null && id !== undefined && id !== "")
                .map(String)
        )
    ].sort((a, b) => Number(a) - Number(b));

    departmentFilter.innerHTML =
        '<option value="all">All Departments</option>';

    departments.forEach(id => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = `Department ${id}`;
        departmentFilter.appendChild(option);
    });

    if (departments.includes(currentSelection)) {
        departmentFilter.value = currentSelection;
    }
}

function getFilteredEmployees() {
    const searchTerm = employeeSearch.value.trim().toLowerCase();
    const selectedDepartment = departmentFilter.value;

    return employees.filter(employee => {
        const id = String(getEmployeeId(employee));

        const name = String(
            employee.employee_name
            ?? employee.Employee_Name
            ?? employee.name
            ?? ""
        );

        const email = String(employee.email ?? "");
        const matchesSearch =
            `${id} ${name} ${email}`.toLowerCase().includes(searchTerm);

        const departmentId = String(
            employee.Department_ID
            ?? employee.department_id
            ?? ""
        );

        const matchesDepartment =
            selectedDepartment === "all"
            || departmentId === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });
}

// Render the employee directory.
function renderEmployees() {
    const filteredEmployees = getFilteredEmployees();

    document.getElementById("directorySummary").textContent =
        `Showing ${filteredEmployees.length} of ${employees.length} employees`;

    recordCountElement.textContent =
        `${filteredEmployees.length} shown`;

    if (filteredEmployees.length === 0) {
        const hasFilters =
            employeeSearch.value.trim() !== ""
            || departmentFilter.value !== "all";

        employeeTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="table-state">
                    ${hasFilters
                        ? "No employees match your search or department filter."
                        : "No employees found. Add your first employee using the form above."}
                </td>
            </tr>
        `;
        return;
    }

    employeeTableBody.innerHTML = filteredEmployees.map(employee => {
        const id = getEmployeeId(employee);

        const name =
            employee.employee_name
            ?? employee.Employee_Name
            ?? employee.name
            ?? "Unnamed Employee";

        const email = employee.email ?? "—";
        const designation = employee.designation ?? "—";

        const joiningDate =
            employee.Date_of_Joining
            ?? employee.date_of_joining
            ?? employee.dateOfJoining;

        const departmentId =
            employee.Department_ID
            ?? employee.department_id
            ?? "—";

        const initials = String(name)
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0))
            .join("")
            .toUpperCase();

        return `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">
                            ${escapeHTML(initials || "?")}
                        </div>
                        <div>
                            <div class="employee-name">
                                ${escapeHTML(name)}
                            </div>
                            <div class="employee-id">
                                ID: ${escapeHTML(id)}
                            </div>
                        </div>
                    </div>
                </td>
                <td>${escapeHTML(email)}</td>
                <td>${escapeHTML(designation)}</td>
                <td>${formatDate(joiningDate)}</td>
                <td>Department ${escapeHTML(departmentId)}</td>
                <td>
                    <div class="employee-actions">
                        <button
                            type="button"
                            class="action-button edit-button"
                            data-action="edit"
                            data-id="${escapeHTML(id)}"
                            
                        >Edit</button>
                        <button
                            type="button"
                            class="action-button delete-button"
                            data-action="delete"
                            data-id="${escapeHTML(id)}"
                            
                        >Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}


async function loadDepartments() {
    const response = await fetch(`${API_BASE_URL}/departments`);

    if (!response.ok) {
        throw new Error("Failed to load departments.");
    }

    const departments = await response.json();

    const departmentSelects = [
        document.getElementById("departmentId"),
        document.getElementById("editEmployeeDepartment")
    ].filter(Boolean);

    departmentSelects.forEach(select => {
        const previousValue = select.value;

        select.innerHTML = '<option value="">Select department</option>';

        departments.forEach(department => {
            const option = document.createElement("option");
            option.value = department.department_ID;
            option.textContent =
                `${department.department_name} (${department.department_ID})`;

            select.appendChild(option);
        });

        if (
            [...select.options].some(
                option => option.value === previousValue
            )
        ) {
            select.value = previousValue;
        }
    });
}


// Fetch employees from the FastAPI backend.
async function loadEmployees() {
    employeeTableBody.innerHTML = `
        <tr>
            <td colspan="5" class="table-state">
                Loading employees...
            </td>
        </tr>
    `;

    recordCountElement.textContent = "Loading records...";

    try {
        const response = await fetch(`${API_BASE_URL}/employees`);

        if (!response.ok) {
            throw new Error(`Unable to load employees (HTTP ${response.status}).`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("The employees API did not return a list.");
        }

        employees = data;
        populateDepartmentFilter();
        updateStatistics();
        renderEmployees();
    } catch (error) {
        employeeTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="table-state">
                    Unable to load employees. Check that the FastAPI server is running.
                </td>
            </tr>
        `;

        recordCountElement.textContent = "Could not load records";
        showMessage(error.message, "error");
    }
}

// Add a new employee using the existing POST endpoint.
employeeForm.addEventListener("submit", async event => {
    event.preventDefault();
    hideMessage();

    const submitButton = document.getElementById("addEmployeeButton");
    submitButton.disabled = true;
    submitButton.textContent = "Adding employee...";

    const formData = new FormData(employeeForm);

    
    const employeeData = {
        employee_ID: Number(formData.get("employee_ID")),
        employee_name: formData.get("employee_name").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
        designation: formData.get("designation").trim(),
        Date_of_Joining: formData.get("Date_of_Joining"),
        Bank_Account_No: formData.get("Bank_Account_No").trim(),
        Department_ID: Number(formData.get("Department_ID"))
    };

    try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData)
        });

        const responseText = await response.text();
        let result = {};

        try {
            result = responseText ? JSON.parse(responseText) : {};
        } catch {
            result = {};
        }

        if (!response.ok) {
            const detail = result.detail;

            const errorMessage = Array.isArray(detail)
                ? detail.map(item => item.msg).join(", ")
                : typeof detail === "string"
                    ? detail
                    : `Could not add employee (HTTP ${response.status}).`;

            throw new Error(errorMessage);
        }

        employeeForm.reset();
        await loadEmployees();

        showMessage(
            result.message || "Employee added successfully!",
            "success"
        );

        document.getElementById("employees").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "+ Add Employee";
    }
});


// Handle Edit and Delete clicks using event delegation.
employeeTableBody.addEventListener("click", async event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const employeeId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "delete") {
        const employee = employees.find(
            item => String(getEmployeeId(item)) === employeeId
        );

        if (!employee) {
            showMessage("Employee record not found. Refresh and try again.", "error");
            return;
        }

        const employeeName =
            employee.employee_name
            ?? employee.Employee_Name
            ?? employee.name
            ?? "this employee";

        const confirmed = window.confirm(
            `Are you sure you want to delete ${employeeName} (ID: ${employeeId})? This cannot be undone.`
        );

        if (!confirmed) return;

        button.disabled = true;

        try {
            const response = await fetch(
                `${API_BASE_URL}/employees/${encodeURIComponent(employeeId)}`,
                { method: "DELETE" }
            );

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    result.detail || `Delete failed (HTTP ${response.status}).`
                );
            }

            await loadEmployees();
            showMessage(result.message || "Employee deleted successfully!", "success");
        } catch (error) {
            showMessage(error.message, "error");
        } finally {
            button.disabled = false;
        }

        return;
    }

    
if (action === "edit") {
    const employee = employees.find(
        item => String(getEmployeeId(item)) === employeeId
    );

    if (!employee) {
        showMessage("Employee record not found. Refresh and try again.", "error");
        return;
    }

    const editSection = document.getElementById("editEmployeeSection");

    const getValue = (...values) =>
        values.find(value => value !== undefined && value !== null) ?? "";

    document.getElementById("editEmployeeId").value = employeeId;
    document.getElementById("editEmployeeName").value =
        getValue(employee.employee_name, employee.Employee_Name);
    document.getElementById("editEmployeeEmail").value =
        getValue(employee.email);
    document.getElementById("editEmployeePhone").value =
        getValue(employee.phone);
    document.getElementById("editEmployeeDesignation").value =
        getValue(employee.designation);
    document.getElementById("editEmployeeJoiningDate").value =
        String(getValue(employee.Date_of_Joining, employee.date_of_joining))
            .slice(0, 10);
    document.getElementById("editEmployeeBank").value =
        getValue(employee.Bank_Account_No, employee.bank_account_no);
    document.getElementById("editEmployeeDepartment").value =
        String(getValue(employee.Department_ID, employee.department_id));

    editSection.classList.remove("hidden");
    editSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
});


// Refresh the list and statistics.
document.getElementById("refreshButton").addEventListener("click", async () => {
    hideMessage();
    await loadEmployees();
});

loadDepartments().catch(error => {
    console.error("Department loading error:", error);
});

// Initial dashboard load.
loadEmployees();
employeeSearch.addEventListener("input", renderEmployees);

departmentFilter.addEventListener("change", renderEmployees);

document.getElementById("clearFiltersButton")
    .addEventListener("click", () => {
        employeeSearch.value = "";
        departmentFilter.value = "all";
        renderEmployees();
    });

    
const editEmployeeForm = document.getElementById("editEmployeeForm");

editEmployeeForm.addEventListener("submit", async event => {
    event.preventDefault();

    const employeeId = document.getElementById("editEmployeeId").value;

    const updatedEmployee = {
        employee_name: document.getElementById("editEmployeeName").value.trim(),
        email: document.getElementById("editEmployeeEmail").value.trim(),
        phone: document.getElementById("editEmployeePhone").value.trim(),
        designation: document.getElementById("editEmployeeDesignation").value.trim(),
        Date_of_Joining: document.getElementById("editEmployeeJoiningDate").value,
        Bank_Account_No: document.getElementById("editEmployeeBank").value.trim(),
        Department_ID: Number(document.getElementById("editEmployeeDepartment").value)
    };

    try {
        const response = await fetch(
            `${API_BASE_URL}/employees/${encodeURIComponent(employeeId)}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedEmployee)
            }
        );

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.detail || `Update failed (HTTP ${response.status}).`);
        }

        document.getElementById("editEmployeeSection").classList.add("hidden");
        await loadEmployees();
        showMessage(result.message || "Employee updated successfully!", "success");
    } catch (error) {
        showMessage(error.message || "Unable to update employee.", "error");
    }
});

document.getElementById("cancelEditButton").addEventListener("click", () => {
    editEmployeeForm.reset();
    document.getElementById("editEmployeeSection").classList.add("hidden");
});


/* =========================
   ATTENDANCE MANAGEMENT
========================= */

async function loadAttendanceEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`);

    if (!response.ok) {
        throw new Error("Failed to load employees.");
    }

    const employees = await response.json();
    const select = document.getElementById("attendanceEmployee");

    select.innerHTML = '<option value="">Select employee</option>';

    employees.forEach(employee => {
        const id = getEmployeeId(employee);
        const option = document.createElement("option");

        option.value = id;
        option.textContent =
            `${employee.employee_name} (ID: ${id})`;

        select.appendChild(option);
    });
}

async function loadAttendanceRecords() {
    const tbody = document.getElementById("attendanceTableBody");

    try {
        const response = await fetch(`${API_BASE_URL}/attendance`);

        if (!response.ok) {
            throw new Error("Failed to load attendance records.");
        }

        const records = await response.json();

        if (records.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">No attendance records found.</td>
                </tr>`;
            return;
        }

        tbody.innerHTML = records.map(record => `
            <tr>
                <td>${escapeHTML(String(record.Attendance_ID))}</td>
                <td>${escapeHTML(String(record.employee_ID))}</td>
                <td>${escapeHTML(String(record.employee_name ?? "Unknown"))}</td>
                <td>${escapeHTML(String(record.attendance_data))}</td>
                <td>${escapeHTML(String(record.Status ?? ""))}</td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Attendance loading error:", error);

        tbody.innerHTML = `
            <tr>
                <td colspan="5">Unable to load attendance records.</td>
            </tr>`;
    }
}

async function handleAttendanceSubmit(event) {
    event.preventDefault();

    const employeeId =
        document.getElementById("attendanceEmployee").value;

    const attendanceDate =
        document.getElementById("attendanceDate").value;

    const status =
        document.getElementById("attendanceStatus").value;

    const message =
        document.getElementById("attendanceMessage");

    try {
        const response = await fetch(`${API_BASE_URL}/attendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employee_ID: Number(employeeId),
                attendance_data: attendanceDate,
                Status: status
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || "Failed to mark attendance."
            );
        }

        message.textContent = "Attendance marked successfully!";
        message.style.color = "green";

        document.getElementById("attendanceForm").reset();

        await loadAttendanceRecords();

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";
    }
}

function initializeAttendance() {
    const form = document.getElementById("attendanceForm");

    // Prevent duplicate event listeners if initialized again.
    if (form && form.dataset.initialized !== "true") {
        form.addEventListener("submit", handleAttendanceSubmit);
        form.dataset.initialized = "true";
    }

    loadAttendanceEmployees().catch(error => {
        console.error("Employee dropdown error:", error);
    });

    loadAttendanceRecords();
}

document.addEventListener("DOMContentLoaded", initializeAttendance);
