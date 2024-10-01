# Angular Event Plugins

[![npm version](https://img.shields.io/npm/v/@taiga-ui/event-plugins.svg)](https://npmjs.com/package/@taiga-ui/event-plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@taiga-ui/event-plugins)](https://bundlephobia.com/result?p=@taiga-ui/event-plugins)
[![Coverage Status](https://codecov.io/gh/taiga-family/ng-event-plugins/branch/main/graphs/badge.svg)](https://app.codecov.io/gh/taiga-family/ng-event-plugins/tree/main/projects)
[![telegram chat](https://img.shields.io/badge/support-Contact%20us-blue)](https://t.me/taiga_ui)

**@taiga-ui/event-plugins** is a tiny (1KB gzip) library for optimizing change detection cycles for performance
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
   - `resize` to watch for elements changing dimensions with `ResizeObserver`

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
import {shouldCall} from '@taiga-ui/event-plugins';

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

4. Angular global events only support `body`, `window` and `document`. You can listen to events on any global object
   with these plugins by replacing `:` with `>` symbol, for example:

```ts
@HostListener('visualViewport>resize', ['$event.target'])
onPinchZoom({ scale }: VisualViewport) {
    console.log(scale)
}
```

5. iOS currently doesn't support the `contextmenu` event. Instead, you can use a custom `longtap` event. This event
   captures the `contextmenu` event on non-iOS devices and simulates similar behavior on iOS devices.

```html
<div (longtap)="showContextMenu($event.detail.clientX, $event.detail.clientY)">Div with context menu</div>
```

> All examples above work the same when used with `@HostListener` and `CustomEvent`

### Important notes

- Predicate is called with the same arguments as the decorated method and in the context of class instance (has access
  to `this`)

- Decorated method will be called and change detection triggered if predicate returns `true`.

- `.silent` modifier will not work with built-in keyboard pseudo-events, such as `keydown.enter` or `keydown.arrowDown`
  since Angular re-enters `NgZone` inside internal handlers.

## Demo

You can try this
[interactive demo](https://codesandbox.io/s/github/taiga-family/ng-event-plugins/tree/main/projects/demo)

You can also read this [detailed article](https://indepth.dev/supercharge-event-management-in-your-angular-application/)
explaining how this library works

## Maintained

**@taiga-ui/event-plugins** is a part of [Taiga UI](https://github.com/taiga-family/taiga-ui) libraries family which is
backed and used by a large enterprise. This means you can rely on timely support and continuous development.

## License

🆓 Feel free to use our library in your commercial and private applications

All **@taiga-ui/event-plugins** packages are covered by [Apache 2.0](/LICENSE)

Read more about this license [here](https://choosealicense.com/licenses/apache-2.0/)
