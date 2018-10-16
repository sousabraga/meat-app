import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private notificationService: NotificationService,
              private injector: Injector,
              private ngZone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message: string = errorResponse.error.message;

      this.ngZone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            this.notificationService.notify(message || "Não autorizado.");
            break;
          case 404:
            this.notificationService.notify(message || "Recurso não encontrado. Verifique o console para mais detalhes.");
            break;
          default:
            this.notificationService.notify("Ocorreu um erro inesperado. Entre em contato com o administrador.");
            break;
        }
      });
    }

    super.handleError(errorResponse);
  }

}
