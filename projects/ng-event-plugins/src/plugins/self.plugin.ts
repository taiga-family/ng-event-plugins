import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class SelfEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = '.self';

    public addEventListener<T extends Event>(
        element: HTMLElement,
        event: string,
        handler: (event: T) => void,
    ): () => void {
        return this.manager.addEventListener(element, this.unwrap(event), (event: T) => {
            if (event.target === event.currentTarget) {
                handler(event);
            }
        }) as unknown as () => void;
    }
}
