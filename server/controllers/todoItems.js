const TodoItem = require("../models").TodoItem;

module.exports = {
	async create(req, res) {
		try {
			const todoItem = await TodoItem.create({
				content: req.body.content,
				todoId: req.params.todoId,
			});
			return res.status(201).send(todoItem)
		} catch (error) {
			return res.status(400).send(error);
		}
	},
	async update(req, res) {
		try {
			const todoItem = TodoItem.findOne({
				where: {
					id: req.params.todoItemId,
					todoId: req.params.todoId,
				},
			})
			if (!todoItem) {
				return res.status(404).send({
					message: "TodoItem Not Found",
				});
			}
			const updatedTodoItem = await todoItem
				.update({
					content: req.body.content || todoItem.content,
					complete: req.body.complete || todoItem.complete,
				})
			return res.status(200).send(updatedTodoItem)
		} catch (error) {
			res.status(400).send(error);
		}
	},

	async destroy(req, res) {
		try {
			const todoItem = await TodoItem.findOne({
				where: {
					id: req.params.todoItemId,
					todoId: req.params.todoId,
				},
			});
			if (!todoItem) {
				return res.status(404).send({
					message: "TodoItem Not Found",
				});
			}
			const deletedTodoItem = await todoItem.destroy();
			res.status(200).send({
				message: "TodoItems deleted successfully."
			})
		} catch (error) {
			res.status(400).send(error);
		}
	}
}