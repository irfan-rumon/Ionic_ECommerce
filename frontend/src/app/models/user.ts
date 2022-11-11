export interface User{
    _id?:string;
    name?: string;
    email: string;
    phone: string;
    district: string;
    zone: string;
    address: string;
    password:string;
    passConfirm?:string;
    roll?:string;
  }