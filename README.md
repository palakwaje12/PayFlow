# PayFlow — Payroll Management System

A database-driven payroll management system built with **Python, FastAPI, and MySQL** to simplify employee record management and provide a foundation for automating payroll operations.

## 📌 About the Project

**PayFlow** is a software project designed to manage employee information and streamline essential payroll-related operations within an organization.

The project focuses on building a structured backend, designing a relational database, and developing RESTful APIs to perform employee management operations. It currently supports employee CRUD (Create, Read, Update, Delete) functionality, allowing employee records to be created, retrieved, updated, and deleted through API endpoints.

The long-term goal is to extend PayFlow into a full-stack application with a user-friendly dashboard, attendance management, salary processing, and payroll transaction tracking.

This project is being developed as a practical application of **Database Management Systems (DBMS), backend development, REST APIs, and full-stack software engineering**.

## 🎯 Project Objectives

- Digitize and organize employee records.
- Implement CRUD operations through RESTful APIs.
- Store and manage structured data using a relational database.
- Establish a maintainable backend architecture.
- Develop a user-friendly interface for employee and payroll management.
- Extend the system towards attendance tracking and payroll processing.

## ✨ Features

### Implemented

- **Employee Management:** Create, retrieve, update, and delete employee records.
- **RESTful API Development:** Built backend endpoints using FastAPI.
- **MySQL Database Integration:** Connect the application to a relational database.
- **API Documentation:** Explore and test endpoints through automatically generated Swagger UI.
- **Structured Database Design:** Organize employee and payroll-related information across relational tables.

### In Development / Planned

- **Interactive Dashboard:** Build a frontend for accessing employee and payroll information.
- **Employee Data Table:** Display employee records in a structured interface.
- **Dashboard Statistics:** Present useful employee and payroll summaries.
- **Attendance Management:** Track employee attendance records.
- **Salary Management:** Manage salary structures and related information.
- **Payroll Processing:** Develop payroll calculation and transaction-tracking functionality.
- **Input Validation and Error Handling:** Improve data validation and provide meaningful error responses.
- **Testing and Documentation:** Add systematic API testing and project documentation.

*Note: Planned features will be implemented progressively as the project evolves.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language and backend logic |
| FastAPI | Building RESTful APIs |
| MySQL | Relational database management |
| MySQL Connector/Python | Connecting the backend to MySQL |
| Pydantic | Request-data validation through FastAPI models |
| HTML | Frontend structure — planned |
| CSS | Frontend styling — planned |
| JavaScript | Frontend interactions and API integration — planned |
| Swagger UI | Interactive API documentation and testing |
| Git & GitHub | Version control and project hosting |
| Visual Studio Code | Development environment |

## 🏗️ System Architecture

PayFlow follows a layered architecture in which the frontend communicates with the backend API, and the backend interacts with the MySQL database.

```text
           User
             |
             v
    Frontend Dashboard
     HTML / CSS / JS
             |
             v
       FastAPI Backend
       Python / Pydantic
             |
             v
     Database Connector
      MySQL Connector
             |
             v
       MySQL Database
             |
             v
  Employee and Payroll Data
```

The frontend is planned and is not yet part of the currently implemented application.

## 🗄️ Database Design

The project uses a MySQL database named `payrollmanagementsystemdb`.

The database is organized around the following tables:

| Table | Purpose |
|---|---|
| `Department` | Stores department-related information |
| `Employee` | Stores employee details |
| `Attendance` | Stores employee attendance records |
| `Salary_Structure` | Stores salary structure information |
| `Payroll_Transaction` | Stores payroll transaction records |

These tables provide the foundation for connecting employee information with departments, attendance, salary structures, and payroll transactions.

## 🔌 API Endpoints

