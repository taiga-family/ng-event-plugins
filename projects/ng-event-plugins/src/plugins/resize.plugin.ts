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
        _: string,
        handler: Function,
    ): Function {
        if (typeof ResizeObserver === 'undefined' || !(element instanceof Element)) {
            return () => {};
        }

        const observer = new ResizeObserver((e) =>
            this.manager.getZone().run(() => handler(e)),
        );

        observer.observe(element);

        return () => observer.disconnect();
    }
}
