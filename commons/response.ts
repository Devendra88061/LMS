export class Res {
    public statusCode: any;
    public data?: any;
    public message?: any;
    public error?: any;
    public errorCode?:number
  

    constructor(statusCode?: any, message?: any,data? : any,error?:any ,errorCode?:any){
        this.statusCode = statusCode??null;
        this.message = message ?? null;
        this.data = data?? {};
        this.error = error ?? null;
        this.errorCode = errorCode ?? null;
      }
}