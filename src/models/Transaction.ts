import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Category from './Category';

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column({type:'decimal', precision:10, scale:2})
  value: string;

  @ManyToOne(() => Category)
  @JoinColumn({name:'category_id'})
  category: Category;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  public getValue(): number{
    if(this.value == undefined){
      return 0.0;
    }
    return parseFloat(this.value);
  }

  public setValue(newValue:number): void{
    this.value = newValue.toString();
  }
}



export default Transaction;
