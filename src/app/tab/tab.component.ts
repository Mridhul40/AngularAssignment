import { Component, OnInit } from '@angular/core';
import {Article} from '../models/article.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import {User} from '../models/user.model';
import { map } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  articles :any;
  currentUser: User;
  articleSlug: string = "";
  constructor(private http:HttpClient, private authService: AuthenticationService) { }

  ngOnInit() {
     this.getArticles().subscribe(
       (data:any)=>this.articles =(Object.values(data.articles)));

       this.authService.currentUser.subscribe(
         (userData: User) => {
           this.currentUser = userData;
           console.log(this.currentUser.username);
        }
       );
  }

  getArticles(){
        return this.http.get("http://conduit.productionready.io/api/articles");
  }

  favouriteArticle(slug){
    const headersConfig = {
      headers: new HttpHeaders({
        'Authorization' : `Token ${this.currentUser.token}`})
    };
    console.log(this.currentUser.token)
    this.http.post<any>(`http://conduit.productionready.io/api/articles/${slug}/favorite`,JSON.stringify({}),headersConfig).subscribe(data => this.articleSlug = data.slug);

  }

  getFavouriteClass(slug){
  /*  let favArticles = [];
    this.http.get(`http://conduit.productionready.io/api/articles?favorited=${this.currentUser.username}`).subscribe(data => (data.articles).forEach((art) => {favArticles.push(art.slug)}));

    if(favArticles.indexOf(slug) !== -1){
      return "btnSelected";
    }
    else{
      return "btn";
    }
*/

  }



}
