import type {EventManager} from '@angular/platform-browser';

// TODO: Type is exposed since Angular 17, remove when updated
type EventManagerArg = ConstructorParameters<typeof EventManager>[0][0];

export type EventManagerPlugin = Pick<EventManagerArg, keyof EventManagerArg>;
