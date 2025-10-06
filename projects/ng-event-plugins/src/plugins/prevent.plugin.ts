import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class PreventEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = '.prevent';

    public addEventListener<T extends Event>(
        element: HTMLElement,
        event: string,
        handler: (event: T) => void,
    ): () => void {
        return this.manager.addEventListener(
            element,
            this.unwrap(event),
            (event: T): void => {
                event.preventDefault();
                handler(event);
            },
        ) as unknown as () => void;
    }
}
