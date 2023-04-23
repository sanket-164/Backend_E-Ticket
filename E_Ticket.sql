use mysql;

create database e_ticket;

use e_ticket;

create table passenger(
    p_id char(15),
    p_uname varchar(35) UNIQUE KEY NOT NULL,
    p_name varchar(50) NOT NULL,
    p_email varchar(40) UNIQUE KEY NOT NULL,
    p_no varchar(15),
    p_dob date NOT NULL,
    p_img mediumtext,
    primary key(p_id),
    p_balance float(7,2) DEFAULT 0.00 check(p_balance<=10000.00 AND p_balance>=0.00)
);

create table conductor(
    c_id char(15),
    c_uname varchar(35) UNIQUE KEY NOT NULL,
    c_name varchar(50) NOT NULL,
    c_email varchar(40) UNIQUE KEY NOT NULL,
    c_no varchar(15),
    c_dob date NOT NULL,
    c_img mediumtext,
    primary key(c_id)
);

create table admin(
    a_id char(15),
    a_uname varchar(35) UNIQUE KEY NOT NULL,
    created_by char(15) NOT NULL,
    a_name varchar(50) NOT NULL,
    a_email varchar(40) UNIQUE KEY NOT NULL,
    a_no varchar(15),
    a_dob date NOT NULL,
    a_img mediumtext,
    primary key(a_id)
);

create table ticket(
    t_id char(15),
    p_id char(15),
    start_loc varchar(50) NOT NULL,
    dest_loc varchar(50) NOT NULL,
    t_expires datetime NOT NULL,
    t_time datetime NOT NULL,
    primary key(t_id,p_id),
    foreign key(p_id) references passenger(p_id),
    t_fare float(4,2) CHECK(t_fare>0)
);

create table payment(
    pay_id char(15),
    pay_amount float(5,2) check (pay_amount>=20.00 and pay_amount<=500.00),
    p_id char(15) NOT NULL,
    c_id char(15) NOT NULL,
    pay_time datetime NOT NULL,
    primary key(pay_id,p_id)
);

create table station(
    st_id int(5),
    st_name varchar(50) NOT NULL,
    st_lat float(10,8) NOT NULL,
    st_long float(10,8) NOT NULL,
    primary key(st_id)
);

create table login (
    id char(15) NOT NULL,
    uname varchar(35) NOT NULL,
    pwd char(60) NOT NULL
);

create table feedback(
    f_id char(15),
    p_id char(15) NOT NULL,
    a_id char(15),
    feedback varchar(255) NOT NULL,
    f_time datetime NOT NULL,
    reply varchar(255),
    r_time datetime,
    f_status char(7) NOT NULL,
    primary key(f_id,p_id)
);

INSERT INTO station VALUES 
(10257, 'Dabholi Gam BRTS', 21.2340434, 72.8098173),
(10258, 'Adajan Patiya BRTS', 21.199882,72.8037554);

INSERT INTO login VALUES
('A11111111111111','admin','$2a$10$JUmQ.VhgsfN8rmVx9URlH.Ue46jMl4OQGYoxN.A8.sjFMasfRU2Eu');
INSERT INTO admin VALUES
('A11111111111111','admin','A11111111111111','Sanket Sadadiya','sanketsadadiya53@gmail.com','7383409520','2005-04-16',NULL);