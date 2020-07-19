import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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

  @Column()
  category_id: String;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}

export default Transaction;
