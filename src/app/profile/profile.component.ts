import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  showProfile:boolean=false

  UserData: {
    username: string,
    email: string,
    phone: string
  };


  constructor(private router:Router,private Service:ServiceService){
    this.UserData = { username: '', email: '', phone: '' };

    this.GetUserProfileData()

  
    
  }

  ngOnInit(): void {
    
  }

  GetUserProfileData(){
    this.Service.GetAUserData().subscribe((data:any)=>{
      if(data)
        {
          this.UserData.username=data.username
          this.UserData.email=data.email
          this.UserData.phone=data.phone
          console.log(this.UserData);
          
          

        }
    })
  }

  // search(event:any) {
  //   let val  = event?.target?.value
  //   // Filter items based on the search term
  //   if(val=='')
  //     {
  //       this.Products=this.ProductsDup

  //     }
  //     else
  //     {
  //       this.Products = this.ProductsDup.filter((item:any) =>
  //         item.title?.toString().toLowerCase().includes(val.toString().toLowerCase())
  //       );

  //     }
  
  // }


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

  NavigateToHome(){
    this.router.navigate([''])
  }



}
