import { Database, Tables } from "@/lib/database.types";

declare global {
   type DB = Database
   type Challenge = Tables<"challenges">
}