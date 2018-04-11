import { Injectable } from "@angular/core";

@Injectable()
export class CommonVariableProvider {

    private session:any;

    userEvents: any = {};
    //Configuration
    config: any = {
        datasourceApiVersion : 2
    };

    startSession(data: string) {
        sessionStorage.setItem("_u", data);
        this.session = JSON.parse(sessionStorage._u);
    }

    getSession() {
        if (!this.session && sessionStorage._u)
            this.session = JSON.parse(sessionStorage._u);

        return this.session;
    }


}