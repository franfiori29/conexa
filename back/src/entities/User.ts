import bcrypt from "bcrypt";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from "typeorm";

const passwordTransformer: ValueTransformer = {
  from: (value) => value,
  to: (value) => {
    if (value) {
      return bcrypt.hashSync(value, 10);
    }
    return value;
  },
};

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column({ transformer: passwordTransformer, select: false })
  public password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public isValidPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
};