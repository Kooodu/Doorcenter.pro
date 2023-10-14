import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'character varying' })
  video: string

  @Column({ type: 'text' })
  text: string

  @Column({ type: 'character varying' })
  photo: string
}
