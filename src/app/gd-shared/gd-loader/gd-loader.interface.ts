import { DoCheck } from '@angular/core';

export interface GdLoaderInterface extends DoCheck {

    isRequesting: boolean;
    isNavigating: boolean;
    isLoading: boolean;

    ngDoCheck();
}
