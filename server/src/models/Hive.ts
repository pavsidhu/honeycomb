import { Model } from "objection";

export default class Hive extends Model {
  name: string;
  location: string;
  description: string;

  static tableName = "hives";
  static jsonSchema = {
    type: "object",
    required: ["name", "location", "description"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      location: { type: "string" },
      description: { type: "string" },
    },
  };
}
