import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { json } from 'stream/consumers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  CategoriesList:any[]=[]  
  CategoriesListFilter:any[]=[]
  Products: any[]=[ ]
  CategoryName:any
  showProfile:boolean=false
  CartCount:number=0
  ProductsDup: any[]=[];

  ngOnInit(): void {
    
  }

  constructor(private service:ServiceService,private dialog:MatDialog,private router:Router)
  {
    this.GetAllCategories()
    this.GetAllProducts()

  }

  mouseon()
  {
    // console.log('ssssssssss');
    
    this.showProfile=true
  }

  mouseout(){
    this.showProfile=false
  }

  GetAllCategories(){
    this.service.GetAllCategory().subscribe((data:any)=>{
      if(data)
        {
          this.CategoriesList= data
          this.CategoriesListFilter=JSON.parse(JSON.stringify(this.CategoriesList))

        }
        else
        {
          this.CategoriesList=[]
          this.CategoriesListFilter=[]
        }

    })
  }

  GetAllProducts() {
    // console.log('Category clicked:', category);
    this.service.GetAllProducts().subscribe((data:any)=>{
      if(data)
        {
          this.Products=data
          // this.CategoryName=category
          this.ProductsDup = JSON.parse(JSON.stringify(this.Products))

        }
        else
        {
         this.Products=[]
         this.CategoryName=''
         this.ProductsDup = []
        }
    })
    // Add your logic here
  }

  GetProductsByCategory(category: any) {
    console.log('Category clicked:', category);
    this.service.GetAllProductsByCategory(category).subscribe((data:any)=>{
      if(data)
        {
          this.Products=data
          this.CategoryName=category
          this.ProductsDup = JSON.parse(JSON.stringify(this.Products))

        }
        else
        {
         this.Products=[]
         this.CategoryName=''
         this.ProductsDup = []
        }
    })
    // Add your logic here
  }

  ViewProductDescription(PID:any){
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '99%', // Set the width of the modal
      height:'90%',
      // Other configuration options...
      data:PID
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.message,'The dialog was closed');
      
   
      
    });


  

  }


  search(event:any) {
    let val  = event?.target?.value
    // Filter items based on the search term
    if(val=='')
      {
        this.Products=this.ProductsDup

      }
      else
      {
        this.Products = this.ProductsDup.filter((item:any) =>
          item.title?.toString().toLowerCase().includes(val.toString().toLowerCase())
        );

      }
  
  }


  GetTheCartCount():number
  {
    let cartItems: any[] = [];
      
    // Retrieve existing cart items from local storage
    const storedCartItems = localStorage.getItem('MyCart');
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      return cartItems.length
    }
    return 0

  }


  NavigateToCart(){
    this.router.navigate(['cart'])

  }

  NavigateToProfile(){
    this.router.navigate(['profile'])
  }


  

}
