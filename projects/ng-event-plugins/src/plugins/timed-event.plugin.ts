import {EventManagerPlugin} from '@angular/platform-browser';

export abstract class TimedEventPlugin extends EventManagerPlugin {
    protected abstract readonly regExp: RegExp;

    public supports(event: string): boolean {
        return this.regExp.test(event);
    }

    protected getDelay(event: string): number {
        const match = this.regExp.exec(event);

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

    protected unwrap(event: string): string {
        return event.replace(this.regExp, '');
    }
}
