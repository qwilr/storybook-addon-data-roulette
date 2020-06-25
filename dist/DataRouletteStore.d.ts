import { IAddonParams } from './index';
declare type Callback = () => any;
export default class DataRouletteStore {
    data: any;
    store: any;
    callbacks: Callback[];
    channel: any;
    timer: number;
    hasSpun: boolean;
    isLoading: boolean;
    initialized: boolean;
    addonParams: IAddonParams;
    error: string;
    initialize(parameters: IAddonParams, channel: any): void;
    has(key: string): boolean;
    set(key: string, value: string): void;
    fetchData(): Promise<void>;
    setSpun(value: boolean): void;
    update(key: string): void;
    get(key: string): any;
    getAll(): any;
    reset(): void;
    markAllUnused(): void;
    subscribe(cb: Callback): void;
    unsubscribe(cb: Callback): void;
}
export {};
