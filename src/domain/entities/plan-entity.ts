



export interface IPlanEntity{
    _id:string;
    name:string;
    price:number;
    durationInMonths:number;
    description:string;
    features:string[];
    createdAt:Date;
    updatedAt:Date;
}