import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BACKEND_URL } from '../app/app.config';
import { ParcelCreateRequest } from '../utils/createParcelRequest';
import { catchError, map, Observable, tap } from 'rxjs';
import { handleError } from '../error/handleError';
import { Parcel, ParcelDashboardRow, ParcelPageResponse ,DeleteResponse} from '../utils/parcel';

type SuccessResponse = string;
@Injectable({
  providedIn: 'root'
})
export class ParcelsService {

  constructor(@Inject(BACKEND_URL) apiUrl: string) { 
     this.apiUrl = apiUrl;
     console.log('DataService initialized with URL:', this.apiUrl);
  }

  private apiUrl: string;
  private http = inject(HttpClient);


  public createParcel(createParcel: ParcelCreateRequest):Observable<SuccessResponse>{
    console.log(createParcel);
    
    const url = `${this.apiUrl}/parcel/`;
    return this.http.post<string>(
      url,
      createParcel,
      {responseType : 'text' as 'json'}
    )
    .pipe(
      catchError(handleError)
    );
  }


  public getParcels(): Observable<ParcelDashboardRow[]> {
  const url = `${this.apiUrl}/parcel/`;

  // 1. Tell HttpClient to expect an array of the base Parcel type
  return this.http.get<Parcel[]>(url).pipe(
    map((parcels: Parcel[]) => 
      parcels.map((p): ParcelDashboardRow => ({
        // Mapping backend fields to your specific UI type
        cost: p.cost,
        trackingNumber: p.trackingNumber?.toString() || '', // Ensure it's a string for routerLink
       
        senderAddress: p.senderAddress,
        recieverAddress: p.recieverAddress,
       
        status:p.status
      }))
    )
  );
}

/**
   * Maps a backend Parcel entity to the dashboard row model
   */
  private mapToDashboardRow(parcel: Parcel): ParcelDashboardRow {
    return {
      trackingNumber: parcel.trackingNumber,
      senderAddress:parcel.senderAddress,
      recieverAddress:parcel.recieverAddress,
    cost: parcel.cost,
    status:parcel.status
    };
  }


  public getParcelsWithFilter(
    pageNo: number = 0,
    pageSize: number = 10,
    direction: 'asc' | 'desc' = 'desc',
     sortColumn?: string,
    searchText?: string,
    searchColumns?: string[]

  ): Observable<ParcelPageResponse>{
  

    const url = `${this.apiUrl}/parcel/h2`;

    // Build query parameters
    let params = new HttpParams()
      .set('page', pageNo.toString())
      .set('size', pageSize.toString())
      .set('sortDir', direction);
     
      // 2. Add optional sort column
    if (sortColumn) {
      params = params.set('sortColumn', sortColumn);
    }
      
    // 3. Add search text
    if (searchText) {
      params = params.set('searchText', searchText);
    }

    // 4. Convert Array ['from', 'to'] to String "from,to"
    if (searchColumns && searchColumns.length > 0) {
      params = params.set('searchColumns', searchColumns.join(','));
    }

      return this.http.get<any>(url, {params}).pipe(
        map(
          response =>({
            parcels: (response.parcels || []).map((p: Parcel) => this.mapToDashboardRow(p)),
            currentPage: response.currentPage,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
      pageSize: response.pageSize,
      hasNext: response.hasNext,
      hasPrevious: response.hasPrevious
          })
        ),
        catchError(handleError)
      )
  }


  deleteParcelByTrackingNumber(trackingNumber:string):Observable<DeleteResponse>{
    const url = `${this.apiUrl}/parcel/${trackingNumber}`;
     return this.http.delete<DeleteResponse>(url);
  }



  getParcelByTrackingNumber(trackingNumber: string) {
  return this.http.get<Parcel>(
    `${this.apiUrl}/parcel/find/${trackingNumber}`
  );
}


updateParcelByTrackingNumber(
  trackingNumber: string,
  payload: any
) {
  return this.http.put<any>(
    `${this.apiUrl}/parcel/${trackingNumber}`,
    payload
  );
}
  
}
