import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { Article } from '../models/article.model';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.css']
})
export class DisplayArticleComponent implements OnInit {
 slug:string;
 article:Article ;
 isAuthenticated :Boolean;
  constructor(private http:HttpClient,
    private activatedRoute:ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        this.slug  = params['slug']; 
     
    });
  }
  
  ngOnInit() {
    this.check();
 
    this.getArticle(this.slug).subscribe(json => this.article = json.article);
  

   }

  check(){
    if( window.localStorage['jwtToken']){
      this.isAuthenticated =true ;
    }
    else
    this.isAuthenticated = false;
  }


getArticle(slug): Observable<any> {
  return this.http.get(`http://conduit.productionready.io/api/articles/${this.slug}`);
    
    
}

}
