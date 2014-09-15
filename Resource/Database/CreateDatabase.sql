use forecast;

# Update Cycle 5min
drop table if exists hisPower;
create table hisPower (
    id int not null auto_increment,
	savetime int null,
	turbine smallint NULL,
	wind smallint NULL,
	power smallint NULL,
	fault smallint NULL,
	limit smallint NULL,
	primary key(id)
);

# Update Cycle 10min
drop table if exists hisWind;
create table hisWind (
    id int not null auto_increment,
	savetime int null,
	height smallint NULL,
	wind smallint NULL,
	direction smallint NULL,
	temperature smallint NULL,
	pressure smallint NULL,
	humidity smallint NULL,
	primary key(id)
);

# Update Cycle 15min
drop table if exists hisForecast;
create table hisForecast (
    id int not null auto_increment,
	savetime int null,
	foretime int null,
	height smallint NULL,
	wind smallint NULL,
	direction smallint NULL,
	temperature smallint NULL,
	pressure smallint NULL,
	humidity smallint NULL,
	primary key(id)
);

# Update Cycle 5min
drop table if exists hisStatus;
create table hisStatus (
    id int not null auto_increment,
	savetime int null,
	turbine smallint NULL,
	fault smallint NULL,
	limit smallint NULL,
	primary key(id)
);

drop table if exists info;
create table info (
    id int not null auto_increment,
	turbine smallint NULL,
	capacity smallint NULL,
	hubHeight smallint NULL,
	bladeRadius smallint NULL,
	gridTime smallint NULL,
	pressure smallint NULL,
	humidity smallint NULL,
	longitude smallint NULL,
	latitude smallint NULL,
	primary key(id)
);


drop table if exists powerCurve;
create table powerCurve (
    id int not null auto_increment,
	turbine smallint NULL,
	wind smallint NULL,
	power smallint NULL,
	primary key(id)
);



