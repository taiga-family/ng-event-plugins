import {inject, NgModule} from '@angular/core';
import {EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';

import {NG_EVENT_PLUGINS} from './constants/plugins';
import {SilentEventPlugin} from './plugins/silent.plugin';

@NgModule({
    providers: NG_EVENT_PLUGINS,
})
export class EventPluginsModule {
    protected static initialized = false;

    constructor() {
        const [plugin] = inject<readonly unknown[]>(EVENT_MANAGER_PLUGINS);

        console.assert(
            !(plugin instanceof SilentEventPlugin) || EventPluginsModule.initialized,
            'EventPluginsModule must come after BrowserModule in imports',
        );

        EventPluginsModule.initialized = true;
    }
}
