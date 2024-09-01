import { EntitySubscriberInterface, EventSubscriber, InsertEvent, SoftRemoveEvent, UpdateEvent } from "typeorm";
import { Tasks } from "./task.entity";

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Tasks>{
    listenTo() {
        return Tasks;
      }
    
      beforeInsert(event: InsertEvent<Tasks>): Promise<any> | void {
        event.entity.created_by = event.entity.user;
      }
    
      beforeUpdate(event: UpdateEvent<Tasks>): Promise<any> | void{
        event.entity.updated_by = event.entity.user;
      }
    
      beforeSoftRemove(event: SoftRemoveEvent<Tasks>): Promise<any> | void {
        event.entity.updated_by = event.entity.user;
      }
}