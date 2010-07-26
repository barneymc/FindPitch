--Inserted into the table from scratch they will have the correct IDs
INSERT into County (CountyName, SoftDelete) values ('Clare',0)
INSERT into County (CountyName, SoftDelete) values ('Galway',0)
INSERT into County (CountyName, SoftDelete) values ('Limerick',0)
INSERT into County (CountyName, SoftDelete) values ('Mayo',0)
INSERT into County (CountyName, SoftDelete) values ('Kerry',0)
INSERT into County (CountyName, SoftDelete) values ('Kilkenny',0)
INSERT into County (CountyName, SoftDelete) values ('Cork',0)

drop table county 
select * from County

select ID,CountyName,Case SoftDelete 
						When 0 then 0
					End from County