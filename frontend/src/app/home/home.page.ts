import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProductApiService } from '../servicesApi/product-api.service';
import { CartService } from '../servicesApi/cart.service';
import { AuthorizationService } from '../servicesApi/authorization.service';
// import { Observable, map, BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild(IonModal) modal: IonModal;

  allProducts:any[]; //mine
  smartPhones:any[] = [];
  searchedProduct: string;
  products:any[] = [];
  tempProducts:any[] = [];
  cart:any[] = [];
  message = "hello world";
  name:string;
  cartNum: number = 0;
  cls:any = {
    'Smartphone' : false,
    'Perfume' : false,
    'Cloth' : false,
    'Watch' : false
  }

  constructor(private http: HttpClient,
              private productApi: ProductApiService, 
              private cartApi: CartService,
              private auth: AuthorizationService
    
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
       for(let pr of this.allProducts){
          if(pr.catagory == "Smartphone")
               this.smartPhones.push(pr);
       }
   })

   this.http.get<any[]>(`${environment.baseURL}/products.json`).subscribe(res =>{
     let arr = Object.entries(res);
    for(let [x,y] of arr){
      this.products.push(y);
    }
    this.tempProducts = this.allProducts;
    console.log(this.products);
   });

      this.cartApi.getCartProducts().subscribe( (response:any)=>{
        let allcarts: any[] = response.data;
        for(let cp of allcarts){
            if( cp.userID == this.auth.getUserPayload().sub){
                this.cartNum += +cp.quantity;
            }
        }
       
      })   

  }

 


  onSearch(){
    console.log("User searched for...", this.searchedProduct);
  }



  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
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
