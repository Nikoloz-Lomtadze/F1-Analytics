create table circuit(
circuit_id int primary key,
circuit_ref varchar(50) not null,
circuit_name text not null,
circuit_loc text not null,
country text not null,
latitude DOUBLE PRECISION not null,
longitude DOUBLE PRECISION not null,
altitude int not null,
url text
);


create table constructors(
constructor_id int primary key,
constructor_ref text not null,
constructor_name text not null,
nationality text not null,
url text not null
);


create table drivers(
driver_id int primary key,
driver_ref text not null,
number text not null,
code text not null,
forename text not null,
surname text not null,
dob text not null,
nationality text not null,
url text not null
);


create table races(
race_id int primary key,
race_year text not null,
round int not null,
circuit_id int not null,
race_name text not null,
race_date text not null,
race_time text not null,
url text not null,
fp1_date text not null,
fp1_time text not null,
fp2_date text not null,
fp2_time text not null,
fp3_date text not null,
fp3_time text not null,
quali_date text not null,
quali_time text not null,
sprint_date text not null,
sprint_time text not null,

foreign key (circuit_id) references circuit(circuit_id)
);

create table seasons(
season_id int generated always as identity primary key,
season_year int not null,
url text not null
);
create table status(
status_id int primary key,
cur_status varchar(25) not null
);

	   
create table results(
result_id int primary key,
race_id int not null,
driver_id int not null,
constructor_id int not null,
result_number varchar(20) not null,
grid int not null,
position varchar(20) not null,
position_text text not null,
position_order int not null,
points DOUBLE PRECISION not null,
laps int not null,
result_time text not null,
milliseconds text not null,
fastest_lap text not null,
rank text  not null,
fastest_lap_time text  not null,
fastest_lap_speed text not null,
status_id int not null,

foreign key (race_id) references races(race_id),
foreign key (driver_id) references drivers(driver_id),
foreign key (constructor_id) references constructors(constructor_id),
foreign key (status_id) references status(status_id)
);

create table sprint_results(
sprint_id int primary key,
race_id int not null,
driver_id int not null,
constructor_id int not null,
result_number varchar(20) not null,
grid int not null,
position varchar(20) not null,
position_text text not null,
position_order int not null,
points int not null,
laps int not null,
result_time text not null,
milliseconds text not null,
fastest_lap text not null,
fastest_lap_time text  not null,
status_id int not null,

foreign key (race_id) references races(race_id),
foreign key (driver_id) references drivers(driver_id),
foreign key (constructor_id) references constructors(constructor_id),
foreign key (status_id) references status(status_id)
);


create table qualify(
qualify_id int primary key,
race_id int not null,
driver_id int not null,
constructor_id int not null,
qualify_number int not null,
position int not null,
q1 text not null,
q2 text not null,
q3 text not null,

foreign key (race_id) references races(race_id),
foreign key (driver_id) references drivers(driver_id),
foreign key (constructor_id) references constructors(constructor_id)
);


create table pit_stop(
pit_id int generated always as identity primary key,
race_id int not null,
driver_id int not null,
stop int not null,
lap int not null,
pit_time text not null,
duration text not null,
milliseconds int not null,

foreign key (race_id) references races(race_id),
foreign key (driver_id) references drivers(driver_id)
);


create table lap_time(
lap_id int generated always as identity primary key,
race_id int not null,
driver_id int not null,
lap int not null,
position int not null,
lap_time text not null,
milliseconds int not null,

foreign key (race_id) references races(race_id),
foreign key (driver_id) references drivers(driver_id)
);

create table driver_standings(
standings_id int primary key,
race_id int not null,
driver_id int not null,
points DOUBLE PRECISION not null,
position int not null,
position_text text not null,
wins int not null,

foreign key (race_id) references races(race_id),
foreign key (driver_id) references drivers(driver_id)
);

create table constructor_standings(
standings_id int primary key,
race_id int not null,
constructor_id int not null,
points DOUBLE PRECISION not null,
position int not null,
position_text text not null,
wins int not null,

foreign key (race_id) references races(race_id),
foreign key (constructor_id) references constructors(constructor_id)
);

create table constructor_results(
constructor_result_id int primary key,
race_id int not null,
constructor_id int not null,
points DOUBLE PRECISION not null,
status text not null,

foreign key (race_id) references races(race_id),
foreign key (constructor_id) references constructors(constructor_id)
);