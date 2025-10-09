import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {EventManagerPlugin} from '@angular/platform-browser';

@Injectable()
export abstract class AbstractEventPlugin extends EventManagerPlugin {
    protected abstract readonly modifier: string;

    constructor() {
        super(inject(DOCUMENT));
    }

    public supports(event: string): boolean {
        return event.includes(this.modifier);
    }

    protected unwrap(event: string): string {
        return event
            .split('.')
            .filter((v) => !this.modifier.includes(v))
            .join('.');
    }
}
