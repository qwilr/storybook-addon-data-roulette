import { IAddonParams } from '../index';
export interface ISheetResponse {
    sheets: ISheetMeta[];
    error?: {
        status: string;
    };
}
export interface ISheetMeta {
    properties: {
        title: string;
    };
}
export interface ISheetValues {
    valueRanges: [{
        range: string;
        majorDimension: string;
        values: Array<any>;
    }];
}
export declare type FormattedSheetData = any[][];
export declare function fetchSheetData(parameters: IAddonParams): Promise<any>;
export declare function formatSheetRowsByColumn(data: ISheetValues): FormattedSheetData;
export declare function sheetUrlToId(url: string): string | null;
