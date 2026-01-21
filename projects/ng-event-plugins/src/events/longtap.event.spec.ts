import {ChangeDetectionStrategy, Component, type DebugElement} from '@angular/core';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {provideEventPlugins} from '@taiga-ui/event-plugins';

import {LongtapEvent} from '../types/longtap.event';
import {isIos} from '../utils/is-ios';

jest.mock('../utils/is-ios');

describe('LongtapEventPlugin', () => {
    @Component({
        standalone: true,
        template: `
            <div
                id="div1"
                (longtap)="onLongtap($event)"
            ></div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        public readonly onLongtap = jest.fn();
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let div1Element: DebugElement;

    function createComponentBeforeEach(): void {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            div1Element = fixture.debugElement.query(By.css('#div1'));
        });
    }

    beforeEach(() => {
        jest.useFakeTimers();

        TestBed.configureTestingModule({providers: [provideEventPlugins()]});
    });

    describe('if iOS', () => {
        beforeEach(() => {
            jest.mocked(isIos).mockReturnValue(true);
        });

        createComponentBeforeEach();

        describe('when touchdown event fired', () => {
            beforeEach(() => {
                div1Element.nativeElement.dispatchEvent(
                    new TouchEvent('touchstart', {
                        touches: [
                            {
                                clientX: 123,
                                clientY: 321,
                                force: 1,
                                identifier: 0,
                                pageX: 0,
                                pageY: 0,
                                radiusX: 0,
                                radiusY: 0,
                                rotationAngle: 0,
                                screenX: 0,
                                screenY: 0,
                                target: div1Element.nativeElement,
                            },
                        ],
                    }),
                );
            });

            it('should not fire longtap event', () => {
                expect(component.onLongtap).not.toHaveBeenCalled();
            });

            describe('after 700ms', () => {
                beforeEach(() => {
                    jest.advanceTimersByTime(700);
                });

                it('should fire longtap event', () => {
                    expect(component.onLongtap).toHaveBeenCalledWith(
                        new LongtapEvent('longtap', {
                            clientX: 123,
                            clientY: 321,
                        }),
                    );
                });
            });

            describe('when touchmove event fired (with distance less than 15)', () => {
                beforeEach(() => {
                    div1Element.nativeElement.dispatchEvent(
                        new TouchEvent('touchmove', {
                            touches: [
                                {
                                    clientX: 113,
                                    clientY: 321,
                                    force: 1,
                                    identifier: 0,
                                    pageX: 0,
                                    pageY: 0,
                                    radiusX: 0,
                                    radiusY: 0,
                                    rotationAngle: 0,
                                    screenX: 0,
                                    screenY: 0,
                                    target: div1Element.nativeElement,
                                },
                            ],
                        }),
                    );
                });

                it('should not fire longtap event', () => {
                    expect(component.onLongtap).not.toHaveBeenCalled();
                });

                describe('after 700ms', () => {
                    beforeEach(() => {
                        jest.advanceTimersByTime(700);
                    });

                    it('should fire longtap event', () => {
                        expect(component.onLongtap).toHaveBeenCalledWith(
                            new LongtapEvent('longtap', {
                                clientX: 123,
                                clientY: 321,
                            }),
                        );
                    });
                });
            });

            describe('when touchmove event fired (with distance more than 15)', () => {
                beforeEach(() => {
                    div1Element.nativeElement.dispatchEvent(
                        new TouchEvent('touchmove', {
                            touches: [
                                {
                                    clientX: 103,
                                    clientY: 321,
                                    force: 1,
                                    identifier: 0,
                                    pageX: 0,
                                    pageY: 0,
                                    radiusX: 0,
                                    radiusY: 0,
                                    rotationAngle: 0,
                                    screenX: 0,
                                    screenY: 0,
                                    target: div1Element.nativeElement,
                                },
                            ],
                        }),
                    );
                });

                it('should not fire longtap event', () => {
                    expect(component.onLongtap).not.toHaveBeenCalled();
                });

                describe('after 700ms', () => {
                    beforeEach(() => {
                        jest.advanceTimersByTime(700);
                    });

                    it('should not fire longtap event', () => {
                        expect(component.onLongtap).not.toHaveBeenCalled();
                    });
                });
            });

            describe('when touchcancel event fired', () => {
                beforeEach(() => {
                    div1Element.nativeElement.dispatchEvent(
                        new TouchEvent('touchcancel', {touches: []}),
                    );
                });

                it('should not fire longtap event', () => {
                    expect(component.onLongtap).not.toHaveBeenCalled();
                });

                describe('after 700ms', () => {
                    beforeEach(() => {
                        jest.advanceTimersByTime(700);
                    });

                    it('should not fire longtap event', () => {
                        expect(component.onLongtap).not.toHaveBeenCalled();
                    });
                });
            });

            describe('when touchend event fired', () => {
                beforeEach(() => {
                    div1Element.nativeElement.dispatchEvent(
                        new TouchEvent('touchcancel', {touches: []}),
                    );
                });

                it('should not fire longtap event', () => {
                    expect(component.onLongtap).not.toHaveBeenCalled();
                });

                describe('after 700ms', () => {
                    beforeEach(() => {
                        jest.advanceTimersByTime(700);
                    });

                    it('should not fire longtap event', () => {
                        expect(component.onLongtap).not.toHaveBeenCalled();
                    });
                });
            });
        });
    });

    describe('if not iOS', () => {
        beforeEach(() => {
            jest.mocked(isIos).mockReturnValue(false);
        });

        createComponentBeforeEach();

        describe('when contextmenu event fired', () => {
            beforeEach(() => {
                div1Element.nativeElement.dispatchEvent(
                    new MouseEvent('contextmenu', {
                        clientX: 123,
                        clientY: 321,
                    }),
                );
            });

            it('should fire longtap event', () => {
                expect(component.onLongtap).toHaveBeenCalledWith(
                    new LongtapEvent('longtap', {
                        clientX: 123,
                        clientY: 321,
                    }),
                );
            });
        });
    });
});
