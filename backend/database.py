import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1251080118",
        database="payrollmanagementsystemdb"
    )

    return connection