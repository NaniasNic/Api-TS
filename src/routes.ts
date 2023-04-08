import { Router } from "express";

const route = Router();

import { ControllerUser } from "./controllers/ControllerUser";

const controllerUser = new ControllerUser();

route.post("/user", controllerUser.createUser);
route.get("/users", controllerUser.allUser);
route.get("/user/:id", controllerUser.findUser);
route.delete("/user/:id", controllerUser.deleteUser);

export { route };