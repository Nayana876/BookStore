
insert into UserInfo(Fname, LName, Email, UserName, Password, ProfilePic, PhoneNo, Status, Role, Coins) values('AdminFn','AdminLn','a@g.com', 'admin100', 'jack101', 'adminprofilepic','9999999999','active','admin',100)

insert into UserInfo(Email, UserName, Password, Role) values('user1@soti.net', 'user1', 'password', 'user'),
	('user2@soti.net', 'user2', 'password', 'user'),
	('admin@soti.net', 'admin','password', 'admin')



insert into Category(CName) values ('Action'),
	('Drama'),
	('Romance'),
	('Sci-Fi'),
	('Thriller')


insert into Book(CId, Title, Author, Price) values (1, 'Insurgent', 'Veronica Roth', 180),
	(2, 'Merchant of Venice', 'Shakespere', 150),
	(3, 'Me Before You', 'Jojo Meyers', 300),
	(4, 'Martian', 'Science Guy', 200),
	(5, 'IT', 'Stephen King', 120),
	(1, 'Divergent', 'Veronica Roth', 450),
	(2, 'Othello', 'Shakespere', 980)

insert into Wishlist values(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 1)

select * from Wishlist

insert into CartProduct values(1, 1, 1),
	(1, 2, 2),
	(1, 3, 3),
	(1, 4, 4),
	(1, 5, 5),
	(1, 6, 6)


insert into Coupon values('FIRST50', 50, 300, 400, '20211231'),
	('READ30', 30, 400, 200, '20211031')
	
insert into Address values(1, 'Jyothis P', 'Lexus Apartments 1F', 'Millumpadi', 'Kakkanad', 'Kerala', 'India', '9876543210', '682022'),
	(1, 'Martin George', 'Lexus Apartments 2C', 'Millumpadi', 'Kakkanad', 'Kerala', 'India', '9876543210', '682022')


