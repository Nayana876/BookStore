import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homePage/home/home.component';
import { TestimonialComponent } from './homePage/testimonial/testimonial.component';
import { FilterByDisplayComponent } from './shared/books/FilterByDisplay/filter-by-display/filter-by-display.component';
import { FullBooksDisplayComponent } from './shared/books/FullBooksDisplay/full-books-display/full-books-display.component';
import { CategorydisplayComponent } from './shared/category/categorydisplay/categorydisplay.component';
import { CouponHomeComponent } from './coupon/components/coupon-home/coupon-home.component';
import { AdminAuthGuard } from './shared/guards/adminGuard/admin-auth.guard';
import { AuthGuard } from './shared/guards/userGuard/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'testimonial', component: TestimonialComponent },
  { path: 'categories/:cid', component: CategorydisplayComponent },
  { path: 'Books', component: FullBooksDisplayComponent },
  { path: 'Searchbooks/:Filter/:searchText', component: FilterByDisplayComponent },
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'coupon',
    loadChildren: () => import('./coupon/coupon.module').then(m => m.CouponModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
  },
  {
    path: 'book-details',
    loadChildren: () => import('./book-details/book-details.module').then(m => m.BookDetailsModule)
  },
  // {path:'coupon1',component:CouponHomeComponent}
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
