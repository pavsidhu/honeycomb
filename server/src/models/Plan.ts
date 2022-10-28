import { Model } from "objection";

export default class Plan extends Model {
  name: string;
  date: string;
  location: string;
  description?: string;

  static tableName = "plans";
  static jsonSchema = {
    type: "object",
    required: ["name", "date", "location"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      date: { type: "string" },
      location: { type: "string" },
    },
  };
}
