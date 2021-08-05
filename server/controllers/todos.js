const Todo = require("../models").Todos;
const TodoItem = require("../models").TodoItem;

module.exports = {
	async create(req, res) {
		try {
			const createdTodo = await Todo.create({
				title: req.body.title,
			});
			return res.status(201).send(createdTodo);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(400).send(error)
		}
	},

	async list(req, res) {
		try {
			const todos = await Todo.findAll({
				include: [{
					model: TodoItem,
					as: "todoItems",
				}, ],
			})
			return res.status(200).send(todos);
		} catch (error) {
			console.log('error :>> ', error);
			res.status(400).send(error);
		}
	},

	async retrieve(req, res) {
		try {
			const todo = await Todo.findByPk(req.params.todoId, {
				include: [{
					model: TodoItem,
					as: "todoItems",
				}, ],
			})
			if (!todo) {
				return res.status(404).send({
					message: "Todo is Not Found",
				});
			}
			return res.status(200).send(todo);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	async update(req, res) {
		try {
			const todo = await Todo.findByPk(req.params.todoId, {
				include: [{
					model: TodoItem,
					as: "todoItems",
				}, ],
			})

			if (!todo) {
				return res.status(404).send({
					message: "Todo Not Found",
				});
			}
			const updatedTodo = await todo.update({
				title: req.body.title || todo.title,
			})
			return res.status(200).send(updatedTodo);
		} catch (error) {
			return res.status(400).send(error);
		}
	},
	async destroy(req, res) {
		// return Todo.findByPk(req.params.todoId)
		// 	.then((todo) => {
		// 		if (!todo) {
		// 			return res.status(400).send({
		// 				message: "Todo Not Found",
		// 			});
		// 		}
		// 		return todo
		// 			.destroy()
		// 			.then(() =>
		// 				res.status(200).send({
		// 					message: "Todo deleted successfully."
		// 				})
		// 			)
		// 			.catch((error) => res.status(400).send(error));
		// 	})
		// 	.catch((error) => res.status(400).send(error));
		try {
			const todo = await Todo.findByPk(req.params.todoId, {
				include: [{
					model: TodoItem,
					as: "todoItems",
				}, ],
			})
			if (!todo) {
				return res.status(404).send({
					message: "Todo Not Found",
				});
			}
			const updatedTodo = await todo.destroy();
			return res.status(200).send({
				message: "Todo deleted successfully."
			});
		} catch (error) {
			return res.status(400).send(error);
		}
	},
};