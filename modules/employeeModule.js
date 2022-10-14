const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getEmployees = async (req, res) => {
  try {
    const employeesData = await mongo.selectedDb
      .collection("employees")
      .find()
      .toArray();
    res.send(employeesData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.updateEmployees = async (req, res) => {
  try {
    const id = req.params.ids;
    const updatedData = await mongo.selectedDb
      .collection("employees")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body } },
        { returnDocument: "after" }
      );
    res.send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.createEmployees = async (req, res) => {
  try {
    const insertedResponse = await mongo.selectedDb
      .collection("employees")
      .insertOne(req.body);
    res.send(insertedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.deleteEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDb
      .collection("employees")
      .remove({ _id: ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
