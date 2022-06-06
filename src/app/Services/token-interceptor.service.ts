import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    let newHeaders = req.headers;
    newHeaders = newHeaders.append(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    if (token) {
      newHeaders = newHeaders.append("Authorization", `Token ${token}`);
      const authReq = req.clone({ headers: newHeaders });
      return next.handle(authReq);
    }
    const request = req.clone({ headers: newHeaders });
    return next.handle(request);
  }
}
