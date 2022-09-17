import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { hashPasswordTransform } from '../commom/helpers/crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.password = user?.password;
  }
}
