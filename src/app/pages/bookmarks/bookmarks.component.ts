import { Component, inject } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarkEntry } from '../../models/bookmark-entry.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule, MatCardModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {

  private bookmarksService = inject(BookmarksService);

  bookmarks: BookmarkEntry[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.loadBookmarks();
  }

  loadBookmarks() {
    this.isLoading = true;
    this.bookmarksService.getBookmarks().subscribe({
      next: (data) => {
        this.bookmarks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load bookmarks', err);
        this.isLoading = false;
      }
    });
  }
}
