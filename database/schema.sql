create database payrollmanagementsystemdb;
use payrollmanagementsystemdb;
-- department table
create table department(
department_ID INT PRIMARY KEY,
department_name varchar(50) NOT NULL UNIQUE,
head_of_department varchar(30)
);
-- employee table
create table EMPLOYEE(
employee_ID INT PRIMARY KEY,
employee_name VARCHAR(20) not null,
email varchar(20) UNIQUE,
phone VARCHAR(15),
designation varchar(30) default 'Staff',
Date_of_Joining DATE,
Bank_Account_No VARCHAR(20),
Department_ID INT,
FOREIGN KEY (Department_ID)
REFERENCES Department(Department_ID)
);
-- attendance
create table attendance(
Attendance_ID INT PRIMARY KEY,
employee_ID INT NOT NULL,
attendance_data DATE NOT NULL,
Status VARCHAR(10) DEFAULT 'present'
 check(status in('Present','Absent','Leave')),
 foreign key (employee_ID)
   references employee(employee_ID)
);
-- salary_structure
create table salary_structure(
salary_ID INT PRIMARY KEY,
Employee_ID INT NOT NULL UNIQUE,
HRA decimal(10,2) default 0,
DA decimal(10,2) default 0,
PF_deduction decimal(10,2) default 0,
TAX_deduction decimal(10,2) default 0,
Net_salary decimal(10,2),
foreign key (employee_ID)
   references employee(employee_ID)
);
-- payroll_transaction
create table payroll_transaction(
transaction_id INT PRIMARY KEY,
employee_ID INT NOT NULL,
Month VARCHAR(15) NOT NULL,
Year INT NOT NULL,
Payment_date DATE,
Net_pay DECIMAL(10,2) NOT NULL,
foreign key (employee_ID)
   references employee(employee_ID)
);
