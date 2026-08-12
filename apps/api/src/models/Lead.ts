import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export interface LeadAttributes {
  id: number;
  fullName: string;
  email: string;
  company: string | null;
  message: string;
  budget: string;
  status: LeadStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LeadCreationAttributes = Optional<LeadAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  declare id: number;
  declare fullName: string;
  declare email: string;
  declare company: string | null;
  declare message: string;
  declare budget: string;
  declare status: LeadStatus;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Lead.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(180), allowNull: false },
    company: { type: DataTypes.STRING(120), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    budget: { type: DataTypes.STRING(80), allowNull: false },
    status: { type: DataTypes.ENUM('new', 'contacted', 'quoted', 'won', 'lost'), allowNull: false, defaultValue: 'new' },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  { sequelize, tableName: 'leads' }
);
