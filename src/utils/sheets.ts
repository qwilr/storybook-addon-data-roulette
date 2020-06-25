import { IAddonParams } from '../index';

const API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
const PERMISSION_DENIED = 'PERMISSION_DENIED';

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
  valueRanges: [
    {
      range: string;
      majorDimension: string;
      values: Array<any>;
    }
  ];
}

export type FormattedSheetData = any[][];

export async function fetchSheetData(parameters: IAddonParams) {
  const { sheetUrl, apiKey } = parameters;
  const sheetId = sheetUrlToId(sheetUrl);

  try {
    // Get a list of sheets from the spreadsheet
    const sheetDetails: ISheetResponse = await (
      await fetch(`${API_URL}${sheetId}?key=${apiKey}`)
    ).json();

    if (sheetDetails?.error?.status === PERMISSION_DENIED) {
      throw new Error(PERMISSION_DENIED);
    }

    const sheetTitles = sheetDetails.sheets.map(
      (sheet: ISheetMeta) => sheet.properties.title
    );

    // Get values from each sheet
    const requestUrls = sheetTitles.map((sheet) => {
      const ranges = `&ranges=${sheet}&majorDimension=ROWS`;
      const requestUrl = `${API_URL}${sheetId}/values:batchGet?key=${apiKey}${ranges}`;
      return fetch(requestUrl);
    });

    const responses = await Promise.all(requestUrls);
    const sheetDatasets = await Promise.all(
      responses.map((response) => response.json())
    );

    // Merge sheet data into an object
    const formattedData = sheetDatasets.reduce((acc, curr, index) => {
      const sheetKey = sheetTitles[index];
      acc[sheetKey] = formatSheetRowsByColumn(curr);
      return acc;
    }, {});

    return formattedData;
  } catch (error) {
    if (error.message === PERMISSION_DENIED) {
      console.error('Please set your Sheet URL to public under Share');
    } else {
      console.error('Please enter a valid public Google Sheets URL');
    }

    return null;
  }
}

// Format rows into objects using column headers as keys for each value
export function formatSheetRowsByColumn(
  data: ISheetValues
): FormattedSheetData {
  const { values } = data.valueRanges[0];
  const keys = values?.shift();
  return values?.map((value) =>
    keys.reduce((acc: any, curr: any, index: number) => {
      acc[curr] = value[index];
      return acc;
    }, {})
  );
}

// Grab the sheet id from the url string
export function sheetUrlToId(url: string) {
  if (!url?.includes('://')) return null;

  try {
    const urlObj = new URL(url);
    const id = urlObj.pathname
      .replace('/spreadsheets/d/', '')
      .replace('/edit', '')
      .replace('/', '');
    return id;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
