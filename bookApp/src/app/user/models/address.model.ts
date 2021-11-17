import { Injectable } from "@angular/core";

interface IAddress {
    AId: number,
    UId: number,
    Name: string,
    Building: string,
    Street: string,
    City: string,
    State: string,
    Country: string,
    PhoneNo: string,
    Pincode: number,
    Selected: boolean
}

@Injectable({
    providedIn: "root"
})
export class Address implements IAddress{
    AId!: number;
    UId!: number;
    Name!: string;
    Building!: string;
    Street!: string;
    City!: string;
    State!: string;
    Country!: string;
    PhoneNo!: string;
    Pincode!: number;
    Selected: boolean = false;
}
