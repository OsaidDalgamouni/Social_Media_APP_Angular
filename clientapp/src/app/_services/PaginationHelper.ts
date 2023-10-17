import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedResult } from "../Modules/pagination";
import { map } from "rxjs";

export function GetPaginationResult<T>(url:string,params:HttpParams,http:HttpClient) {
    const paginatedResult:PaginatedResult<T>=new PaginatedResult<T>
    return http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
        paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    )
  }
 

export function GetPaginationHeader(page: number, itemsPerPage: number) {
  let params = new HttpParams();
       params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);

    return params;
}