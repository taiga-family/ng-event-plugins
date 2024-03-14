export function asCallable<T>(a: T): Function & T {
    return a as any;
}
