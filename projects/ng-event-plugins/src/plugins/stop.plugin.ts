import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class StopEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = '.stop';

    public addEventListener(
        element: HTMLElement,
        event: string,
        handler: Function,
    ): Function {
        return this.manager.addEventListener(
            element,
            this.unwrap(event),
            (event: Event): void => {
                event.stopPropagation();
                handler(event);
            },
        );
    }
}
