import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class ResizePlugin extends AbstractEventPlugin {
    public readonly modifier = 'resize';

    public override supports(event: string): boolean {
        return event === 'resize';
    }

    public addEventListener(
        element: HTMLElement,
        event: string,
        handler: ResizeObserverCallback,
    ): () => void {
        if (typeof ResizeObserver === 'undefined' || !(element instanceof Element)) {
            element.addEventListener(event, handler as unknown as EventListener);

            return () =>
                element.removeEventListener(event, handler as unknown as EventListener);
        }

        const observer = new ResizeObserver(handler);

        observer.observe(element);

        return () => observer.disconnect();
    }
}
