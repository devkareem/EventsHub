import{Injectable}from '@angular/core';
import{HttpEvent,HttpInterceptor,HttpHandler,HttpRequest}from '@angular/common/http';
import{Observable} from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token=localStorage.token;
        if(token){
            const x_token_id=req.clone({headers:req.headers.set('x-token-id',token)});
            return next.handle(x_token_id);
        }else{
            return next.handle(req.clone());
        }
    }
}