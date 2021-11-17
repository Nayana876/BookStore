create trigger statusUpdCategory
on
Category
after insert,update
as
begin
declare @id int
declare @qty int
select @id =CategoryId from inserted
select @qty=BCount from inserted
if(@qty<=0)
begin
update category set CStatus='Unavailable' where CategoryId=@id
update category set BCount=0 where CategoryId=@id
end
else
begin
update category set CStatus='Available' where CategoryId=@id
end
end

alter trigger statusUpdBook
on
Book
after update,insert
as
begin
declare @id int
declare @qty int
select @id =BookId from inserted
select @qty=Quantity from inserted
if(@qty<=0)
begin
update Book set BStatus='Unavailable' where BookId=@id
update Book set Quantity=0 where BookId=@id
end
else
begin
update Book set BStatus='Available' where BookId=@id
end
end

create trigger updCount
on book
after insert
as
begin
declare @Cid int
declare @qty int
select @Cid=CId from inserted
select @qty=Quantity from inserted
if(@qty>0)
begin
update Category Set BCount=BCount+1 where CategoryId=@Cid
end
end


create trigger CountOnUpd
on
book
after update 
as
begin
declare @oqty int
declare @nqty int
declare @ocid int
declare @ncid int
select @ncid=CId from inserted
select @ocid=CId from deleted
select @oqty=Quantity from deleted
select @nqty=Quantity from inserted
if(update(CId))
begin
if( @oqty>0 and @nqty>0)
begin
update Category Set BCount=BCount+1 where CategoryId=@ncid
update Category Set BCount=BCount-1 where CategoryId=@ocid
end
if(@oqty<=0 and @nqty>0)
begin
update Category Set BCount=BCount+1 where CategoryId=@ncid
end
if(@oqty>0 and @nqty<=0)
begin
update Category Set BCount=BCount-1 where CategoryId=@ocid
end
end
if(update(Quantity)) and not (update(CId))
begin
if(@oqty<=0 and @nqty>0)
begin
update Category Set BCount=BCount+1 where CategoryId=@ncid
end
if(@nqty<=0 and @oqty>0)
begin
update Category Set BCount=BCount-1 where CategoryId=@ncid
end
end
end


select * from sys.triggers

select * from book
select * from category

drop trigger AvailStatusUpd
drop trigger updateCountCategory
drop trigger changeCategory

delete from Book
delete from Category