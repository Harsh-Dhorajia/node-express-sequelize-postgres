module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define("Todos", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Todos.associate = (models) => {
    Todos.hasMany(models.TodoItem, {
      foreignKey: "todoId",
      as: "todoItems",
    });
  };

  return Todos;
};