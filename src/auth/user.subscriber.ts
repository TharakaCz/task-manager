import { EntitySubscriberInterface, EventSubscriber, InsertEvent, SoftRemoveEvent, UpdateEvent } from "typeorm";
import { Users } from "./users.entity";

@EventSubscriber()
export class UserSubscripber implements EntitySubscriberInterface<Users>{
    listenTo() {
        return Users;
    }
    beforeInsert(event: InsertEvent<Users>):Promise<any> | void {
        event.entity.created_by = event.entity;
    }
    beforeUpdate(event: UpdateEvent<Users>):Promise<any> | void {
        event.entity.updated_by = event.entity;
    }
    beforeSoftRemove(event: SoftRemoveEvent<Users>): Promise<any> | void {
        event.entity.updated_by = event.entity;
    }
}