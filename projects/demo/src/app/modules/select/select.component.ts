import {DOCUMENT, NgForOf, NgIf} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    type QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import {shouldCall} from '@taiga-ui/event-plugins';

@Component({
    standalone: true,
    selector: 'custom-select',
    imports: [NgForOf, NgIf],
    templateUrl: './select.template.html',
    styleUrls: ['./select.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class._open]': 'open',
        '[class._focused]': 'focused',
        '(keydown.esc.zoneless)': 'onEsc($event, open)',
        '(focusout.zoneless)': 'onBlur($event.relatedTarget, elementRef.nativeElement)',
    },
})
export class SelectComponent {
    @ViewChild('input')
    private readonly input?: ElementRef;

    @ViewChildren('option')
    private readonly options?: QueryList<ElementRef>;

    private readonly doc = inject(DOCUMENT);
    protected readonly elementRef = inject(ElementRef);
    protected open = false;

    @Input()
    public items: readonly string[] = [];

    @Input()
    public value = '';

    @Output()
    public readonly valueChange = new EventEmitter<string>();

    protected get focused(): boolean {
        return this.elementRef.nativeElement.contains(this.doc.activeElement);
    }

    @shouldCall((_, open) => open)
    protected onEsc(event: KeyboardEvent, _open: boolean): void {
        event.stopPropagation();
        this.input?.nativeElement.focus();
        this.open = false;
    }

    @shouldCall(
        (relatedTarget: Element, nativeElement: HTMLElement) =>
            !nativeElement.contains(relatedTarget),
    )
    protected onBlur(_relatedTarget: Element, _nativeElement: HTMLElement): void {
        this.open = false;
    }

    @shouldCall((element) => element !== document.activeElement)
    protected onMouseMove(element: HTMLElement): void {
        element.focus();
    }

    @shouldCall((currentIndex, length) => currentIndex < length - 1)
    protected onArrowDown(currentIndex: number, _length?: number): void {
        this.options
            ?.find((_item, index) => index === currentIndex + 1)
            ?.nativeElement.focus();
    }

    @shouldCall((currentIndex) => !!currentIndex)
    protected onArrowUp(currentIndex: number): void {
        this.options
            ?.find((_item, index) => index === currentIndex - 1)
            ?.nativeElement.focus();
    }

    protected onClick(): void {
        this.open = !this.open;
    }

    protected onSelect(value: string): void {
        this.input?.nativeElement.focus();
        this.value = value;
        this.valueChange.emit(value);
        this.open = false;
    }

    protected onInputArrowDown(): void {
        if (!this.options?.first) {
            this.open = true;
        } else {
            this.options.first.nativeElement.focus();
        }
    }
}
