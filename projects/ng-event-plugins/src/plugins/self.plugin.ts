import {Injectable} from '@angular/core';
import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class SelfEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = '.self';

    addEventListener(element: HTMLElement, event: string, handler: Function): Function {
        return this.manager.addEventListener(
            element,
            this.unwrap(event),
            (event: Event) => {
                if (event.target === event.currentTarget) {
                    handler(event);
                }
            },
        );
    }
}
