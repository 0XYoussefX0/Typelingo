import { Database, Tables } from "@/lib/database";

declare global {
   type DB = Database
   type Challenge = Tables<"challenges">
}