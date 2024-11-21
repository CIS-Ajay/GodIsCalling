import { Injectable, ErrorHandler } from '@angular/core';
// import { AppGlobalsService } from "./services";

export const ENDPOINT: string = "http://jctoday.com/demo/gicapi/api/";
export const TIMEOUT: number = 60000;

@Injectable()
export class ConfigClass {
    static get getEndpoint() {
        return ENDPOINT;
    }

    static get getTimeout() {
        return TIMEOUT;
    }
}

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    constructor()
    { }
    handleError(error: any) {
        console.log(error);
        // this.myGlobals.dismissLoadingSpinner();
    }
}