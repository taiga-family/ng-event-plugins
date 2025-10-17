/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
import {DOCUMENT} from '@angular/common';
import {inject, Injectable, InjectionToken} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

export const GLOBAL_HANDLER = new InjectionToken<(name: string) => EventTarget>(
    ngDevMode ? '[GLOBAL_HANDLER]: Global event target handler' : '',
    {
        factory: () => {
            const document = inject(DOCUMENT);

            return (name) =>
                name
                    .split('.')
                    .reduce((obj, prop) => obj?.[prop], document.defaultView as any);
        },
    },
);

@Injectable()
export class GlobalEventPlugin extends AbstractEventPlugin {
    private readonly handler: Function = inject(GLOBAL_HANDLER);
    protected readonly modifier = '>';

    public addEventListener(_: HTMLElement, event: string, handler: Function): Function {
        return this.manager.addEventListener(
            this.handler(event.split('>')[0]),
            event.split('>')?.[1] ?? '',
            handler,
        );
    }
}
