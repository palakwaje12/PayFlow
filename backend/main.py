from datetime import date
from fastapi.staticfiles import StaticFiles

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.database import get_db_connection

from decimal import Decimal
from pydantic import BaseModel, Field

app = FastAPI()
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

class Employee(BaseModel):
    employee_ID: int
    employee_name: str
    email: str
    phone: str
    designation: str
    Date_of_Joining: str
    Bank_Account_No: str
    Department_ID: int

class EmployeeUpdate(BaseModel):
    employee_name: str
    email: str
    phone: str
    designation: str
    Date_of_Joining: date
    Bank_Account_No: str
    Department_ID: int


class AttendanceCreate(BaseModel):
    employee_ID: int
    attendance_data: date
    Status: str = "Present"

class SalaryStructureCreate(BaseModel):
    Employee_ID: int
    HRA: Decimal = Field(default=0, ge=0)
    DA: Decimal = Field(default=0, ge=0)
    PF_deduction: Decimal = Field(default=0, ge=0)
    TAX_deduction: Decimal = Field(default=0, ge=0)
    Net_salary: Decimal = Field(gt=0)


@app.get("/")               #create a get request to check if the API is running
def home():
    return {"message": "Payroll Management System API is running!"}


@app.get("/test-db")
def test_database():

    connection = get_db_connection()                    #connect to my sql database

    if connection.is_connected():
        connection.close()
        return {"message": "MySQL database connected successfully!"}

    return {"message": "Database connection failed"}

@app.get("/employees")
def get_employees():

    connection = get_db_connection()

    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Employee")                     #run sql

    employees = cursor.fetchall()                                #get all the data from the table

    cursor.close()
    connection.close()

    return employees        #send data back to the user


@app.get("/departments")
def get_departments():
    connection = get_db_connection()

    if connection is None:
        raise HTTPException(
            status_code=500,
            detail="Could not connect to the database."
        )

    cursor = None

    try:
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT department_ID, department_name, head_of_department
            FROM Department
            ORDER BY department_ID
        """

        cursor.execute(query)
        departments = cursor.fetchall()

        return departments

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch departments: {str(e)}"
        )

    finally:
        if cursor is not None:
            cursor.close()
        connection.close()


@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, employee: EmployeeUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE Employee
        SET employee_name = %s,
            email = %s,
            phone = %s,
            designation = %s,
            Date_of_Joining = %s,
            Bank_Account_No = %s,
            Department_ID = %s
        WHERE employee_ID = %s
        """,
        (
            employee.employee_name,
            employee.email,
            employee.phone,
            employee.designation,
            employee.Date_of_Joining,
            employee.Bank_Account_No,
            employee.Department_ID,
            employee_id
        )
    )

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Employee not found")

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Employee updated successfully!"}


@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Employee WHERE employee_ID = %s",
        (employee_id,)
    )

    if cursor.rowcount == 0:
        conn.rollback()
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Employee deleted successfully!"}
                                     

@app.get("/employees/{employee_id}")
def get_employee(employee_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM Employee WHERE employee_ID = %s",
        (employee_id,)
    )

    employee = cursor.fetchone()

    cursor.close()
    conn.close()

    if employee is None:
        return {"message": "Employee not found"}

    return employee



@app.post("/employees")
def create_employee(employee: Employee):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
    INSERT INTO Employee
    (employee_ID, employee_name, email, phone, designation,
     Date_of_Joining, Bank_Account_No, Department_ID)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        employee.employee_ID,
        employee.employee_name,
        employee.email,
        employee.phone,
        employee.designation,
        employee.Date_of_Joining,
        employee.Bank_Account_No,
        employee.Department_ID
    )

    cursor.execute(query, values)

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Employee added successfully!"}

