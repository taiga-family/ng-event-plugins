import {TimedEventPlugin} from './timed-event.plugin';

export class ThrottleEventPlugin extends TimedEventPlugin {
    protected override readonly regExp = /\.throttle~(?<time>\d+)(?<units>ms|s)/;

    public override addEventListener<T extends Event>(
        element: HTMLElement,
        eventName: string,
        handler: (event: T) => void,
    ): () => void {
        let timeout: ReturnType<typeof setTimeout> | undefined;

        const unsubscribe = this.manager.addEventListener(
            element,
            this.unwrap(eventName),
            (event: T): void => {
                if (timeout !== undefined) {
                    return;
                }

                handler(event);

                timeout = setTimeout(() => {
                    timeout = undefined;
                }, this.getDelay(eventName));
            },
        );

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }
}
