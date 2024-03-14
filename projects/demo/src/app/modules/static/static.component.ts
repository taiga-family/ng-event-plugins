import type {AfterViewChecked} from '@angular/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'static',
    templateUrl: './static.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent implements AfterViewChecked {
    protected readonly typescript = import('!!raw-loader!../select/select.component.ts');

    protected readonly html = import('!!raw-loader!../select/select.template.html');

    protected readonly items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    protected popup = false;

    public ngAfterViewChecked(): void {
        console.info('change detection cycle', Date.now());
    }

    protected onOpened(): void {
        this.popup = true;
    }

    protected onClosed(): void {
        this.popup = false;
    }
}
