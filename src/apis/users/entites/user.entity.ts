import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column({ type: 'varchar' })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  @Field(() => String)
  name: string;
  @Column()
  @Field(() => Int)
  age: string;
}
