import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { ConfigClass, AppGlobalsService } from "./services";

@Injectable()
export class TextServices {
    constructor(private http: HttpClient, private myglobals: AppGlobalsService) { }

    socialArr: any = [];

    getAllText(pageNo: number, size: number): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}text/${pageNo}/${size}`).toPromise();
    }

    getUserFav(id: string): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}favorite/${id}`).toPromise();
    }

    deleteFav(id: string): Promise<any> {
        return this.http.delete<any>(`${ConfigClass.getEndpoint}favorite/delete/${id}`).toPromise().then(res => {
            if (res === null) {
                return true; // or adjust according to your logic
            }
            return res;
        });
    }

    addUserFav(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>(`${ConfigClass.getEndpoint}favorite/create`, JSON.stringify(data), { headers }).toPromise();
    }

    getDayText(): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}todaytext`).toPromise();
    }

    getSelectedDayText(day: number, month: number): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}textbydate/${day}/${month}`).toPromise();
    }

    addComment(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>(`${ConfigClass.getEndpoint}comment/create`, JSON.stringify(data), { headers }).toPromise();
    }

    getAllComments(id: string): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}comment/${id}`).toPromise();
    }

    contactUs(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>(`${ConfigClass.getEndpoint}contact/create`, JSON.stringify(data), { headers }).toPromise();
    }

    getSocial(): Promise<any> {
        if (this.socialArr.length === 0) {
            return this.http.get<any>(`${ConfigClass.getEndpoint}socialmedia`).toPromise().then(res => {
                this.socialArr = res;
                return res;
            });
        } else {
            return Promise.resolve(this.socialArr);
        }
    }

    login(username: string, password: string): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}user/${username}/${password}`).toPromise();
    }

    getAllImages(): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}icon`).toPromise();
    }

    getBookInfo(): Promise<any> {
        return this.http.get<any>(`${ConfigClass.getEndpoint}book`).toPromise();
    }

    registerUser(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>(`${ConfigClass.getEndpoint}user/create`, JSON.stringify(data), { headers }).toPromise();
    }

    uploadImage(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>("http://www.jctoday.com/demo/goiscalling/uploadservice.asmx/Register2", JSON.stringify(data), { headers }).toPromise();
    }

    forgetPassword(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>(`${ConfigClass.getEndpoint}user/forget`, JSON.stringify(data), { headers }).toPromise();
    }

    saveNotificationToken(data: any): Promise<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post<any>(`${ConfigClass.getEndpoint}Createdevice`, JSON.stringify(data), { headers }).toPromise();
    }
}
