import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Output,
} from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: './popup.template.html',
    styleUrls: ['./popup.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
    @Output()
    public readonly closed = new EventEmitter<void>();

    @HostListener('window:keydown.esc')
    protected onEsc(): void {
        this.closed.emit();
    }
}
