import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export type ProductStatus = 'draft' | 'active' | 'archived';

export interface ProductAttributes {
  id: number;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  productType: string;
  price: number;
  compareAtPrice: number | null;
  inventoryQuantity: number;
  status: ProductStatus;
  imageUrl: string;
  tags: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: number;
  declare title: string;
  declare handle: string;
  declare description: string;
  declare vendor: string;
  declare productType: string;
  declare price: number;
  declare compareAtPrice: number | null;
  declare inventoryQuantity: number;
  declare status: ProductStatus;
  declare imageUrl: string;
  declare tags: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(140), allowNull: false },
    handle: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    vendor: { type: DataTypes.STRING(100), allowNull: false },
    productType: { type: DataTypes.STRING(100), allowNull: false },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return Number(this.getDataValue('price'));
      }
    },
    compareAtPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const value = this.getDataValue('compareAtPrice');
        return value === null ? null : Number(value);
      }
    },
    inventoryQuantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.ENUM('draft', 'active', 'archived'), allowNull: false, defaultValue: 'draft' },
    imageUrl: { type: DataTypes.STRING(500), allowNull: false },
    tags: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  { sequelize, tableName: 'products' }
);
