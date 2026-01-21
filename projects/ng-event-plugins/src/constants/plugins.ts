import {type Provider} from '@angular/core';
import {EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';

import {LongtapEventPlugin} from '../events/longtap.event';
import {DebounceEventPlugin} from '../plugins/debounce.plugin';
import {GlobalEventPlugin} from '../plugins/global.plugin';
import {OptionsEventPlugin} from '../plugins/options.plugin';
import {PreventEventPlugin} from '../plugins/prevent.plugin';
import {ResizePlugin} from '../plugins/resize.plugin';
import {SelfEventPlugin} from '../plugins/self.plugin';
import {StopEventPlugin} from '../plugins/stop.plugin';
import {ThrottleEventPlugin} from '../plugins/throttle.plugin';
import {ZonelessPlugin} from '../plugins/zoneless.plugin';

export function provideEventPlugins(): Provider[] {
    return [
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: ZonelessPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: SelfEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: GlobalEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: OptionsEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: PreventEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: ResizePlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: StopEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: LongtapEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: DebounceEventPlugin,
        },
        {
            provide: EVENT_MANAGER_PLUGINS,
            multi: true,
            useClass: ThrottleEventPlugin,
        },
    ];
}
