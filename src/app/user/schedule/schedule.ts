export class Schedule {
  public id:number;
  public user_id:number;
  public branch_id:number;
  public schedule_status_id:number;
  public initial_amount:number;
  public system_amount:number;
  public final_amount:number;
  public created_at:string;
  public deleted_at:string;
  
  public user:any;
  public branch:any;
  public schedule_status:any;
  
}
