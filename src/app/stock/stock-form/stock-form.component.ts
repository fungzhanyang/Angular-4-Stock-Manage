import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Stock, StockService} from '../stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock:Stock;

  constructor(private router:Router, private routerInfo:ActivatedRoute, private stockService:StockService) { }

  ngOnInit() {
    let stockId= this.routerInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    this.router.navigateByUrl('/stock');
  }
}
