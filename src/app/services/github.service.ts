import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GithubRepo } from '../models/github-repo.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private http = inject(HttpClient);


  searchRepositories(query: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/github/search`, {
      params: { query: query }
    })
      .pipe(
        map(res => ({
          items: res.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            avatarUrl: item.owner?.avatar_url || null
          }) as GithubRepo),
          total_count: res.total_count
        }))
      );
  }


  // searchRepositories(query: string): Observable<GithubRepo[]> {
  //   return this.http.get<any>(`${environment.apiBaseUrl}/github/search`, {
  //     params: { query: query }
  //   });
  // }
}
