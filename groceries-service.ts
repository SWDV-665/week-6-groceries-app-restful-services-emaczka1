import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroceryServiceProvider {

    items: any = [];

    dataChanged$: Observable<boolean>;

    private dataChangeSubject: Subject<boolean>;

    baseURL = 'http://localhost:8080/api/groceries';

    constructor(public http: HttpClient) {
        console.log("Hello GroceriesServiceProvider Provider");
        this.dataChangeSubject = new Subject<boolean>();
        this.dataChanged$ = this.dataChangeSubject.asObservable();
    }

    getItems(): Observable<object[]> {
        return this.http.get(this.baseURL).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    private extractData(res: any) {
        let body = res;
        return body || {};
    }

    private handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    }

    removeItem(id: string) {
        console.log("#### Remove Item - id = ", id);
        this.http.delete(`${this.baseURL}/${id}`).subscribe(res => {
            this.items = res;
            this.dataChangeSubject.next(true);
        });
    }

    addItem(item: any): Observable<any> {
        return this.http.post(this.baseURL, item).pipe(
          map(this.extractData),
          catchError(this.handleError)
        );
      }
    }


