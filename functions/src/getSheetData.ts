import { APIGatewayEvent } from 'aws-lambda';
import fetch from 'node-fetch';
import { URL } from "url";

const API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
const PERMISSION_DENIED = 'PERMISSION_DENIED';
const apiKey = process.env.google_sheets_api_key;

interface ISheetResponse {
  sheets: ISheetMeta[];
  error?: {
    status: string;
  };
}

interface ISheetMeta {
  properties: {
    title: string;
  };
}

interface ISheetValues {
  valueRanges: [
    {
      range: string;
      majorDimension: string;
      values: Array<any>;
    }
  ];
}

/**
 * Fetch and format Google Sheets data from a public url
 */
export const handler = async (event: APIGatewayEvent): Promise<any> => {
  // Grab the text parameter.
  const sheetId = sheetUrlToId(event.queryStringParameters?.sheetUrl || '');

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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(formattedData),
    };
  } catch (error) {
    if (error.message === PERMISSION_DENIED) {
      const msg = 'Please set your Sheet URL to public under Share';
      console.log(msg);
      return {
        statusCode: 401,
        body: msg,
      };
    } else {
      const msg = 'Please enter a valid public Google Sheets URL';
      console.log(msg);
      return {
        statusCode: 401,
        body: msg,
      };
    }
  }
};

// Format rows into objects using column headers as keys for each value
function formatSheetRowsByColumn(
  data: ISheetValues
): any[][] {
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
function sheetUrlToId(urlValue: string) {
  if (!urlValue?.includes('://')) return null;

  try {
    const urlObj = new URL(urlValue);
    const id = urlObj.pathname
      .replace('/spreadsheets/d/', '')
      .replace('/edit', '')
      .replace('/', '');
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
}
