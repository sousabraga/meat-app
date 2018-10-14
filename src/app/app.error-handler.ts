import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

export class ErrorHandler {

  static handleError(errorResponse: HttpErrorResponse | any) {
    let errorMessage: string;

    if (errorResponse instanceof HttpErrorResponse) {
      errorMessage = `Erro ${errorResponse.status} - ${errorResponse.statusText} ao acessar a URL ${errorResponse.url}`;
    } else {
      errorMessage = errorResponse.toString();
    }

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

}
