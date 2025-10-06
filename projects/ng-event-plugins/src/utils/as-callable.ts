type Callable = (...args: any[]) => any;

export function asCallable<T>(a: T): Callable & T {
    return a as any;
}
