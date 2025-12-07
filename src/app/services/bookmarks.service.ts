import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookmarkEntry } from '../models/bookmark-entry.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private http = inject(HttpClient);


  getBookmarks(): Observable<BookmarkEntry[]> {
    return this.http.get<BookmarkEntry[]>(`${environment.apiBaseUrl}/bookmarks`);
  }

  addBookmark(entry: BookmarkEntry): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/bookmarks`, entry);
  }
}