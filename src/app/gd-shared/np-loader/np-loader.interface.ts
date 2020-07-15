import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";

export interface NpLoaderInterface extends DoCheck {

    isRequesting: boolean;
    isNavigating: boolean; 
    isLoading: boolean;

    ngDoCheck();
}