from fastapi import FastAPI
from pydantic import BaseModel
from backend.database import get_db_connection

app = FastAPI()

class Employee(BaseModel):
    employee_ID: int
    employee_name: str
    email: str
    phone: str
    designation: str
    Date_of_Joining: str
    Bank_Account_No: str
    Department_ID: int

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

    return employees                                             #send data back to the user


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