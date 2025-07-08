// Importamos el modelo de tareas desde la carpeta de modelos
import taskModel from "../models/Task.js";

// Creamos un objeto vacío para agrupar todos los controladores
const taskController = {};

// ==================== GET: Obtener todas las tareas ====================
taskController.getAllTasks = async (req, res) => {
  try {
    // Buscamos todas las tareas en la base de datos
    const tasks = await taskModel.find();
    // Respondemos con las tareas encontradas
    res.status(200).json(tasks);
  } catch (error) {
    // Manejamos errores en caso de fallo al obtener las tareas
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

// ==================== GET: Obtener tarea por ID ====================
taskController.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscamos la tarea por su ID
    const task = await taskModel.findById(id);
    // Si no se encuentra la tarea, respondemos con error
    if (!task) {
      return res.status(400).json({ message: "Task not found" });
    }
    // Respondemos con la tarea encontrada
    res.status(200).json(task);
  } catch (error) {
    // Manejamos errores en caso de fallo al obtener la tarea
    res.status(500).json({ message: "Error retrieving task", error });
  }
};

// ==================== POST: Crear una nueva tarea ====================
taskController.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    // Validaciones (aunque también estén en el modelo, se refuerzan aquí)
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (title.length < 3 || title.length > 50) {
      return res
        .status(400)
        .json({ message: "Title must be between 3 and 50 characters" });
    }

    if (description.length < 5 || description.length > 200) {
      return res
        .status(400)
        .json({ message: "Description must be between 5 and 200 characters" });
    }

    // Creamos una nueva tarea (el campo 'completed' no se pasa porque por defecto es false)
    const newTask = new taskModel({ title, description });
    // Guardamos la tarea en la base de datos
    await newTask.save();
    // Respondemos con la tarea creada
    res.status(200).json(newTask);
  } catch (error) {
    // Manejamos errores en caso de fallo al crear la tarea
    res.status(500).json({ message: "Error creating task", error });
  }
};

// ==================== PUT: Actualizar una tarea existente ====================
taskController.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    // Validaciones de los campos
    if (title.length < 3 || title.length > 50) {
      return res
        .status(400)
        .json({ message: "Title must be between 3 and 50 characters" });
    }
    if (description.length < 5 || description.length > 200) {
      return res
        .status(400)
        .json({ message: "Description must be between 5 and 200 characters" });
    }
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be a boolean" });
    }

    // Buscamos y actualizamos la tarea
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true } // Devuelve la tarea actualizada
    );

    // Si no se encuentra la tarea, respondemos con error
    if (!updatedTask) {
      return res.status(400).json({ message: "Task not found" });
    }

    // Respondemos con la tarea actualizada
    res.status(200).json(updatedTask);
  } catch (error) {
    // Manejamos errores en caso de fallo al actualizar la tarea
    res.status(500).json({ message: "Error updating task", error });
  }
};

// ==================== DELETE: Eliminar una tarea ====================
taskController.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscamos y eliminamos la tarea
    const deletedTask = await taskModel.findByIdAndDelete(id);

    // Si no se encuentra la tarea, respondemos con error
    if (!deletedTask) {
      return res.status(400).json({ message: "Task not found" });
    }

    // Respondemos con mensaje de éxito
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    // Manejamos errores en caso de fallo al eliminar la tarea
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Exportamos el controlador para poder usarlo en las rutas
export default taskController;
