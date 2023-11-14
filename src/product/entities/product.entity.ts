import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Product {

    @PrimaryGeneratedColumn('uuid')
    public id:string;

    @Column()
    public name : number;

    @Column()
    public desc : string;

    @Column({default:true})
    public isSealed : boolean



}
