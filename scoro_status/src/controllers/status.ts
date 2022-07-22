/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
import fetch from "node-fetch";
import { Get, Route, Query } from "tsoa";

interface StatusElement {
  status_id: string,
  status_name: string,
  color: string,
  module: string,
  is_default: number,
  modified_date: string,
}

const _statusCache: { [key: string] : Array<StatusElement>} = {}

interface StatusResponse {
  data: Array<StatusElement>
}

interface RequestParams {
  lang: string,
  company_account_id: string,
  apiKey: string,
  filter? : {module: Array<string>}
}

@Route("api/status")
export default class StatusController {
  @Get("/")
  public async getStatusData(@Query() filter?: string): Promise<StatusResponse> {
    const cacheKey = filter || 'all';
    if (_statusCache[cacheKey]) {
      return {data: _statusCache[cacheKey]};
    }
    const statusesUrl = `${process.env.API_URL_BASE}/statuses/list`
    const requestParams: RequestParams = {
        lang: "eng",
        company_account_id: process.env.COMPANY_ACCOUNT_ID || '',
        apiKey: process.env.API_KEY || ''
    }
    if (filter) {
      requestParams.filter = {
        "module": [
          filter
      ]
      }
    }
    const params = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestParams),
    }
    console.log(statusesUrl, params)

    const response = await fetch(statusesUrl, params)
    if (!response.ok) {
      return {
        data: []
      }
    }

    const result: any = await response.json()
    _statusCache[cacheKey] = result.data
    return {data: result.data};
  }
}
