export interface User{
    _id: any;
    AssignedTasks:[];
    EarnedPoints?:[];
    name:string;
    email:string;
    password:string;
    roleId:any;
    dbStatus: boolean;
    photo:string;
    date:Date;
    _v?:number;
}