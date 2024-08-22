import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: './popup.template.html',
    styleUrls: ['./popup.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(window:keydown.esc)': 'onEsc()',
    },
})
export class PopupComponent {
    @Output()
    public readonly closed = new EventEmitter<void>();

    protected onEsc(): void {
        this.closed.emit();
    }
}
