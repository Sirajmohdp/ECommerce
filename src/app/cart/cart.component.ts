import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  CartItems:any[]=[]
  CartItemsDup:any[]=[]
  
  showProfile:boolean=false


  constructor(private router:Router){
    this.GetAllCartItemsFromLocalStorage( )
  }

  ngOnInit(): void {
    
  }

  GetAllCartItemsFromLocalStorage(){
    let cartItems: any[] = [];
      
    // Retrieve existing cart items from local storage
    const storedCartItems = localStorage.getItem('MyCart');
    if (storedCartItems) {
      this.CartItems = JSON.parse(storedCartItems);
      this.CartItemsDup = JSON.parse(JSON.stringify(this.CartItemsDup))
      
    }
  }

  RemoveFromCart(item:any){
    if(confirm('Do you Want to Remove the item from the cart'))
      {
        this.CartItems= this.CartItems.filter((x:any)=>x.id != item.id)

        localStorage.setItem('MyCart',JSON.stringify(this.CartItems))

      }
 

  }

  decreaseQuantity(item:any,i:any){
    if(item.qty==1)
      {
        alert('Value Cannot be less than 1')

      }
      else
      {
        item.qty--
        item.totalprice = item.price*item.qty
        this.CartItems.splice(i,1,item)

      }
    

  }

  increaseQuantity(item:any,i:any){
    item.qty++
    
    item.totalprice = item.price*item.qty
    
    this.CartItems.splice(i,1,item)
    // this.getTotalPrice()

  }

  getTotalItems(){

  }

  getTotalPrice():number{
     return this.CartItems.reduce((total:number,x:any)=>total + x.totalprice,0  )
    }

    search(event:any) {
      let val  = event?.target?.value
      // Filter items based on the search term
      if(val=='')
        {
          this.CartItems=this.CartItemsDup
  
        }
        else
        {
          this.CartItems = this.CartItemsDup.filter((item:any) =>
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

  NavigateToHome(){
    this.router.navigate([''])
  }

  NavigateToProfile(){
    this.router.navigate(['profile'])
  }

  
  

}
