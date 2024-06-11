import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NG_EVENT_PLUGINS} from '@tinkoff/ng-event-plugins';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {StaticModule} from './modules/static/static.module';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
        StaticModule,
        HighlightModule,
    ],
    declarations: [AppComponent],
    providers: [
        NG_EVENT_PLUGINS,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        {
            provide: APP_BASE_HREF,
            useValue: '',
        },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: async () => import('highlight.js/lib/core'),
                languages: {
                    typescript: async () =>
                        import('highlight.js/lib/languages/typescript'),
                    less: async () => import('highlight.js/lib/languages/less'),
                    xml: async () => import('highlight.js/lib/languages/xml'),
                },
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
