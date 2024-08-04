import SuppliesModel from "../models/supplies-model";

class SuppliesController {
  constructor() {}

  getAll(req, res) {
    const db = SuppliesModel.getData().supplies;
    console.log("salio", db);

    res.status(200).json({ message: db });
  }
  getById(req, res) {
    // const db = SuppliesModel.getData();
    // const user = db.users.find((user) => req.params.id == user.id);
    // res.status(200).json({ message: user });
  }
  deleteById(id: string) {}
  updateById(id: string) {}
  create(user: {}) {}
}

const suppliesController = new SuppliesController();

export default suppliesController;
