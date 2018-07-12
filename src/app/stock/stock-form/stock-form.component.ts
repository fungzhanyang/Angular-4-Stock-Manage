import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Stock, StockService} from '../stock.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel:FormGroup;

  stock:Stock;

  categories = ['IT','A','B'];

  submitted:boolean;

  constructor(private router:Router, private routerInfo:ActivatedRoute, private stockService:StockService) { }

  ngOnInit() {
    this.submitted=false;
    let stockId= this.routerInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);

    let fb = new FormBuilder();
    this.formModel =  fb.group({
      name:[this.stock.name,[Validators.required,Validators.minLength(6)]],
      price:[this.stock.price,[Validators.required,Validators.min(10)]],
      desc:[this.stock.desc],
      categories:fb.array([
        new FormControl(this.stock.categories.indexOf(this.categories[0])!=-1),
        new FormControl(this.stock.categories.indexOf(this.categories[1])!=-1),
        new FormControl(this.stock.categories.indexOf(this.categories[2])!=-1)
      ],this.categoriesSelectValidator)
    });
  }

  categoriesSelectValidator(control:FormArray){
    var valid=false;
    control.controls.forEach(control=>{
      if(control.value){
        valid = true;
      }
    })
    if (valid){
      return null;
    }else {
      return {categoriesLength:true};
    }
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    if(this.formModel.invalid){
      this.submitted=true;
      return;
    }
    var chineseCategories =[];
    var index = 0;
    for (var i = 0; i<3 ;i++){
      if(this.formModel.value.categories[i]){
        chineseCategories[index++]=this.categories[i];
      }
    }
    this.formModel.value.categories=chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    console.log("提交到服务器。。。");
    console.log(this.formModel.value);
    // this.router.navigateByUrl('/stock');
  }
}
