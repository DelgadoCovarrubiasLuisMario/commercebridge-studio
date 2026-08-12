import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface ThemeSettingAttributes {
  id: number;
  storeName: string;
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ThemeSettingCreationAttributes = Optional<ThemeSettingAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class ThemeSetting extends Model<ThemeSettingAttributes, ThemeSettingCreationAttributes> implements ThemeSettingAttributes {
  declare id: number;
  declare storeName: string;
  declare announcement: string;
  declare heroTitle: string;
  declare heroSubtitle: string;
  declare primaryColor: string;
  declare accentColor: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

ThemeSetting.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    storeName: { type: DataTypes.STRING(100), allowNull: false },
    announcement: { type: DataTypes.STRING(180), allowNull: false },
    heroTitle: { type: DataTypes.STRING(180), allowNull: false },
    heroSubtitle: { type: DataTypes.STRING(280), allowNull: false },
    primaryColor: { type: DataTypes.STRING(20), allowNull: false },
    accentColor: { type: DataTypes.STRING(20), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  { sequelize, tableName: 'theme_settings' }
);
