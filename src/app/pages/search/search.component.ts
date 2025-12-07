import { Component, inject } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { BookmarksService } from '../../services/bookmarks.service';
import { GithubRepo } from '../../models/github-repo.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private github = inject(GithubService);
  private bookmarkService = inject(BookmarksService);


  query: string = '';
  // results: GithubRepo[] = [];
  results: any = [];

  total_count: number = 0;
  isLoading: boolean = false;



  onSearch() {
    if (!this.query.trim()) {
      this.results = [];
      return;
    }

    this.isLoading = true;
    this.github.searchRepositories(this.query).subscribe({
      next: (res: any) => {
        this.results = res.items;
        console.log(this.results);
        this.total_count = res.total_count;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search failed', err);
        this.isLoading = false;
      }
    });
  }



  addBookmark(repo: GithubRepo) {
    this.bookmarkService.addBookmark({
      id: repo.id,
      name: repo.name,
      description: repo.description || '',
      avatarUrl: repo.avatarUrl || ''
    }).subscribe({
      next: () => {
        console.log(`Bookmarked repo ${repo.name} successfully`);
      },
      error: (err) => {
        console.error('Failed to add bookmark', err);
      }
    });
  }
}
