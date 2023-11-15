import { BaseEntity } from "src/common/base.entity";
import { Entity, Column, BeforeInsert } from 'typeorm';;
import { Role } from "./role.enum";
import * as bcrypt from 'bcryptjs'
import { InternalServerErrorException } from '@nestjs/common';

@Entity()

export class User extends BaseEntity{


    @Column()
    public nickname : string;

    @Column()
    public email : string;

    @Column({unique:true})
    public password : string;


    @Column({

        type : 'enum',
        enum : Role,
        array : true,
        default : [Role.USER]

    })
    public roles : Role[]
    // 이거 왜 이렇게 하는지 모르겠음. 

    @BeforeInsert()
    async hashedpassword() {
        try{
            const saltValue = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, saltValue);
        }
        catch(e) {
            console.log(e)
            throw new InternalServerErrorException
        }
    }

    async checkPassworrd(aPassword : string) {

        try{

            const isMatchedPassword = await bcrypt.compare(aPassword, this.password)
            return isMatchedPassword

        } catch(e) {
            console.log(e)
            throw new InternalServerErrorException}



    }





}
