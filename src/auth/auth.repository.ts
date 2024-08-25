import { DataSource, Repository } from "typeorm";
import { Users } from "./users.entity";
import { UserFilterDTO } from "./dto/user-filter.dto";

export class AuthRepository extends Repository<Users> {

    constructor(private dataSource: DataSource){
        super(Users, dataSource.createEntityManager());
    }

    async getUsers(userFilterDTO: UserFilterDTO):Promise<Users[] | null>{
        const query = this.createQueryBuilder('Users')
        const {search} = userFilterDTO;
        if(search){
            query.andWhere(`(users.id :search OR user.email :search user.name LIKE :search)`, {search: `%${search}%`});
        }
        return query.orderBy('id', 'DESC').getMany();
    }
}
