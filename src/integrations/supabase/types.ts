export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      complaints: {
        Row: {
          description: string
          district: string
          escalated_at: string | null
          id: string
          issue_type: string
          officer_id: string | null
          priority: string
          resolved_at: string | null
          status: string
          submitted_date: string
          updated_at: string
          user_id: string | null
          village: string
        }
        Insert: {
          description: string
          district: string
          escalated_at?: string | null
          id?: string
          issue_type: string
          officer_id?: string | null
          priority?: string
          resolved_at?: string | null
          status?: string
          submitted_date?: string
          updated_at?: string
          user_id?: string | null
          village: string
        }
        Update: {
          description?: string
          district?: string
          escalated_at?: string | null
          id?: string
          issue_type?: string
          officer_id?: string | null
          priority?: string
          resolved_at?: string | null
          status?: string
          submitted_date?: string
          updated_at?: string
          user_id?: string | null
          village?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_officer_id_fkey"
            columns: ["officer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string
          note: string | null
          transaction_date: string | null
          transaction_id: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string
          note?: string | null
          transaction_date?: string | null
          transaction_id?: string | null
          type?: string | null
          user_id?: string
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string
          note?: string | null
          transaction_date?: string | null
          transaction_id?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          attempts: number
          created_at: string
          expires_at: string
          id: string
          otp_hash: string
          phone_number: string
          verified: boolean
        }
        Insert: {
          attempts?: number
          created_at?: string
          expires_at: string
          id?: string
          otp_hash: string
          phone_number: string
          verified?: boolean
        }
        Update: {
          attempts?: number
          created_at?: string
          expires_at?: string
          id?: string
          otp_hash?: string
          phone_number?: string
          verified?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          employee_id: string
          first_name: string | null
          gov_field: string
          id: string
          is_officer: boolean
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          first_name?: string | null
          gov_field: string
          id?: string
          is_officer?: boolean
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          first_name?: string | null
          gov_field?: string
          id?: string
          is_officer?: boolean
          last_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
