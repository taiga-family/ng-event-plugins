import {Injectable, type NgZone} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

/**
 * @deprecated: drop in v5.x
 */
@Injectable()
export class SilentEventPlugin extends AbstractEventPlugin {
    public static ngZone?: NgZone;

    public readonly modifier: string = '.silent';

    public addEventListener<T extends Event>(
        element: HTMLElement,
        event: string,
        handler: (event: T) => void,
    ): () => void {
        SilentEventPlugin.ngZone = this.manager.getZone();

        return SilentEventPlugin.ngZone.runOutsideAngular(() =>
            this.manager.addEventListener(element, this.unwrap(event), handler),
        ) as unknown as () => void;
    }
}
