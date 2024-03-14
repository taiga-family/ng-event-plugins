import {NgModule} from '@angular/core';
import type {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';

import {StaticComponent} from './modules/static/static.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: StaticComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledNonBlocking',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