The current backend includes the following employee-management operations:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check the API's root endpoint |
| `GET` | `/test-db` | Test the database connection |
| `GET` | `/employees` | Retrieve employee records |
| `GET` | `/employees/{employee_id}` | Retrieve an employee by ID |
| `POST` | `/employees` | Add a new employee |
| `PUT` | `/employees/{employee_id}` | Update an existing employee |
| `DELETE` | `/employees/{employee_id}` | Delete an employee |

### Interactive API Documentation

FastAPI automatically generates interactive API documentation, making it easy to inspect endpoints and send test requests.

After starting the backend, visit:

**Swagger UI:** http://127.0.0.1:8000/docs

**ReDoc:** http://127.0.0.1:8000/redoc

## 🚀 Getting Started

Follow these steps to run the backend locally.

### Prerequisites

Install the following before getting started:

- Python 3.10 or later
- MySQL Server
- MySQL Workbench (recommended)
- Git
- Visual Studio Code or another code editor

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/PayFlow-Payroll-Management-System.git
cd PayFlow-Payroll-Management-System
```

Replace `YOUR-USERNAME` with your GitHub username and adjust the repository name if yours differs.

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

If you're using Command Prompt instead of PowerShell:

```cmd
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install fastapi uvicorn mysql-connector-python
```

### 4. Configure the MySQL Database

1. Start your MySQL server.
2. Open MySQL Workbench.
3. Create or select the database `payrollmanagementsystemdb`.
4. Execute the SQL scripts from the project's `database/` directory in the appropriate order.
5. Configure the database connection credentials in the backend.

**Important:** Never commit database passwords or other sensitive credentials to GitHub. Use environment variables or a local `.env` file for configuration.

### 5. Start the Backend

Run the following command from the project root:

```bash
uvicorn backend.main:app --reload
```

The API should start locally at:

http://127.0.0.1:8000

Open the interactive documentation to test the available endpoints:

http://127.0.0.1:8000/docs

## 📁 Project Structure

The project is being organized into separate directories for backend logic, database scripts, and the planned frontend.

```text
PayFlow-Payroll-Management-System/
│
├── backend/
│   ├── main.py
│   └── database.py
│
├── database/
│   ├── schema.sql
│   ├── insert_data.sql
│   └── queries.sql
│
├── frontend/                 # Planned
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

The frontend files will be added as the dashboard is developed.

## 🔒 Security and Reliability

Security and reliability improvements planned for future development include:

- Moving database credentials into environment variables.
- Validating incoming employee data.
- Handling database errors and invalid requests gracefully.
- Adding appropriate transaction handling.
- Writing tests for API endpoints and database operations.
- Exploring authentication and role-based access control.

## 🗺️ Development Roadmap

- [x] Design the relational database schema.
- [x] Connect FastAPI to MySQL.
- [x] Implement employee CRUD APIs.
- [x] Test API endpoints using Swagger UI.
- [ ] Build the frontend dashboard.
- [ ] Connect the frontend to the backend APIs.
- [ ] Add dashboard statistics and employee search.
- [ ] Implement attendance management APIs.
- [ ] Develop salary management and payroll processing.
- [ ] Add automated tests and improve error handling.
- [ ] Complete documentation and deployment.

## 🎓 Learning Outcomes

Through this project, I am developing practical experience in:

- Designing relational databases and working with SQL.
- Building RESTful APIs using FastAPI.
- Connecting Python applications to MySQL.
- Implementing CRUD operations and request validation.
- Understanding client-server architecture.
- Using Git and GitHub for version control.
- Progressively developing a full-stack application.

## 🔮 Future Scope

PayFlow can be extended into a more comprehensive payroll application with employee self-service, attendance-based salary calculations, payslip generation, payroll reports, authentication, and cloud deployment.

These enhancements will be considered as the core application becomes more complete and reliable.

## 👩‍💻 Author

**Palak Waje**

B.Tech Computer Engineering | Software Engineering

GitHub: [YOUR-GITHUB-USERNAME](https://github.com/YOUR-GITHUB-USERNAME)

---

⭐ If you find this project interesting, feel free to explore the repository and follow its development.
