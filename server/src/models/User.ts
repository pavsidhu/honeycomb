import { JSONSchema, Model } from "objection";

export default class User extends Model {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;

  static tableName = "users";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["firstName", "lastName", "phoneNumber", "dateOfBirth"],
    properties: {
      id: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      phoneNumber: { type: "string" },
      dateOfBirth: { type: "string" },
    },
  };
}
