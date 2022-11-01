const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
})

const Animal = sequelize.define('animal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    phone: {type: DataTypes.STRING },
    coords: { type: DataTypes.ARRAY(DataTypes.FLOAT) }
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Type = sequelize.define('type', { 
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Breed = sequelize.define('breed', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const AnimalInfo = sequelize.define('animal_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    avtor: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.STRING, allowNull: false},
})

User.hasMany(Animal)
Animal.belongsTo(User)

Type.hasMany(Animal)
Animal.belongsTo(Type)

Breed.hasMany(Animal)
Animal.belongsTo(Breed)

Category.hasMany(Animal)
Animal.belongsTo(Category)

Type.hasMany(Breed)
Breed.belongsTo(Type)

Animal.hasMany(AnimalInfo)
AnimalInfo.belongsTo(Animal)

// Coordinat.hasMany(Animal)
// Animal.belongsTo(Coordinat)

module.exports = {
    User,
    Animal,
    Type,
    Breed,
    Category,
    AnimalInfo,
}