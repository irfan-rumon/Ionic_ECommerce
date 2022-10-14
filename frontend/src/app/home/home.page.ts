import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProductApiService } from '../servicesApi/product-api.service';
import { ActivatedRoute } from '@angular/router';
// import { Observable, map, BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild(IonModal) modal: IonModal;

  allProducts:any[]; //mine
  searchedProduct: string;
  products:any[] = [];
  tempProducts:any[] = [];
  cart:any[] = [];
  message = "hello world";
  name:string;
  cartCount: number = 0;
  cls:any = {
    'Phone' : true,
    'Perfume' : false,
    'Cloth' : false,
    'Watch' : false
  }

  constructor(private http: HttpClient,
              private productApi: ProductApiService, 
            
    
    ) {}

  slideOptions = {
    freeMode: true,
    centeredSlides: true,
    loop: true,
    slidesOffsetBefore: 11,
    spaceBetween: 10,
    pager: true
  }
  ngOnInit(){

   this.productApi.getProducts().subscribe(  (response)=>{
       this.allProducts = response.data;
       console.log("Here all products: ", this.allProducts);
   })

   this.http.get<any[]>(`${environment.baseURL}/products.json`).subscribe(res =>{
     let arr = Object.entries(res);
    for(let [x,y] of arr){
      this.products.push(y);
    }
    this.tempProducts = this.allProducts;
    console.log(this.products);
   });
  }


  onSearch(){
    console.log("User searched for...", this.searchedProduct);
  }



  addToCart(item:any){
    if(this.cart.includes(item)){
      return;
    }
    this.cartCount += 1;
    this.cart.push(item);
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  changeQuantity(product:any,value:number){
    product.quantity += value;
    this.cartCount += value;
    if(product.quantity === 0){
      this.cart = this.cart.filter(c => c.id !== product.id);
      console.log(this.cart);
      return;
    }
  }
  filter(catagory:string){
    let clsArr = Object.keys(this.cls);

    for(let x of clsArr){
      this.cls[x] = false;
    }
    
    this.cls[catagory] = true;
    this.allProducts = this.tempProducts;
    
    this.allProducts = this.allProducts.filter(prod => prod.catagory === catagory);
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
