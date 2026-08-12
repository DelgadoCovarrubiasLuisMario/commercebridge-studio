import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface CollectionAttributes {
  id: number;
  title: string;
  handle: string;
  description: string;
  heroImageUrl: string;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CollectionCreationAttributes = Optional<CollectionAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
  declare id: number;
  declare title: string;
  declare handle: string;
  declare description: string;
  declare heroImageUrl: string;
  declare isFeatured: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Collection.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(120), allowNull: false },
    handle: { type: DataTypes.STRING(140), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    heroImageUrl: { type: DataTypes.STRING(500), allowNull: false },
    isFeatured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  { sequelize, tableName: 'collections' }
);
