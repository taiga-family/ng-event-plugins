import {ZonelessPlugin} from '../plugins/zoneless.plugin';

export function shouldCall<T>(predicate: (this: T, ...args: any[]) => boolean): any {
    return (
        original: Function,
        _context: ClassMethodDecoratorContext,
        desc?: PropertyDescriptor,
    ): any => {
        const value = desc?.value || original;
        const result = function (this: T, ...args: any[]): void {
            if (!predicate.apply(this, args)) {
                return;
            }

            if (ZonelessPlugin.ngZone) {
                ZonelessPlugin.ngZone.run(() => value.apply(this, args));
            } else {
                value.apply(this, args);
            }
        };

        if (!desc) {
            return result;
        }

        desc.value = result;
    };
}
