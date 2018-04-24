import { Component, OnInit, ElementRef, Renderer2, ViewChild,Inject } from '@angular/core';
import { Router } from "@angular/router";
import { environment as env } from '@env/environment';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { NgxSlideshowModule } from 'ngx-slideshow';
import { BooksService } from './books.service';
import {TruncatePipe} from './truncate.pipe';

@Component({
  selector: 'anms-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  versions = env.versions;
  books_rec: any = [];
  books_past: any = [];
  userList: any = [];
  // books_spliced: any = [];
  userList_spliced: any = [];
  selectedUser:any = "";
  loader1:boolean = true;
  loader2:boolean = true;
  constructor(private router: Router, private booksService: BooksService) {



  }

  ngOnInit() {
    this.getUserList();
    

  }
  getUserList(): void {
    this.booksService.getUserList().subscribe(
      data => { this.userList = data;
        this.userList_spliced = this.userList.slice(0,200) 
       this.selectedUser = this.userList[0]
       this.getBooks();
      
      },
      err => console.error(err),
      () => console.log('done loading users')
    );
    
    
  }
  getBooks(user=this.userList[0]):void{
    this.getRecommendedBooksForUser(user);
    this.getPastBooksForUser(user);

  }
  getRecommendedBooksForUser(user=this.userList[0]): void {
    this.loader1 = true;
    this.booksService.getRecommendedBooks(user).subscribe(
      data => { this.books_rec = data 
        // this.books_spliced = this.books;
        this.loader1 =false;
      console.log(data)},
      err => console.error(err),
      () => console.log('done loading recommended books')
    );
   
  }
  getPastBooksForUser(user=this.userList[0]): void {
    this.loader2 = true;
    this.booksService.getPastBooks(user).subscribe(
      data => { this.books_past = data; 
        this.loader2 =false;
      console.log(data)},
      err => console.error(err),
      () => console.log('done loading past books')
    );
   
  }
  private showLoader(): void {
    console.log('Show loader');
  }
  private hideLoader(): void {
    console.log('Hide loader');
  }


  
  openLink(link: string) {
    window.open(link, '_blank');
  }

  OnMatCardClickEvent(number) {
    this.router.navigate(['bprofile']);
  }
}
