CREATE TABLE student(
    student_id serial PRIMARY KEY,
    name VARCHAR(30)
);
CREATE TABLE course(
    course_id serial PRIMARY KEY,
    name VARCHAR(30),
    cost int
);
CREATE TABLE registration(
    reg_id serial,
    student_id INT,
     CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES student(student_id),
    course_id INT,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(course_id),
    date_registered DATE
);