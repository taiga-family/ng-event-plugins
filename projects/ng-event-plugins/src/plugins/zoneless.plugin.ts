import {Injectable} from '@angular/core';

import {SilentEventPlugin} from './silent.plugin';

@Injectable()
export class ZonelessPlugin extends SilentEventPlugin {
    public override readonly modifier = '.zoneless';
}
