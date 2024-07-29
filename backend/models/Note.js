import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import User from './User.js';

const Note = db.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'notes',
  timestamps: false,
});

Note.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Note, { foreignKey: 'userId' });

export default Note;
