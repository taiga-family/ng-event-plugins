import {setupZoneTestEnv} from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

if (!('Zone' in global)) {
    require('zone.js');
    require('zone.js/testing');
}
