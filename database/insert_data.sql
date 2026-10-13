INSERT INTO Department VALUES 
(101, 'Human Resources', 'Anita Rao'),
(102, 'Finance', 'Suresh Menon'),
(103, 'Information Technology', 'Vikram Nair'),
(104, 'Sales', 'Priya Desai'),
(105, 'Administration', 'Rakesh Iyer');
INSERT INTO Employee VALUES 
(1, 'Rahul Patil', 'rahul@gmail.com', '9876543210','HR Executive', '2021-03-15', 'ACC10001', 101),
(2, 'Sneha Joshi', 'sneha@gmail.com', '9876543211','Accountant', '2020-07-10', 'ACC10002', 102),
(3, 'Amit Shah', 'amit@gmail.com', '9876543212','Software Engineer', '2022-01-05', 'ACC10003', 103),
(4, 'Neha Kulkarni', 'neha@gmail.com', '9876543213','Sales Executive', '2019-11-20', 'ACC10004', 104),
(5, 'Rohit Verma', 'rohit@gmail.com', '9876543214','Office Admin', '2023-02-18', 'ACC10005', 105),
(6, 'Pooja Singh', 'pooja@gmail.com', '9876543215','HR Manager', '2018-06-01', 'ACC10006', 101),
(7, 'Karan Mehta', 'karan@gmail.com', '9876543216','Financial Analyst', '2021-09-12', 'ACC10007', 102),
(8, 'Divya Nair', 'divya@gmail.com', '9876543217','Software Engineer', '2022-04-25', 'ACC10008', 103),
(9, 'Arjun Reddy', 'arjun@gmail.com', '9876543218','Sales Manager', '2017-12-03', 'ACC10009', 104),
(10, 'Kavita Rao', 'kavita@gmail.com', '9876543219','Admin Executive', '2023-08-14', 'ACC10010', 105);
INSERT INTO attendance VALUES
(1,1,"24-09-26","present"),
(2,2,"24-09-26","present"),
(3,3,"24-09-26","absent"),
(4,4,"24-09-26","leave"),
(5,5,"24-09-26","present"),
(6,6,"24-09-26","absent"),
(7,7,"24-09-26","leave"),
(8,8,"24-09-26","present"),
(9,9,"24-09-26","absent"),
(10,10,"24-09-26","leave");
INSERT INTO salary_structure VALUES 
(1, 1, 8000, 4000, 1800, 1200, 39000),
(2, 2, 9000, 4500, 2100, 1500, 44900),
(3, 3, 12000, 6000, 3300, 2800, 66900),
(4, 4, 8500, 4200, 1900, 1300, 41500),
(5, 5, 6000, 3000, 1500, 900, 31600),
(6, 6, 11000, 5500, 2900, 2400, 59200),
(7, 7, 9500, 4800, 2400, 1900, 50000),
(8, 8, 12000, 6000, 3300, 2800, 66900),
(9, 9, 11500, 5800, 3000, 2500, 61800),
(10, 10, 6200, 3100, 1600, 950, 32750);
INSERT INTO payroll_transaction VALUES 
(1, 1, 'July', 2026, '2026-07-31', 39000),
(2, 2, 'July', 2026, '2026-07-31', 44900),
(3, 3, 'July', 2026, '2026-07-31', 66900),
(4, 4, 'July', 2026, '2026-07-31', 41500),
(5, 5, 'July', 2026, '2026-07-31', 31600),
(6, 6, 'July', 2026, '2026-07-31', 59200),
(7, 7, 'July', 2026, '2026-07-31', 50000),
(8, 8, 'July', 2026, '2026-07-31', 66900),
(9, 9, 'July', 2026, '2026-07-31', 61800),
(10, 10, 'July', 2026, '2026-07-31', 32750);