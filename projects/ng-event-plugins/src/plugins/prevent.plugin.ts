import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class PreventEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = '.prevent';

    public addEventListener(
        element: HTMLElement,
        event: string,
        handler: Function,
    ): Function {
        return this.manager.addEventListener(
            element,
            this.unwrap(event),
            (event: Event): void => {
                event.preventDefault();
                handler(event);
            },
        );
    }
}
