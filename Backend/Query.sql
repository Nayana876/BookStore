drop database if exists BookStoreDb;
go
create database BookStoreDb;
go
use BookStoreDb;

--drop table if exists Address;
--drop table if exists AddressMap;
--drop table if exists Coupon;
--drop table if exists Wishlist;
--drop table if exists [Order];
--drop table if exists CartProduct;
--drop table if exists UserInfo;
--drop table if exists Category;
drop table if exists Cart;
create table Cart(
	CartId int primary key identity,
	TotalPrice float
)
create table UserInfo
(
	UId int primary key identity,
	CartId int foreign key references Cart(CartId),
	FName nvarchar(50),
	LName nvarchar(50),
	Email nvarchar(50) unique,
	UserName nvarchar(50) not null unique,
	Password nvarchar(50) not null,
	ProfilePic nvarchar(60),
	PhoneNo nvarchar(10) check (phoneNo like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
	Status nvarchar(50) default 'active' check(Status in('active','deactive')),
	Role nvarchar(50) default 'user' check (Role in ('admin','user')),
	Coins int default 100
)


create table Address(
	AId int identity primary key,
	UId int foreign key references UserInfo(UId),
	Name nvarchar(50) not null,
	Building nvarchar(50) not null,
	Street nvarchar(50) not null,
	City nvarchar(50) not null,
	State nvarchar(50)not null,
	Country nvarchar(50) not null,
	PhoneNo nvarchar(10) check (phoneNo like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]') not null,
	Pincode int check (Pincode like '[0-9][0-9][0-9][0-9][0-9][0-9]') not null
)


create table Category(
	CategoryId int identity primary key,
	CName nvarchar(20) not null,
	BCount int default 0,
	CDescri nvarchar(500),
	ImgFileName nvarchar(50),
	CStatus nvarchar(20) default 'Unavailable' check(CStatus in ('Unavailable','Available')),
	CPosition int default 0,
	CreatedAt datetime default GETDATE()
)

create table Book(
	BookId int identity primary key,
	CId int foreign key references Category(CategoryId),
	Title nvarchar(50),
	Author nvarchar(20),
	ISBN nvarchar(20),
	BookYear nvarchar(20),
	BRating float default 0,
	Quantity int default 1,
	Price float,
	BDescri nvarchar(500),
	BPosition int default 0,   ----trigger on placing orders
	BStatus nvarchar(20) default 'Available' check(BStatus in ('Unavailable','Available')),  ---trigger on placing orders to change status to unavailable
	BImgFile nvarchar(50),
	BCondition nvarchar(20) default 'New' check(BCondition in('New','Used')),
	BTags nvarchar(200),
	unique(Title,BCondition)	
)




create table Coupon(
	CouponId nvarchar(15) primary key,
	DiscountPercentage float,
	MaximumDiscount float,
	MinimumOrderPrice float,
	Expiry date
)


create table Wishlist(
	WId int primary key Identity,
	UId int foreign key references UserInfo(UId),
	BookId int foreign key references Book(BookId)
	Unique(UId, BookId)
)

drop table if exists CartProduct;
create table CartProduct(
	CPId int primary key identity,
	CartId int not null foreign key references Cart(CartId),
	BookId int not null foreign key references Book(BookId),
	Quantity int
	Unique (CartId, BookId)
)

drop table if exists [Order]
create table [Order](
	OrderId int primary key identity,
	UserId int foreign key references UserInfo(UId),
	CartId int foreign key references Cart(CartId),
	AId int foreign key references Address(AId),
	OrderPrice float,  --Including discounts-coupons and Coins
	OrderDate date default GETDATE(),
	OrderStatus int,
	Coins int default 0, --To be entered by user, how mamny coins he needs to redeem
	Coupon nvarchar(15) foreign key references Coupon(CouponId)
)


------Additional tables---------


create table BookSubmission
(BSId int Identity primary key,
UId int foreign key references UserInfo(UId),
ReviewStatus nvarchar(20) default 'Not Approved',
Title nvarchar(50) not null,
Author nvarchar(50) not null,
Description nvarchar(500) ,
Condition nvarchar(50))


create table Testimonial(
TestimonialId int primary key identity,
Name nvarchar(30),
Review nvarchar(500),
SubmittedAt datetime default GETDATE()
)



create table Review(
ReviewId int primary key identity,
UserId int foreign key references UserInfo(UId) not null,
BookId int foreign key references Book(BookId) not null,
Review nvarchar(500),
Rating int check(Rating <= 5 and Rating >= 0),
SubmittedAt datetime default GETDATE()
)

go
create trigger emptyCart
on [Order]
after insert
as 
begin
declare @id int
select @id=UserId from inserted
insert into Cart values(0)
update UserInfo set CartId=SCOPE_IDENTITY() where UId=@id
end

go
create trigger newCart
on UserInfo
after insert
as 
begin
declare @id int
select @id=UId from inserted
insert into Cart values(0)
update UserInfo set CartId=SCOPE_IDENTITY() where UId=@id
end
