import { Component } from '@angular/core';
import { ItemService } from 'src/item.service';
interface Item {
  itemCode: number;
  barcode: string;
  itemName: string;
  cost: number;
  price: number;
  createDate: Date;
  updateDate: Date;
}
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  ngOnInit(): void {
    this.getItems();
  }
  constructor(private itemService: ItemService) {}
  items: any[] = []; //
  newItem: Item = {
    itemCode: 0,
    barcode: '',
    itemName: '',
    cost: 0,
    price: 0,
    createDate: new Date(),
    updateDate: new Date(),
  };
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

  addItem(item: any): void {
    this.items.push(item);
    this.itemService.addItem(item).subscribe(
      (items) => {
        console.log('Item Added successfully:', items);
      },
      (error) => {
        console.error('Error Addding items', error);
      }
    );
  }
}
