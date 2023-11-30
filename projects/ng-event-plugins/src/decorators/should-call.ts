import {SilentEventPlugin} from '../plugins/silent.plugin';

export type Predicate<T> = (this: T, ...args: any[]) => boolean;

export function shouldCall<T>(predicate: Predicate<T>): MethodDecorator {
    return (_target, _key, desc: PropertyDescriptor) => {
        const {value} = desc;

        desc.value = function (this: T, ...args: any[]) {
            if (!predicate.apply(this, args)) {
                return;
            }

            if (SilentEventPlugin.ngZone) {
                SilentEventPlugin.ngZone.run(() => value.apply(this, args));
            } else {
                value.apply(this, args);
            }
        };
    };
}
