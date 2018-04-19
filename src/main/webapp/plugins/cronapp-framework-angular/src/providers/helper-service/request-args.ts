import {  RequestOptions } from "@angular/http";

export class RequestArgs {
    method: string;
    url: string;
    data: any;
    headers: RequestOptions;

    constructor(method: string, url: string, data: any, headers: RequestOptions) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.headers = headers;
    }
}