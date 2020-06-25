import { FC } from 'react';
interface IPanelProps {
    active: any;
    api: any;
}
export declare const initialState: {
    spinIndex: number;
    loading: boolean;
    items: {};
    error: string;
    sheetUrl: string;
};
declare const Panel: FC<IPanelProps>;
export declare function useAddonChannelEvents(addonState: any, setAddonState: (state: any) => void): any;
export default Panel;
