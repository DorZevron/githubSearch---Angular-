import { Routes } from '@angular/router';

export const routes: Routes = [
    // { path: 'login', component: LoginComponent },
    // {
    //     path: 'search',
    //     component: SearchComponent,
    //     canActivate: [authGuard] // דורש JWT
    // },
    // {
    //     path: 'bookmarks',
    //     component: BookmarksComponent,
    //     canActivate: [authGuard]
    // },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', redirectTo: 'login' }
];
