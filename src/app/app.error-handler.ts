import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

export class ErrorHandler {

  static handleError(error: Response | any) {
    let errorMessage: string;

    if (error instanceof Response) {
      errorMessage = `Erro ${error.status} - ${error.statusText} ao acessar a URL ${error.url}`;
    } else {
      errorMessage = error.toString();
    }

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

}
