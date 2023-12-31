# Angular Event Plugins

[![npm version](https://img.shields.io/npm/v/@tinkoff/ng-event-plugins.svg)](https://npmjs.com/package/@tinkoff/ng-event-plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@tinkoff/ng-event-plugins)](https://bundlephobia.com/result?p=@tinkoff/ng-event-plugins)
[![Coverage Status](https://codecov.io/gh/taiga-family/ng-event-plugins/branch/main/graphs/badge.svg)](https://app.codecov.io/gh/taiga-family/ng-event-plugins/tree/main/projects)
[![telegram chat](https://img.shields.io/badge/support-Contact%20us-blue)](https://t.me/taiga_ui)

**@tinkoff/ng-event-plugins** is a tiny (1KB gzip) library for optimizing change detection cycles for performance
sensitive events (such as _touchmove_, _scroll_, _drag_ etc.) and declarative _preventDefault()_ and
_stopPropagation()_.

## How to use

1. Add `NG_EVENT_PLUGINS` to your app providers:

   ```typescript
   bootstrapApplication(AppComponent, {
     providers: [NG_EVENT_PLUGINS],
   });
   ```

2. Use new modifiers for events in templates and in `@HostListener`:

   - `.stop` to call stopPropagation() on event
   - `.prevent` to call preventDefault() on event
   - `.self` to skip bubbled events
   - `.silent` to call event handler outside Angular's `NgZone`
   - `.capture` to listen to events in
     [capture phase](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase)
   - `.passive` to add
     [passive event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners)
   - `.once` to remove event listener after first callback

   For example:

   ```html
   <div (mousedown.prevent)="onMouseDown()">Clicking on this DIV will not move focus</div>
   ```

   ```html
   <div (click.stop)="onClick()">Clicks on this DIV will not bubble up</div>
   ```

   ```html
   <div (mousemove.silent)="onMouseMove()">Callbacks to mousemove will not trigger change detection</div>
   ```

   ```html
   <div (click.capture.stop)="onClick()">
     <div (click)="never()">Clicks will be stopped before reaching this DIV</div>
   </div>
   ```

3. You can also re-enter `NgZone` and trigger change detection, using `@shouldCall` decorator that takes a predicate
   function as argument:

```html
<div (scroll.silent)="onScroll($event.currentTarget)">
  Scrolling this DIV will only trigger change detection and onScroll callback if it is scrolled to bottom
</div>
```

```typescript
import {shouldCall} from '@tinkoff/ng-event-plugins';

export function scrollFilter({
 scrollTop, scrollHeight, clientHeight
}: HTMLElement): boolean {
    return scrollTop === scrollHeight - clientHeight;
}

// ...

@shouldCall(scrollFilter)
onScroll(_element: HTMLElement): void {
    this.someService.requestMoreData();
}
```

> All examples above work the same when used with `@HostListener` and `CustomEvent`

### Important notes

- Predicate is called with the same arguments as the decorated method and in the context of class instance (has access
  to `this`)

- Decorated method will be called and change detection triggered if predicate returns `true`.

- `.silent` modifier will not work with built-in keyboard pseudo-events, such as `keydown.enter` or `keydown.arrowDown`
  since Angular re-enters `NgZone` inside internal handlers.

## Observable host bindings

In this library there's also a plugin that enables observable host bindings. Sounds weird to do host binding with event
plugin, but the code is actually pretty simple. You can read more about it in
[this article](https://indepth.dev/posts/1429/making-hostbinding-work-with-observables).

To use it you need to couple `@HostListener` and `@HostBinding` on the same `Observable` property with following syntax:

```ts
@HostBinding('$.disabled')
@HostListener('$.disabled')
readonly disabled$ = asCallable(this.service.loading$)
```

This supports all the native Angular syntax, such as `class.class-name` or `style.width.px`.

**IMPORTANT NOTES:**

- Until [this issue](https://github.com/angular/angular/issues/12045) is resolved you would have to use
  `NO_ERRORS_SCHEMA` in your module in order to bind to arbitrary properties or use `host` in `@Component` decorator:
  ```ts
  @Component({
    // ...
    host: {
      '[$.disabled]': 'disabled$',
      '($.disabled)': 'disabled$',
    },
  })
  ```
- `asCallable` is a utility function from this library that simply adds `Function` to the type so Angular thinks it
  could be a host listener, unnecessary if you use `host` since it is not type checked.
- To bind attributes you need to add `.attr` modifier in the end, not the beginning like in basic Angular binding. This
  is due to Angular using regexp to match for `attr.` string in `@HostBinding` decorator:

```ts
@HostBinding('$.aria-label.attr')
@HostListener('$.aria-label.attr')
readonly label$ = asCallable(this.translations.get$('label'));
```

## Demo

You can try this
[interactive demo](https://codesandbox.io/s/github/taiga-family/ng-event-plugins/tree/main/projects/demo)

You can also read this [detailed article](https://indepth.dev/supercharge-event-management-in-your-angular-application/)
explaining how this library works

## Maintained

**@tinkoff/ng-event-plugins** is a part of [Taiga UI](https://github.com/taiga-family/taiga-ui) libraries family which
is backed and used by a large enterprise. This means you can rely on timely support and continuous development.

## License

🆓 Feel free to use our library in your commercial and private applications

All **@tinkoff/ng-event-plugins** packages are covered by [Apache 2.0](/LICENSE)

Read more about this license [here](https://choosealicense.com/licenses/apache-2.0/)
