# BookStore

Nayana

Ratheesha

Niranjan

Jyothis

- [ ]  Tag based Search - Keywords
- [x]  Point System
    - Wallet
    - Flipkart coins.
    - 5% reward points for every purchase
    - Build up to redeem as a book
- [ ]  Return second hand books to get points.
- [ ]  Rent books, like a library.
- [x]  Reviews, ratings for the books.
- [x]  Details page for each book. Info about the author, reviews.
- [x]  Testimonials for the service.
- [ ]  Coupons for first time users.
- [ ]  Name and Logo
    - [ ]  Give lore of the bookstore on click
    - [ ]  And stats

---

![Untitled](BookStore%20fb3873e72ded4d259bd8e0d335e41f2d/Untitled.png)

---

## Admin Module

1. Admin shall be able to login / logout 

2. There can be pre-define username / password for admin 

3. Admin shall be able to add / edit / delete category 

a. CategoryId 

b. CategoryName 

c. Description 

d. Image

e. Status 

f. Position 

g. CreatedAt

h. BookCount - Set status unavailable when BookCount is 0. Number of unique books in the category. *Triggered only when a new book is added or all the copies of an existing book in the category are sold out.*

4. Category must be sorted by position.

5. Display category only where status is true.

6. Display Category List on Home Page 

7. Search books based on category 

8. Admin can add / edit / delete books 

a. BookId 

b. CategoryId 

c. Title 

d. ISBN 

e. Year 

f. Price 

g. Description 

h. Position 

i. Status 

j. Image

k. Quantity - Set status unavailable when quantity is 0. *Trigger*

9. Admin able to manage user can activate / deactivate account 

10. Admin can be able to view orders place by customer / user 

1. Admin can be able to add coupon code which can be use by customer by placing order

---

## User Module

1. Users need to register

2. User can be able to login / logout

3. User can search for book by name / category / ISBN / Author

4. User can see only book and category if their status is true

5. User can see new books

6. User can see featured book on home page

7. User can create a Wishlist of his / her favorite books

8. User can add books in the cart and place the order

9. User must be login before placing order

10. Can be able to manage the cart, add/ remove and update qty 

11. Can be able to save / edit / delete shipping address 

12. Can be able to apply discount coupon while placing order

---

Books

Title

Author

Category

Year

status - 0

BookSubmissions

- BookId
- ReviewStatus - Under Review
- SubmittedBy - User Id
- *Reward credited upon successful approval by admin*

---

### Todo

- [x]  Intermediate relation table mapping Users and Address.
- [ ]  Indexing
- [x]  Add Address in Orders.
- [ ]  Wallet information in UserInfo
- [ ]  Books Used?
- [ ]  

---

### Triggers

- [ ]  Calculate TotalPrice of Cart
- [ ]  Calculate TotalPrice of Orders
- [ ]  BookCount in Category
- [ ]  Quantity in Books
- [x]  Standard amount of reward points credited upon approval.
- [x]  Points credited when order placed. 5% of total Order price.
- [ ]