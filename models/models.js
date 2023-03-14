const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, required: true, allowNull: false},
    password: {type: DataTypes.STRING, required: true, allowNull: false},
})

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, required: true}
})

const Todo = sequelize.define('todo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    isCompleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

const Subtask = sequelize.define('subtask', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    isCompleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: true, unique: true}
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Todo)
Todo.belongsTo(User, {foreignKey: 'userId'})

User.hasMany(Group)
Group.belongsTo(User)

Group.hasMany(Todo)
Todo.belongsTo(Group)

Todo.hasMany(Subtask)
Subtask.belongsTo(Todo)

module.exports = {
    User,
    Token,
    Todo,
    Subtask,
    Group
}