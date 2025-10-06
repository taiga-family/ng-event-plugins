import {TimedEventPlugin} from './timed-event.plugin';

export class DebounceEventPlugin extends TimedEventPlugin {
    protected override readonly regExp = /\.debounce~(?<time>\d+)(?<units>ms|s)/;

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
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    handler(event);
                }, this.getDelay(eventName));
            },
        );

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }
}
