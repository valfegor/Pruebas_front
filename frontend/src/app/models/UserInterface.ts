export interface User{
    AssignedTasks:[];
    EarnedPoints?:[];
    name:string;
    email:string;
    password:string;
    roleId:any;
    dbStatus: boolean;
    photo:string;
    

}