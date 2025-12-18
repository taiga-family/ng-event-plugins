import {Injectable, type NgZone} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class ZonelessPlugin extends AbstractEventPlugin {
    public static ngZone?: NgZone;

    public readonly modifier: string = '.zoneless';

    public addEventListener(
        element: HTMLElement,
        event: string,
        handler: Function,
    ): Function {
        ZonelessPlugin.ngZone = this.manager.getZone();

        return ZonelessPlugin.ngZone?.runOutsideAngular(() =>
            this.manager.addEventListener(element, this.unwrap(event), handler),
        );
    }
}
