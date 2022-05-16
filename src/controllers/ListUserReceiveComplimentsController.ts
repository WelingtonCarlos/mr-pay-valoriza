import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request;

    const listUserReceiveComplimentsService =
      new ListUserReceiveComplimentsService();

    const compliments = await listUserReceiveComplimentsService.execute({
      user_id,
    });

    return response.json(compliments);
  }
}

export { ListUserReceiveComplimentsController };
