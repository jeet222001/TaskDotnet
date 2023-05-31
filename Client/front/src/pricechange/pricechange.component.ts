import { Component } from '@angular/core';
import { ItemService } from 'src/item.service';

@Component({
  selector: 'app-pricechange',
  templateUrl: './pricechange.component.html',
  styleUrls: ['./pricechange.component.css'],
})
export class PricechangeComponent {
  items: any[] = []; // Assuming you have the item list available
  // newPriceChange: any = {}; // Object to store new price change
  newPriceChange: any = {
    itemCode: 0,
    barcode: '',
    itemName: '',
    cost: 0,
    price: 0,
    createDate: new Date(),
    updateDate: new Date(),
  }
  ngOnInit(): void {
    this.getItems();
  }

  constructor(private itemService: ItemService) {}

  getItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        items.forEach(element => {
          this.items.push(element);
        });
        console.log('Items retrieved successfully:', items);
      },
      (error) => {
        console.error('Error retrieving items', error);
      }
    );
  }

  addPriceChange(): void {
    const selectedItem = this.items.find(
      (item) => item.itemCode === this.newPriceChange.itemCode
    );
    console.log(selectedItem);
    if (selectedItem) {
      // Apply price change logic to the selected item
      if (this.newPriceChange.changeType === 'increase') {
        if (this.newPriceChange.changeCost) {
          selectedItem.cost +=
            this.newPriceChange.priceType === 'dollar'
              ? this.newPriceChange.amount
              : (selectedItem.cost * this.newPriceChange.amount) / 100;
        }
        if (this.newPriceChange.changePrice) {
          selectedItem.price +=
            this.newPriceChange.priceType === 'dollar'
              ? this.newPriceChange.amount
              : (selectedItem.price * this.newPriceChange.amount) / 100;
        }
      } else if (this.newPriceChange.changeType === 'decrease') {
        if (this.newPriceChange.changeCost) {
          selectedItem.cost -=
            this.newPriceChange.priceType === 'dollar'
              ? this.newPriceChange.amount
              : (selectedItem.cost * this.newPriceChange.amount) / 100;
        }
        if (this.newPriceChange.changePrice) {
          selectedItem.price -=
            this.newPriceChange.priceType === 'dollar'
              ? this.newPriceChange.amount
              : (selectedItem.price * this.newPriceChange.amount) / 100;
        }
      }
      console.log('Price change applied:', selectedItem);
    }

    // Reset the form and object
    this.newPriceChange = {};
  }
}
