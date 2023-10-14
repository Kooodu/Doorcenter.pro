import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  value: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
