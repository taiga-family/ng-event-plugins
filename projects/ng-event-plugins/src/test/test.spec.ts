import {ChangeDetectionStrategy, Component, ElementRef, inject} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import {BehaviorSubject, identity} from 'rxjs';

import {shouldCall} from '../decorators/should-call';
import {SilentEventPlugin} from '../plugins/silent.plugin';
import {asCallable} from '../utils/as-callable';

describe('EventManagers', () => {
    @Component({
        standalone: true,
        template: `
            <div
                class="wrapper"
                (click)="onWrapper($any($event))"
            >
                <div
                    id="stopped-clicks"
                    class="element"
                    (click.stop)="onStoppedClick()"
                ></div>
                <div
                    id="prevented-clicks"
                    class="element"
                    (click.prevent)="onPreventedClick()"
                ></div>
                <div
                    id="filtered-clicks"
                    class="element"
                    (click.zoneless)="onFilteredClicks($event.bubbles)"
                ></div>
            </div>
            <div
                class="wrapper"
                (click.capture.stop)="(0)"
            >
                <div
                    id="captured-clicks"
                    class="element"
                    (click)="onCaptured()"
                ></div>
            </div>
            <div
                class="wrapper"
                (click.self)="onBubbled()"
            >
                <div
                    id="bubbled-clicks"
                    class="element"
                    (click)="(0)"
                ></div>
            </div>
            <div
                id="debounce-clicks-ms"
                (click.debounce-300ms)="onDebounceClicks($event)"
            ></div>
            <div
                id="debounce-clicks-s"
                (click.debounce-3s)="onDebounceClicks($event)"
            ></div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: {
            '[$.data-value.attr]': 'test',
            '($.data-value.attr)': 'test',
            '[$.tabIndex]': 'test',
            '($.tabIndex)': 'test',
            '[$.style.marginTop.%]': 'test',
            '($.style.marginTop.%)': 'test',
            '[$.class.active]': 'test',
            '($.class.active)': 'test',
            '(document>custom)': 'onCustom()',
            '(document:click.zoneless.stop.prevent)': 'onFilteredClicks($event)',
        },
    })
    class TestComponent {
        public readonly test = asCallable(new BehaviorSubject<number | null>(1));

        public flag = false;
        public custom = false;
        public readonly onStoppedClick = jest.fn();
        public readonly onPreventedClick = jest.fn();
        public readonly onWrapper = jest.fn();
        public readonly onCaptured = jest.fn();
        public readonly onBubbled = jest.fn();
        public readonly onDebounceClicks = jest.fn<(event: MouseEvent) => void>();
        public readonly elementRef = inject(ElementRef<HTMLElement>);

        @shouldCall((bubbles) => bubbles)
        public onFilteredClicks(_bubbles: boolean): void {
            this.flag = true;
        }

        public onCustom(): void {
            this.custom = true;
        }
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        jest.useFakeTimers();

        TestBed.configureTestingModule({
            providers: [provideEventPlugins()],
            imports: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('global events work', () => {
        const event = new CustomEvent('custom');

        document.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.custom).toBe(true);
    });

    it('clicks are stopped', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#stopped-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.onWrapper).not.toHaveBeenCalled();
        expect(testComponent.onStoppedClick).toHaveBeenCalled();
    });

    it('clicks go through with default prevented', () => {
        const event = new Event('click', {bubbles: true, cancelable: true});
        const element = fixture.debugElement.query(
            By.css('#prevented-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.onPreventedClick).toHaveBeenCalled();
        expect(testComponent.onWrapper).toHaveBeenCalled();
    });

    it('clicks are filtered', () => {
        const event = new Event('click');
        const element = fixture.debugElement.query(
            By.css('#filtered-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.flag).toBe(false);
    });

    it('clicks go through filtered', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#filtered-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.flag).toBe(true);
    });

    it('clicks are captured', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#captured-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.onCaptured).not.toHaveBeenCalled();
    });

    it('clicks are debounced (ms)', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#debounce-clicks-ms'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        jest.advanceTimersByTime(299);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(testComponent.onDebounceClicks).toHaveBeenCalledWith(event);
    });

    it('multiple clicks are debounced (ms)', () => {
        const firstEvent = new CustomEvent('click', {bubbles: true, detail: {data: 1}});
        const secondEvent = new CustomEvent('click', {bubbles: true, detail: {data: 2}});
        const element = fixture.debugElement.query(
            By.css('#debounce-clicks-ms'),
        ).nativeElement;

        element.dispatchEvent(firstEvent);
        fixture.detectChanges();

        jest.advanceTimersByTime(299);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        element.dispatchEvent(secondEvent);
        fixture.detectChanges();

        jest.advanceTimersByTime(1);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        jest.advanceTimersByTime(298);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(testComponent.onDebounceClicks).toHaveBeenCalledWith(secondEvent);
        expect(testComponent.onDebounceClicks.mock.calls[0]?.[0].detail).toEqual({
            data: 2,
        });
    });

    it('clicks are debounced (s)', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#debounce-clicks-s'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        jest.advanceTimersByTime(2999);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(testComponent.onDebounceClicks).toHaveBeenCalledWith(event);
    });

    it('multiple clicks are debounced (s)', () => {
        const firstEvent = new CustomEvent('click', {bubbles: true, detail: {data: 1}});
        const secondEvent = new CustomEvent('click', {bubbles: true, detail: {data: 2}});
        const element = fixture.debugElement.query(
            By.css('#debounce-clicks-s'),
        ).nativeElement;

        element.dispatchEvent(firstEvent);
        fixture.detectChanges();

        jest.advanceTimersByTime(2999);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        element.dispatchEvent(secondEvent);
        fixture.detectChanges();

        jest.advanceTimersByTime(1);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        jest.advanceTimersByTime(2998);

        expect(testComponent.onDebounceClicks).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(testComponent.onDebounceClicks).toHaveBeenCalledWith(secondEvent);
        expect(testComponent.onDebounceClicks.mock.calls[0]?.[0].detail).toEqual({
            data: 2,
        });
    });

    it('self listeners not triggered on bubbled events', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(
            By.css('#bubbled-clicks'),
        ).nativeElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.onBubbled).not.toHaveBeenCalled();
    });

    it('self listeners triggered on events originated on the same element', () => {
        const event = new Event('click', {bubbles: true});
        const element = fixture.debugElement.query(By.css('#bubbled-clicks'))
            .nativeElement.parentElement;

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(testComponent.onBubbled).toHaveBeenCalled();
    });

    describe('shouldCall does not crash without zone', () => {
        class Test {
            public flag = false;

            @shouldCall(identity)
            public test(flag: boolean): void {
                this.flag = flag;
            }
        }

        it('and calls the method', () => {
            const test = new Test();

            test.test(true);

            expect(test.flag).toBe(true);
        });

        it('and doesnt call the method', () => {
            const test = new Test();

            test.flag = true;

            test.test(false);

            expect(test.flag).toBe(true);
        });
    });

    it('@shouldCall works without NgZone', () => {
        class Test {
            public flag = false;

            @shouldCall(identity)
            public test(flag: boolean): void {
                this.flag = flag;
            }
        }

        const test = new Test();
        const zone = SilentEventPlugin.ngZone;

        SilentEventPlugin.ngZone = undefined;

        test.test(true);

        SilentEventPlugin.ngZone = zone;

        expect(test.flag).toBe(true);
    });
});
