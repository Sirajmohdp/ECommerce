import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }




  GetAllCategory(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products/categories');
  }


  GetAllProductsByCategory(category:string){
    return this.http.get('https://fakestoreapi.com/products/category/'+category);
  }

  GetAllProductsByProductId(Pid:number){
    return this.http.get('https://fakestoreapi.com/products/'+Pid);
  }

  GetAllProducts(){
    return this.http.get('https://fakestoreapi.com/products');
  }

  GetAUserData(){
    return this.http.get('https://fakestoreapi.com/users/1');
  }

  // https://fakestoreapi.com/products

  // https://fakestoreapi.com/users/1


  // GetAllCategory(){
  //   this.http.get('https://fakestoreapi.com/products/categories')
  //   .subscribe(
  //     (data) => {
       
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
}
