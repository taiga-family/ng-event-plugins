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
                name === 'body'
                    ? document.body
                    : (document.defaultView as any)[name] ||
                      document.createElement('div');
        },
    },
);

@Injectable()
export class GlobalEventPlugin extends AbstractEventPlugin {
    private readonly handler = inject<(name: string) => HTMLElement>(GLOBAL_HANDLER);
    protected readonly modifier = '>';

    public addEventListener<T extends Event>(
        _: HTMLElement,
        event: string,
        handler: (event: T) => void,
    ): () => void {
        return this.manager.addEventListener(
            this.handler(event.split('>')[0] ?? ''),
            event.split('>')[1] ?? '',
            handler,
        ) as unknown as () => void;
    }
}
