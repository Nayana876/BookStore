import { Injectable } from "@angular/core";

interface IBook {
  BookId:number,
	CId:number,
	Title :string,
	ISBN :string,
	BookYear:string,
	BRating :number,
	Quantity:number,
	Price :number,
	BDescri:string,
	BPosition:number,   
	BStatus:string,
	BImgFile :string,
	BCondition :string,
	BTags:string,
  Category:any
}

@Injectable({
  providedIn: 'root'
})
export class Book implements IBook{
  Category: any;
  CId!: number;
  ISBN!: string;
  BookYear!: string;
  BRating!: number;
  Quantity!: number;
  Price!: number;
  BDescri!: string;
  BPosition!: number;
  BStatus!: string;
  BImgFile!: string;
  BCondition!: string;
  BTags!: string;
  BookId: number=0;
  Title: string="";
  Author: string="";
  
  
}