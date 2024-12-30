export interface NSEReport {
  id: string;
  name: string;
  description: string;
}

export interface NSEDataResponse {
  data: NSEDataRow[];
  error?: string;
}

export interface NSEDataRow {
  date: string;
  values: string[];
}

export interface NSERequestParams {
  reportId: string;
  startDate: string;
  endDate: string;
}