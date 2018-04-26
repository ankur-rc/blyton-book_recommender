import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'bprofile',
  templateUrl: './bprofile.component.html',
  styleUrls: ['./bprofile.component.css']
})
export class BprofileComponent implements OnInit {
  
  slideConfig = { "slidesToShow": 3, "slidesToScroll": 3 };
  book:any = {}
  constructor(private route: ActivatedRoute,private router: Router) { 
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['book']) { 
        console.log(params['book'])
        this.book = JSON.parse(params['book'])
      }
    });

  }

  ngOnInit() {
  }
  afterChange(e) {
    console.log('afterChange');
  }
      

}
