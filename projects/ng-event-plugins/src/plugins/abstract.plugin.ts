import {type EventManager} from '@angular/platform-browser';

import {type EventManagerPlugin} from '../types/event-manager-plugin';

export abstract class AbstractEventPlugin implements EventManagerPlugin {
    protected abstract readonly modifier: string;

    public manager!: EventManager;

    public abstract addEventListener(
        element: HTMLElement,
        event: string,
        handler: Function,
    ): Function;

    public supports(event: string): boolean {
        return event.includes(this.modifier);
    }

    protected unwrap(event: string): string {
        return event
            .split('.')
            .filter((v) => !this.modifier.includes(v))
            .join('.');
    }
}
