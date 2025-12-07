import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { authGuard } from './guards/auth.guard';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [authGuard] // דורש JWT
    },
    {
        path: 'bookmarks',
        component: BookmarksComponent,
        canActivate: [authGuard]
    },
    { path: '', pathMatch: 'full', redirectTo: 'search' },
    { path: '**', redirectTo: 'search' }
];
