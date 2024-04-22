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
          camefrom: Database["public"]["Enums"]["social_media"]
          enabled_notifications: boolean
          goal: Database["public"]["Enums"]["goal"]
          levels_completed: number[]
          levels_skipped: number[]
          linkedgithub: boolean
          name: string | null
          userid: string
          xp: Database["public"]["CompositeTypes"]["xp_day_new"][]
        }
        Insert: {
          camefrom: Database["public"]["Enums"]["social_media"]
          enabled_notifications: boolean
          goal: Database["public"]["Enums"]["goal"]
          levels_completed: number[]
          levels_skipped: number[]
          linkedgithub: boolean
          name?: string | null
          userid: string
          xp: Database["public"]["CompositeTypes"]["xp_day_new"][]
        }
        Update: {
          camefrom?: Database["public"]["Enums"]["social_media"]
          enabled_notifications?: boolean
          goal?: Database["public"]["Enums"]["goal"]
          levels_completed?: number[]
          levels_skipped?: number[]
          linkedgithub?: boolean
          name?: string | null
          userid?: string
          xp?: Database["public"]["CompositeTypes"]["xp_day_new"][]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
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
      completed_challenge: {
        Args: {
          challengeid: number
          id: string
          challenge_xp: Database["public"]["CompositeTypes"]["xp_day_new"]
        }
        Returns: undefined
      }
      skip_challenge: {
        Args: {
          challengeid: number
          id: string
        }
        Returns: undefined
      }
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
      xp_day: {
        date: string | null
        xp: number | null
      }
      xp_day_new: {
        date: string 
        xp: number 
      }
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
