import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  constructor() { }

  private stocks:Stock[] = [
    new Stock(1, '第1支股票', 1.99, 4.5, 'angular', ['IT', 'A']),
    new Stock(2, '第2支股票', 2.99, 3.5, 'angular', ['IT', 'B']),
    new Stock(3, '第3支股票', 3.99, 2.5, 'angular', ['IT', 'A','B']),
    new Stock(4, '第4支股票', 4.99, 1.5, 'angular', ['IT', '互联网']),
    new Stock(5, '第5支股票', 5.99, 3.5, 'angular', ['IT', '互联网'])
  ];

  getStocks():Stock[] {
    return this.stocks;
  }

  getStock(id:number):Stock {
    var stock = this.stocks.find(stock => stock.id == id);
    if(!stock){
      stock = new Stock(0,'',null,0,'',[]);
    }
    return stock;
  }


}

export class Stock {
  constructor(public id: number,
              public name: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {

  }
}
