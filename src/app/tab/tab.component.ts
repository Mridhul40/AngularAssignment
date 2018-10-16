import { Component, OnInit } from '@angular/core';
import {Article} from '../models/article.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  articles :any;
  constructor(private http:HttpClient) { }
  
  ngOnInit() {
     this.getArticles().subscribe(
       (data:any)=>this.articles =(Object.values(data.articles)));
     
  }

  getArticles(){
        return this.http.get("http://conduit.productionready.io/api/articles");
  }

  

}
