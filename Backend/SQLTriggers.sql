-------------------------triggers------------------------


---1.Total price in cart table
create trigger CalculateTotalPriceinCart
on CartProduct
after insert
as
begin
declare @qty int
declare @id int
declare @Cid int
declare @price float
select @qty=quantity from inserted
select @id=BookId from inserted
select @Cid=CartId from inserted
select @price=Price from Book where BookId=@id
update Cart set totalPrice=totalPrice+(@qty*@price) where Cartid=@Cid
end

---2. cart initialisation after user registration
create trigger InitialiseCart
on UserInfo
after insert 
as
begin
declare @id int
declare @newCartId int
select @id = [UId] from inserted
insert into Cart(TotalPrice) values(0)
select @newCartId = max(CartId) from Cart
update UserInfo set CartId=@newCartId
where [UId]=@id
end

---3. calculate total price of orders
create trigger CalculateTotalPriceOrder
on [Order]
after insert
as
begin
declare @orderid int
declare @cartid int
declare @couponper float
declare @TotPrice float
declare @CoupId float
select @cartid=CartId from inserted
select @CoupId=Coupon from inserted
select @couponper=DiscountPercentage from Coupon where CouponId=@CoupId
select @TotPrice=TotalPrice from Cart where CartId=@cartid
update [Order] set TotalPrice=@TotPrice-(@TotPrice*@couponper) 
where OrderId=@orderid
end

----4.Book Count in Category and
----5. decrementing book quantity on placing order
create trigger UpdateQuantityofBook
on CartProduct
before insert
as
begin
declare @bookid int
declare @qtyordered int
declare @remqty int
declare @availqty int
declare @cartid int
declare @cid int
select @cartid=CartId from inserted
select @bookid=BookId from inserted
select @qtyordered=Quantity from inserted
select @availqty=Quantity from Book where BookId=@bookid
select @cid=CId from Book where BookId=@bookid
if(@availqty-@qtyordered<0)
begin
raiserror('Not Enough book available',16,1)
end
else
begin
insert into CartProduct values(@cartid,@bookid,@qtyordered)
update Book set Quantity=@availqty-@qtyordered 
where @bookid=BookId
if(@availqty-@qtyordered=0)
begin
update Book set BStatus='Unavailable' 
where @bookid=BookId
update Category set BCount=BCount-1 
where CategoryId=@cid
update Category set CStatus='Unavailable'
where BCount=0 and CategoryId=@cid
end

end
end

----6.  Inserting address on address table ---> trigger insertion on Address map
create trigger 


----7. trigger for updating BRating(Book) when a review(Review) is created

create trigger getRating
on
Review
after insert
as
begin
declare @id int
declare @avg float
select @id=BookId from inserted
select @avg=Round(avg(cast(Rating as float) ),1) from Review where BookId=@id
update Book set BRating=@avg where BookId=@id
end

---8. updating Bcount(Category) on adding new book(Book)
create trigger updateCountCategory
on Book
after insert
as
begin
declare @id int
select @id=CId from inserted
update Category set Bcount=Bcount+1 where CategoryId=@id
end


---9. on placing order CPosition(Category) and BPosition (Book)


------

--1. Trigger to add coins when an order is placed

create trigger addCoins
on 
[Order]
with encryption
after insert
as
begin
declare @totalPrice float
declare @id int
select @totalPrice=OrderPrice from inserted
select @id=UserId from inserted
update UserInfo set coins=cast(coins+(0.05*@totalPrice) as INT) where UId=@id
end



--2.Trigger to increment points on approval of the submitted book
create TRIGGER addPoints
ON BookSubmission
AFTER Insert,UPDATE
AS
IF ( UPDATE (ReviewStatus) )
BEGIN
declare @id int
declare @Status nvarchar(20)
Select @id=UId from inserted
select @Status= ReviewStatus from inserted
if(@Status='Approved')
begin
update UserInfo set coins=coins+50 where UId=@id
end
END

-- 3. Rating updation
drop trigger getRating
create trigger getRating
on
Review
after insert
as
begin
declare @id int
declare @avg float
select @id=BookId from inserted
select @avg=Round(avg(cast(Rating as float) ),1)  from Review where BookId=@id
update Book set BRating=@avg  where BookId=@id
end

--4. update count in category
create trigger updateCategory
on Book
after insert
as 
begin
declare @id int
select @id=CId from inserted
update Category set Bcount=Bcount+1 where CategoryId=@id
end

--5. Position updation on placing order
create trigger updatePosition
on
[Order]
after insert
as
begin
declare @id int
select @id=CartId from inserted
update book
set BPosition=BPosition+cp.Quantity from
CartProduct as cp
inner join Book on Book.BookId=cp.BookId and cp.CartId=@id
end





