# 💼 PayFlow — Payroll Management System

A web-based **Payroll Management System** built to simplify employee management, attendance tracking, salary structure management, and payroll processing through a centralized HR dashboard.

PayFlow combines a **FastAPI backend, MySQL database, and responsive frontend** to provide an organized interface for managing employee and payroll records.

## ✨ Features

### 👥 Employee Management
- View employee records in an employee directory.
- Add, update, and delete employee information.
- Search and filter employees.
- Retrieve employee information through REST API endpoints.

### 📅 Attendance Management
- Record employee attendance.
- Retrieve attendance records through the backend API.
- Maintain attendance information in the MySQL database.

### 💰 Salary Structure Management
- Manage employee salary structures.
- Store salary components, including:
  - House Rent Allowance (HRA)
  - Dearness Allowance (DA)
  - Provident Fund (PF) deduction
  - Tax deduction
  - Net salary

### 🧾 Payroll Processing
- Generate payroll transactions for employees with configured salary structures.
- Calculate the recorded net pay from the employee's configured net salary.
- Store payroll month, year, and payment date.
- View payroll transaction history.
- Display total payroll transactions and total net pay.
- Validate employee records and prevent duplicate payroll entries for the same employee, month, and year.

### 📊 HR Dashboard
- Centralized dashboard interface.
- Employee directory and payroll navigation.
- Summary cards for payroll transactions and net pay.
- A structured interface for extending HR analytics.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript | Frontend interactions and API integration |
| Python | Backend programming |
| FastAPI | REST API development |
| MySQL | Relational database |
| SQL | Database queries and operations |
| Git & GitHub | Version control and project hosting |

## 🏗️ Application Architecture

```text
PayFlow
│
├── Frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Backend
│   ├── main.py
│   └── database.py
│
├── Database
│   └── schema.sql
│
├── requirements.txt
└── README.md
```

*The directory structure above is illustrative. Adjust filenames and folders to match the actual repository.*

### How it works

1. Users interact with the HR dashboard in the browser.
2. JavaScript sends HTTP requests to the FastAPI backend.
3. FastAPI validates requests and executes database operations.
4. MySQL stores employee, attendance, salary, and payroll records.
5. The frontend displays the returned data.

## 🚀 Getting Started

Follow these steps to run PayFlow locally.

### 1. Clone the repository

```bash
git clone https://github.com/palakwaje12/PayFlow.git
cd PayFlow
```

### 2. Create and activate a virtual environment

**Windows PowerShell**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, consult the Python documentation or activate the environment using the appropriate method for your terminal.

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

If your project does not yet have a complete `requirements.txt`, ensure it includes the packages your backend actually imports, such as FastAPI, Uvicorn, and your chosen MySQL connector.

### 4. Configure MySQL

- Install and start MySQL Server.
- Create the database `payrollmanagementsystemdb`, or use the database name configured in your project.
- Import the project's database schema and required setup scripts.
- Configure the database connection using your local environment settings.

**Security:** Never commit real database passwords, API keys, or other credentials to GitHub. Use environment variables or a local `.env` file, and commit a `.env.example` containing placeholders instead.

Example placeholder configuration:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=payrollmanagementsystemdb
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
```

These variable names are examples; make sure they match the configuration expected by your backend.

### 5. Start the FastAPI server

Run the following command from the project root:

```powershell
uvicorn backend.main:app --reload
```

If your backend entry point is different, adjust the module path accordingly.

### 6. Open PayFlow

- **Web application:** http://127.0.0.1:8000/frontend/index.html
- **API documentation:** http://127.0.0.1:8000/docs
- **Alternative API documentation:** http://127.0.0.1:8000/redoc

Keep the terminal running while using the application locally.

## 🔌 API Overview

The backend exposes REST endpoints for managing core payroll operations.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/employees` | Retrieve employee records |
| POST | `/employees` | Add an employee |
| GET | `/employees/{employee_id}` | Retrieve an employee |
| PUT | `/employees/{employee_id}` | Update an employee |
| DELETE | `/employees/{employee_id}` | Delete an employee |
| GET | `/departments` | Retrieve departments |
| GET | `/attendance` | Retrieve attendance records |
| POST | `/attendance` | Add an attendance record |
| GET | `/salary-structures` | Retrieve salary structures |
| POST | `/salary-structures` | Add a salary structure |
| GET | `/payroll-transactions` | Retrieve payroll history |
| POST | `/payroll-transactions` | Generate a payroll transaction |

Explore the interactive Swagger UI at `/docs` to inspect request parameters, schemas, and responses.

## 🗄️ Database

PayFlow uses MySQL to maintain relational records for its core modules.

The database supports:
- Employee and department information.
- Attendance records.
- Employee salary structures.
- Payroll transaction history.

Refer to the SQL files included in the repository for the actual table definitions and setup requirements.

## 🔒 Security & Data Handling

- Configure credentials locally rather than committing secrets.
- Use sample or anonymized employee data when sharing the repository publicly.
- Do not publish real employee personal information, salary details, or database backups.
- Review database permissions before connecting the application to any shared or production database.

**Note:** PayFlow is a learning project. Production use would require additional security controls, authentication and authorization, audit logging, deployment hardening, and appropriate protection of sensitive payroll data.

## 🛣️ Future Enhancements

Planned improvements may include:

- [ ] Monthly payroll expenditure charts.
- [ ] Department-wise workforce analytics.
- [ ] Payroll report export to CSV.
- [ ] Authentication and role-based access control.
- [ ] Improved input validation and error handling.
- [ ] Automated testing for API endpoints.
- [ ] Cloud deployment.
- [ ] Automated payroll calculations and payslip generation.

## 🎯 Learning Outcomes

This project provides practical experience with:

- Building REST APIs using FastAPI.
- Connecting Python applications to MySQL.
- Implementing CRUD operations.
- Integrating frontend interfaces with backend APIs.
- Designing relational database workflows.
- Handling validation, database errors, and payroll transactions.
- Managing source code with Git and GitHub.

## 👩‍💻 Author

**Palak Waje**

- GitHub: [@palakwaje12](https://github.com/palakwaje12)
- LinkedIn: [Palak Waje](https://linkedin.com/in/palak-waje-031107370/)

## 📄 License

This project is available for learning and educational purposes. If you want others to reuse, modify, or distribute the code, consider adding a `LICENSE` file with a suitable open-source license.

---

⭐ If you find this project useful, consider starring the repository!
