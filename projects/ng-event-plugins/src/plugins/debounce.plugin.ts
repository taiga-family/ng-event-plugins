import type {EventManager} from '@angular/platform-browser';

import type {EventManagerPlugin} from '../types/event-manager-plugin';

const regExp = /\.debounce-(?<time>\d+)(?<units>ms|s)/;

export class DebounceEventPlugin implements EventManagerPlugin {
    public manager!: EventManager;

    public addEventListener(
        element: HTMLElement,
        eventName: string,
        handler: Function,
    ): Function {
        let timeout: ReturnType<typeof setTimeout> | undefined;

        return this.manager.addEventListener(
            element,
            this.unwrap(eventName),
            (event: Event): void => {
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    handler(event);
                }, this.getTimeout(eventName));
            },
        );
    }

    public supports(event: string): boolean {
        return regExp.test(event);
    }

    private getTimeout(event: string): number {
        const match = regExp.exec(event);

        if (!match?.groups) {
            throw new Error(`Invalid event: ${event}`);
        }

        const {time, units} = match.groups;

        switch (units) {
            case 'ms':
                return Number(time);
            case 's':
                return Number(time) * 1000;
            default:
                throw new Error(`Invalid event: ${event}`);
        }
    }

    private unwrap(event: string): string {
        return event.replace(regExp, '');
    }
}
