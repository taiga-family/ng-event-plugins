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
    ): () => void {
        const unwrap = this.unwrap(event);
        const capture = event.includes('.capture');

        element.addEventListener(unwrap, handler, {
            capture,
            once: event.includes('.once'),
            passive: event.includes('.passive'),
        });

        return () => element.removeEventListener(unwrap, handler, {capture});
    }
}
