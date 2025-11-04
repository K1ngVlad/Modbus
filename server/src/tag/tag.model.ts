import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface TagCreationAttrs {
  name: string;
  deviceName: string;
  unit: string;
  value: number;
}

@Table({ tableName: 'device' })
export class Tag extends Model<Tag, TagCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  deviceName: string;

  @Column({ type: DataType.STRING })
  unit: string;

  @Column({ type: DataType.FLOAT })
  value: number;
}
