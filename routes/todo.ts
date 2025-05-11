import express, { Request, Response } from "express";
import Todo from "../models/Todo";
import verifyUser from "../middleware/verifyUser";

const router = express.Router();

router.post("/", verifyUser, async (req: Request, res: Response) => {

  const newTodo = new Todo({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", verifyUser, async (req: Request, res: Response) => {
  try {

    const todos = await Todo.find({ userId: req.user.id });

    // if there is no any todo?

    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete("/:todoId", verifyUser, async (req: Request, res: Response) => {
  try {

    const todo = await Todo.findById(req.params.todoId);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    // if userId is associated with that todo then delete it otherwise return
    if (todo.userId !== req.user.id) {
      res.status(403).json({ message: "Not authorized to delete" });
      return;
    }

    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:todoId", verifyUser, async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.todoId);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    if (todo.userId !== req.user.id) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
