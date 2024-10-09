interface LongtapEventInit extends EventInit {
    clientX: number;
    clientY: number;
}

export class LongtapEvent extends CustomEvent<{
    clientX: number;
    clientY: number;
}> {
    constructor(type: string, {clientX, clientY, ...eventInitDict}: LongtapEventInit) {
        super(type, {...eventInitDict, detail: {clientX, clientY}});
    }
}
