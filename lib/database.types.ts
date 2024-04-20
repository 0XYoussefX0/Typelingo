export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          code: string
          code_solution: string
          description: string
          id: number
          name: string
          type: Database["public"]["Enums"]["challenge_type"]
          video_solution: string
        }
        Insert: {
          code: string
          code_solution: string
          description: string
          id?: number
          name: string
          type: Database["public"]["Enums"]["challenge_type"]
          video_solution: string
        }
        Update: {
          code?: string
          code_solution?: string
          description?: string
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["challenge_type"]
          video_solution?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          camefrom: Database["public"]["Enums"]["social_media"] | null
          enabled_notifications: boolean | null
          goal: Database["public"]["Enums"]["goal"] | null
          levels_completed: number[] | null
          levels_skipped: number[] | null
          linkedgithub: boolean | null
          name: string | null
          time_spent_last_24h: number | null
          userid: string | null
          xp: number[] | null
        }
        Insert: {
          camefrom?: Database["public"]["Enums"]["social_media"] | null
          enabled_notifications?: boolean | null
          goal?: Database["public"]["Enums"]["goal"] | null
          levels_completed?: number[] | null
          levels_skipped?: number[] | null
          linkedgithub?: boolean | null
          name?: string | null
          time_spent_last_24h?: number | null
          userid?: string | null
          xp?: number[] | null
        }
        Update: {
          camefrom?: Database["public"]["Enums"]["social_media"] | null
          enabled_notifications?: boolean | null
          goal?: Database["public"]["Enums"]["goal"] | null
          levels_completed?: number[] | null
          levels_skipped?: number[] | null
          linkedgithub?: boolean | null
          name?: string | null
          time_spent_last_24h?: number | null
          userid?: string | null
          xp?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      challenge_type: "easy" | "medium" | "hard" | "extreme"
      goal: "5" | "10" | "15" | "20"
      social_media:
        | "Reddit"
        | "Facebook"
        | "Tiktok"
        | "Instagram"
        | "Google"
        | "Youtube"
        | "Friends/Family"
        | "Other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
