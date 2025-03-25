import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

import {AppComponent} from './app/app.component';
import {StaticComponent} from './app/modules/static/static.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideEventPlugins(),
        provideAnimations(),
        provideRouter(
            [
                {
                    path: '',
                    component: StaticComponent,
                },
            ],
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
        ),
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
}).catch((err: unknown) => console.error(err));
