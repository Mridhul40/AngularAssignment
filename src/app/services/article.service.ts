import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': "Token "+localStorage.jwtToken
   
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  addArticle(title , description , content , tag){
    return this.http.post('http://conduit.productionready.io/api/articles',
    {"article":
       {"title":title,
         "description":description,
         "body": content,
         "tagList":tag
       }
    },httpOptions
);
  }
}
