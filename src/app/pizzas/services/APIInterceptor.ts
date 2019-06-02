import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export class APIInterceptor implements HttpInterceptor {

  private BASE_URL = environment.apiUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: this.BASE_URL + '/' + req.url });
    return next.handle(apiReq);
  }
}
