import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from 'src/items/items.component';
import { PricechangeComponent } from 'src/pricechange/pricechange.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ItemsComponent, PricechangeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // Existing routes
      { path: '', component: ItemsComponent },
      { path: 'price-change', component: PricechangeComponent },
      // Add other routes if needed
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