@app.get("/attendance")
def get_attendance():
    connection = get_db_connection()

    if connection is None:
        raise HTTPException(
            status_code=500,
            detail="Could not connect to the database."
        )

    cursor = None

    try:
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                a.Attendance_ID,
                a.employee_ID,
                e.employee_name,
                a.attendance_data,
                a.Status
            FROM Attendance a
            JOIN Employee e
                ON a.employee_ID = e.employee_ID
            ORDER BY a.attendance_data DESC, a.Attendance_ID DESC
        """

        cursor.execute(query)
        records = cursor.fetchall()

        for record in records:
            if record["attendance_data"]:
                record["attendance_data"] = (
                    record["attendance_data"].isoformat()
                )

        return records

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch attendance: {str(e)}"
        )

    finally:
        if cursor is not None:
            cursor.close()
        connection.close()

@app.post("/attendance")
def mark_attendance(attendance: AttendanceCreate):
    allowed_statuses = {"present", "absent", "leave"}

    if attendance.Status.lower() not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Status must be Present, Absent, or Leave."
        )

    connection = get_db_connection()

    if connection is None:
        raise HTTPException(
            status_code=500,
            detail="Could not connect to the database."
        )

    cursor = None

    try:
        cursor = connection.cursor()

        # Check if employee exists
        cursor.execute(
            "SELECT employee_ID FROM Employee WHERE employee_ID = %s",
            (attendance.employee_ID,)
        )

        if cursor.fetchone() is None:
            raise HTTPException(
                status_code=404,
                detail="Employee not found."
            )

        # Prevent duplicate attendance for the same date
        cursor.execute(
            """
            SELECT Attendance_ID
            FROM Attendance
            WHERE employee_ID = %s AND attendance_data = %s
            """,
            (attendance.employee_ID, attendance.attendance_data)
        )

        if cursor.fetchone() is not None:
            raise HTTPException(
                status_code=409,
                detail="Attendance already exists for this employee on this date."
            )

        cursor.execute(
            """
            INSERT INTO Attendance
                (employee_ID, attendance_data, Status)
            VALUES (%s, %s, %s)
            """,
            (
                attendance.employee_ID,
                attendance.attendance_data,
                attendance.Status.capitalize()
            )
        )

        connection.commit()

        return {
            "message": "Attendance marked successfully",
            "Attendance_ID": cursor.lastrowid,
            "employee_ID": attendance.employee_ID,
            "attendance_data": attendance.attendance_data.isoformat(),
            "Status": attendance.Status.capitalize()
        }

    except HTTPException:
        connection.rollback()
        raise

    except Exception as e:
        connection.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to mark attendance: {str(e)}"
        )

    finally:
        if cursor is not None:
            cursor.close()
        connection.close()


@app.get("/salary-structures")
def get_salary_structures():
    connection = get_db_connection()

    if connection is None:
        raise HTTPException(
            status_code=500,
            detail="Could not connect to the database."
        )

    cursor = None

    try:
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                s.salary_ID,
                s.Employee_ID,
                e.employee_name,
                s.HRA,
                s.DA,
                s.PF_deduction,
                s.TAX_deduction,
                s.Net_salary
            FROM Salary_Structure s
            JOIN Employee e
                ON s.Employee_ID = e.employee_ID
            ORDER BY s.salary_ID
        """

        cursor.execute(query)
        records = cursor.fetchall()

        for record in records:
            for field in ("HRA", "DA", "PF_deduction",
                          "TAX_deduction", "Net_salary"):
                if record[field] is not None:
                    record[field] = float(record[field])

        return records

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch salary structures: {str(e)}"
        )

    finally:
        if cursor is not None:
            cursor.close()
        connection.close()


@app.post("/salary-structures")
def create_salary_structure(salary: SalaryStructureCreate):
    connection = get_db_connection()

    if connection is None:
        raise HTTPException(
            status_code=500,
            detail="Could not connect to the database."
        )

    cursor = None

    try:
        cursor = connection.cursor()

        # Check whether the employee exists
        cursor.execute(
            "SELECT employee_ID FROM Employee WHERE employee_ID = %s",
            (salary.Employee_ID,)
        )

        if cursor.fetchone() is None:
            raise HTTPException(
                status_code=404,
                detail="Employee not found."
            )

        # Check for an existing salary structure
        cursor.execute(
            """
            SELECT salary_ID
            FROM Salary_Structure
            WHERE Employee_ID = %s
            """,
            (salary.Employee_ID,)
        )

        if cursor.fetchone() is not None:
            raise HTTPException(
                status_code=409,
                detail="A salary structure already exists for this employee."
            )

        cursor.execute(
            """
            INSERT INTO Salary_Structure
                (Employee_ID, HRA, DA, PF_deduction,
                 TAX_deduction, Net_salary)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                salary.Employee_ID,
                salary.HRA,
                salary.DA,
                salary.PF_deduction,
                salary.TAX_deduction,
                salary.Net_salary
            )
        )

        connection.commit()

        return {
            "message": "Salary structure created successfully.",
            "salary_ID": cursor.lastrowid,
            "Employee_ID": salary.Employee_ID,
            "HRA": float(salary.HRA),
            "DA": float(salary.DA),
            "PF_deduction": float(salary.PF_deduction),
            "TAX_deduction": float(salary.TAX_deduction),
            "Net_salary": float(salary.Net_salary)
        }

    except HTTPException:
        connection.rollback()
        raise

    except Exception as e:
        connection.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create salary structure: {str(e)}"
        )

    finally:
        if cursor is not None:
            cursor.close()
        connection.close()
