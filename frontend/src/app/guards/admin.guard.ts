import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const api = inject(ApiService);
  const router = inject(Router);

  return api.checkAdmin().pipe(
    map(res => {
        if (res.admin) {
        return true; 
      } else {
        router.navigate(['/home']); 
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/home']);
      return of(false);
    })
  )
};

