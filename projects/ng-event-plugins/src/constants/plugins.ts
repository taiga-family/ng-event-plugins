import type {Provider} from '@angular/core';
import {EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';

import {LongtapEventPlugin} from '../events/longtap.event';
import {DebounceEventPlugin} from '../plugins/debounce.plugin';
import {GlobalEventPlugin} from '../plugins/global.plugin';
import {OptionsEventPlugin} from '../plugins/options.plugin';
import {PreventEventPlugin} from '../plugins/prevent.plugin';
import {ResizePlugin} from '../plugins/resize.plugin';
import {SelfEventPlugin} from '../plugins/self.plugin';
import {SilentEventPlugin} from '../plugins/silent.plugin';
import {StopEventPlugin} from '../plugins/stop.plugin';
import {ThrottleEventPlugin} from '../plugins/throttle.plugin';
import {ZonelessPlugin} from '../plugins/zoneless.plugin';

const PLUGINS = [
    SilentEventPlugin,
    ZonelessPlugin,
    SelfEventPlugin,
    GlobalEventPlugin,
    OptionsEventPlugin,
    PreventEventPlugin,
    ResizePlugin,
    StopEventPlugin,
    LongtapEventPlugin,
    DebounceEventPlugin,
    ThrottleEventPlugin,
];

/**
 * @deprecated: use {@link provideEventPlugins}
 */
export const NG_EVENT_PLUGINS: Provider[] = PLUGINS.map((useClass) => ({
    provide: EVENT_MANAGER_PLUGINS,
    multi: true,
    useClass,
}));

export function provideEventPlugins(): Provider[] {
    return NG_EVENT_PLUGINS;
}
