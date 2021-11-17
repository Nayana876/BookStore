import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../../models/address.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})


export class AddressListComponent implements OnInit {

  @Input() addresses: Address[] | undefined;
  selectedAddress: number = -1;

  @Output() onAddressSelect = new EventEmitter<number>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.addresses);
    if (this.addresses == undefined) {
      this.updateAddressList();
    }
  }

  updateAddressList() {
    this.userService.getUserDetails()
      .subscribe((res: any) => {
        this.addresses = res.Addresses;
      })
  }

  selectAddress(id: number): void {
    this.selectedAddress = id;
    this.onAddressSelect.emit(id);
  }
  editAddress(id: number): void {

  }
  deleteAddress(id: number): void {
    this.userService.deleteAddress(id)
      .subscribe((res: any) => {
        this.updateAddressList();
      })
  }
}
