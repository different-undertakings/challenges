import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import resourceService from "../services/resource.service";
import { ResourceService } from "../interfaces/resource.interface";

const resourceController = (resourceService: ResourceService) => {
  const get = async (req: Request, res: Response) => {
    const resources = await resourceService.get(req.query);
    res.status(StatusCodes.OK).send(resources);
  };

  const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resource = await resourceService.getById(parseInt(id));

    if (resource) {
      return res.status(StatusCodes.OK).json(resource);
    }
    res.status(StatusCodes.NOT_FOUND).json({ message: "Resource not found" });
  };

  const create = async (req: Request, res: Response) => {
    const { title, description, completed } = req.body;

    const resource: {
      title: string;
      description: string;
      completed: boolean;
    } = {
      title,
      description,
      completed,
    };

    await resourceService.create(resource);
    res.status(StatusCodes.CREATED).send();
  };

  const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = {
      title,
      description,
      completed,
      updated_at: new Date(),
    };

    const updatedRows = await resourceService.updateById(parseInt(id), todo);

    if (updatedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Todo not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Todo updated successfully" });
  };

  const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedRows = await resourceService.deleteById(parseInt(id));

    if (deletedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Todo not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Todo deleted successfully" });
  };

  return { get, getById, create, updateById, deleteById };
};

export default resourceController(resourceService);
