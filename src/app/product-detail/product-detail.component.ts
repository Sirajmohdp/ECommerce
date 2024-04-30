import { Component, Inject, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  Products:any[]=[]
  CartItemCount:number=0
   ngOnInit(): void {
     
   }

   constructor
   (
    private service:ServiceService,  
    public dialogRef: MatDialogRef<any>, // MatDialogRef for the modal reference
   @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA for receiving data
   private router :Router
  )
   {
    console.log(this.data);
    this.GetAllProductsByProductId(this.data)
    
   }


   GetAllProductsByProductId(Id:any){
    this.service.GetAllProductsByProductId(Id).subscribe((data:any)=>{
      if(data)
        {
          this.Products.push(data)
          console.log(this.Products);
          
          
        }
        else
        {
          this.Products=[]
        }
    })
   }

   closeDialogConfirmed() {
    this.dialogRef.close('confirmed'); // Close and pass 'confirmed' value
  }

  AddToCart(product:any){
    alert("Added to cart Successfully")
    // this.dialogRef.close({message:product})
    // if (typeof result.message === 'object') {
      let cartItems: any[] = [];
      product.qty = 1
      product.totalprice = product.price  
      // Retrieve existing cart items from local storage
      const storedCartItems = localStorage.getItem('MyCart');
      if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
      }
  
      // Add the new item to the cart
      cartItems.push(product);
  
      // Store the updated cart items back in local storage
      localStorage.setItem('MyCart', JSON.stringify(cartItems));
    // }
  }

  viewCart(){

    this.dialogRef.close()
    this.router.navigate(['cart'])
    
  }

    CheckWhetherAddedToCArtORNot(productid:number):boolean{
      let cartItems: any[] = [];
      
      // Retrieve existing cart items from local storage
      const storedCartItems = localStorage.getItem('MyCart');
      if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);

        this.CartItemCount  = cartItems.filter((x:any)=>x.id == productid).length
        return true
        
      }
      return true
    }
  

}
