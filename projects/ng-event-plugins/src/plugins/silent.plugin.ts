import type {NgZone} from '@angular/core';
import {Injectable} from '@angular/core';

import {AbstractEventPlugin} from './abstract.plugin';

@Injectable()
export class SilentEventPlugin extends AbstractEventPlugin {
    public static ngZone?: NgZone;

    public readonly modifier = '.silent';

    public addEventListener(
        element: HTMLElement,
        event: string,
        handler: Function,
    ): Function {
        SilentEventPlugin.ngZone = SilentEventPlugin.ngZone ?? this.manager.getZone();

        return SilentEventPlugin.ngZone.runOutsideAngular(() =>
            this.manager.addEventListener(element, this.unwrap(event), handler),
        );
    }
}
