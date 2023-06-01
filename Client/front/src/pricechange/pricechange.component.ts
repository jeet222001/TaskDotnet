import { Component } from '@angular/core';
import { ItemService } from 'src/item.service';
import { Location } from '@angular/common';
import { PricechangeService } from 'src/pricechange.service';

@Component({
  selector: 'app-pricechange',
  templateUrl: './pricechange.component.html',
  styleUrls: ['./pricechange.component.css'],
})
export class PricechangeComponent {
  items: any[] = []; // Assuming you have the item list available
  newPriceChange: any = {
    itemCode: 0,
    amount: 0,
    changeType: '',
    priceType: '',
    changeCost: false,
    changePrice: false,
    createDate: '',
  };

  constructor(
    private itemService: ItemService,
    private location: Location,
    private pricechangeService: PricechangeService
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
        console.log('Items retrieved successfully:', items);
      },
      (error) => {
        console.error('Error retrieving items', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  addPriceChange(): void {
    const selectedItem = this.items.find(
      (item) => item.itemCode === parseInt(this.newPriceChange.itemCode)
    );
    console.log(this.newPriceChange.itemCode);
    
    console.log(selectedItem);
    console.log(this.items);

    if (selectedItem) {
      // Store old values
      const oldCost = selectedItem.cost;
      const oldPrice = selectedItem.price;

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

      // Store new values
      const newCost = selectedItem.cost;
      const newPrice = selectedItem.price;

      console.log('Price change applied:', selectedItem);

      // Determine the PriceUpdate keyword based on the changes made
      let priceUpdate = '';
      if (oldCost !== newCost) {
        priceUpdate += 'COST ';
      }
      if (oldPrice !== newPrice) {
        priceUpdate += 'PRICE';
      }

      // Make the API request to save the price change and update the PriceUpdate column
      const requestPayload = {
        ItemCode: selectedItem.itemCode,
        OldCost: oldCost,
        IncreaseDecrease: this.newPriceChange.changeType,
        PriceType: this.newPriceChange.priceType,
        PriceUpdate: priceUpdate,
        NewCost: newCost,
        OldPrice: oldPrice,
        NewPrice: newPrice,
        CreatedDate: new Date(),
      };
      console.log('requestPayload', requestPayload);

      this.pricechangeService.addItem(requestPayload).subscribe(
        (response) => {
          console.log('Price change saved successfully:', response);
        },
        (error) => {
          console.error('Error saving price change:', error);
        }
      );
    }

    // Reset the form and object
    this.newPriceChange = {
      itemCode: 0,
      amount: 0,
      changeType: '',
      priceType: '',
      changeCost: false,
      changePrice: false,
      createDate: '',
    };
  }
}
