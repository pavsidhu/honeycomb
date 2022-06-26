import openapiTS from "openapi-typescript";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const { PROJECT_NAME, SUPABASE_ANON_KEY } = process.env;
const OPEN_API_URL = `https://${PROJECT_NAME}.supabase.co/rest/v1/?apikey=${SUPABASE_ANON_KEY}`;
const OUTPUT_FILE = "./src/supabase/types.ts";

console.log("Generating types...");

openapiTS(OPEN_API_URL).then((output) => {
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Types saved to ${OUTPUT_FILE}`);
});
