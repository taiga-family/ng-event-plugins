import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class OptionsEventPlugin extends AbstractEventPlugin {
    protected readonly modifier = 'capture.once.passive';

    public override supports(event: string): boolean {
        return event.includes('.') && !this.unwrap(event).includes('.');
    }

    public addEventListener(
        element: HTMLElement,
        event: string,
        handler: EventListener,
    ): Function {
        element.addEventListener(this.unwrap(event), handler, {
            once: event.includes('.once'),
            passive: event.includes('.passive'),
            capture: event.includes('.capture'),
        });

        return () =>
            element.removeEventListener(
                this.unwrap(event),
                handler,
                event.includes('.capture'),
            );
    }
}
