export class Resource {
    public tag: string;
    public name: string;
    public version: string;
    public path: string;
    public var: string;
}

export class Bundle {
    public dependencies: Array<string>;
    public resources: Array<Resource>;
}
