import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Category from './Category';

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  title: String;

  @Column()
  type: 'income' | 'outcome';

  @Column('decimal')
  value: Number;

  @ManyToOne(() => Category)
  @JoinColumn({name:'category_id'})
  category: Category;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}

export default Transaction;
