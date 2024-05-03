INSERT INTO department (name)
VALUES ("Sales"),
       ("Finances"),
       ("Human Resources"),
       ("Marketing"),
       ("Legal"),
       ("Customer Support"),
       ("Quality Assurance"),
       ("Training");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Manager", 150000, 1),
        ("Legal Advisor", 120000, 5),
        ("Customer Support Associate", 80000, 6),
        ("Marketing Manager", 120000, 4),
        ("QA Team Lead", 160000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Harry", "Potter", 4, NULL),
        ("Tom", "Schlitz", 2, 1),
        ("Ben", "Cliff", 3, 3);