import { Component, OnInit } from '@angular/core';
import { IProducts } from '../products';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  products: IProducts[];
  upproducts: IProducts[] = [];
  selectedProduct : Subject<any> = new Subject;
  total:number = 0;
  delit:number = 0;

  constructor() { 
    this.products = [
      {
        product_id : "001",
        product_img : "data:image/jpeg;base64,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",
        product_name : "WOMEN Uniqlo U Crew Neck Short Sleeve T-Shirt",
        product_price : 30,
        product_details : "Superb style in a single item! A basic t-shirt made from durable material.",
        product_quantity : 0
      },
      {
        product_id : "002",
        product_img : "https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/27_408387.jpg",
        product_name : "WOMEN Skipper Short Sleeve Shirt",
        product_price : 80,
        product_details : "High neckline adds a feminine look. Neat and stylish shirt-type dress.",
        product_quantity : 0
      },
      {
        product_id : "003",
        product_img : "https://de9luwq5d40h2.cloudfront.net/catalog/product/large_image/32_412937.jpg",
        product_name : "WOMEN Cotton Short Sleeve Dress",
        product_price : 90,
        product_details : "This ribbon-belted dress makes a stylish outfit in just one step. marks the waist.",
        product_quantity : 0
      },
      {
        product_id : "004",
        product_img : "https://store.moma.org/dw/image/v2/BBQC_PRD/on/demandware.static/-/Sites-master-moma/default/dw5550b124/images/400666_a.jpg?sw=626&sh=626&sm=cut",
        product_name : "UNIQLO Andy Warhol Gold Banana Striped T-Shirt",
        product_price : 35,
        product_details : "High neckline adds a feminine look. Neat and stylish shirt-type dress.",
        product_quantity : 0
      }
    ];
   }

  ngOnInit() {
    this.totalPrice();
  }

  getpopup(det) {
    this.selectedProduct.next(det);
  }

  delpopup(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].product_id === pid)
      {  
        this.products.splice(i,1);
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }


  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.products[i].product_price * this.products[i].product_quantity);
    }
  }

  add(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].product_id === pid)
      {  
        this.products[i].product_quantity += 1;
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }

  del(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].product_id === pid)
      {  
        this.products[i].product_quantity -= 1;
      }           
    }
    this.totalPrice();
    // console.log(this.products);
  }

}
