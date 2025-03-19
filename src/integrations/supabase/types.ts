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
      admin_credentials: {
        Row: {
          created_at: string | null
          id: string
          password: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          password: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          password?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          author_avatar: string | null
          category: string
          content: string
          created_at: string | null
          date: string
          excerpt: string
          featured: boolean | null
          id: string
          image_url: string | null
          read_time: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string
          author_avatar?: string | null
          category?: string
          content: string
          created_at?: string | null
          date: string
          excerpt: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          read_time?: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          author_avatar?: string | null
          category?: string
          content?: string
          created_at?: string | null
          date?: string
          excerpt?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          read_time?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      calculator_fields: {
        Row: {
          calculator_id: string
          created_at: string | null
          default_value: Json | null
          field_id: string
          helper_text: string | null
          id: string
          label: string
          max: number | null
          min: number | null
          options: Json | null
          placeholder: string | null
          required: boolean | null
          sort_order: number
          step: number | null
          type: string
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          calculator_id: string
          created_at?: string | null
          default_value?: Json | null
          field_id: string
          helper_text?: string | null
          id?: string
          label: string
          max?: number | null
          min?: number | null
          options?: Json | null
          placeholder?: string | null
          required?: boolean | null
          sort_order?: number
          step?: number | null
          type: string
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          calculator_id?: string
          created_at?: string | null
          default_value?: Json | null
          field_id?: string
          helper_text?: string | null
          id?: string
          label?: string
          max?: number | null
          min?: number | null
          options?: Json | null
          placeholder?: string | null
          required?: boolean | null
          sort_order?: number
          step?: number | null
          type?: string
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calculator_fields_calculator_id_fkey"
            columns: ["calculator_id"]
            isOneToOne: false
            referencedRelation: "calculators"
            referencedColumns: ["id"]
          },
        ]
      }
      calculator_related_items: {
        Row: {
          calculator_id: string
          created_at: string | null
          id: string
          related_id: string
          related_type: string
        }
        Insert: {
          calculator_id: string
          created_at?: string | null
          id?: string
          related_id: string
          related_type: string
        }
        Update: {
          calculator_id?: string
          created_at?: string | null
          id?: string
          related_id?: string
          related_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculator_related_items_calculator_id_fkey"
            columns: ["calculator_id"]
            isOneToOne: false
            referencedRelation: "calculators"
            referencedColumns: ["id"]
          },
        ]
      }
      calculator_usage: {
        Row: {
          calculator_id: string
          created_at: string
          id: string
          input_data: Json
          result: string
          timestamp: string
        }
        Insert: {
          calculator_id: string
          created_at?: string
          id?: string
          input_data: Json
          result: string
          timestamp?: string
        }
        Update: {
          calculator_id?: string
          created_at?: string
          id?: string
          input_data?: Json
          result?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculator_usage_calculator_id_fkey"
            columns: ["calculator_id"]
            isOneToOne: false
            referencedRelation: "calculators"
            referencedColumns: ["id"]
          },
        ]
      }
      calculators: {
        Row: {
          category: string
          created_at: string | null
          description: string
          external_articles: Json | null
          featured: boolean | null
          formula: string | null
          icon: string
          id: string
          long_description: string | null
          time_estimate: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          external_articles?: Json | null
          featured?: boolean | null
          formula?: string | null
          icon: string
          id: string
          long_description?: string | null
          time_estimate: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          external_articles?: Json | null
          featured?: boolean | null
          formula?: string | null
          icon?: string
          id?: string
          long_description?: string | null
          time_estimate?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      custom_pages: {
        Row: {
          content: string
          created_at: string
          id: string
          last_modified: string
          slug: string
          sort_order: number | null
          status: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          last_modified?: string
          slug: string
          sort_order?: number | null
          status?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          last_modified?: string
          slug?: string
          sort_order?: number | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          created_at: string
          group_id: string
          group_title: string
          id: string
          is_external: boolean | null
          label: string
          last_modified: string
          sort_order: number | null
          url: string
        }
        Insert: {
          created_at?: string
          group_id: string
          group_title: string
          id?: string
          is_external?: boolean | null
          label: string
          last_modified?: string
          sort_order?: number | null
          url: string
        }
        Update: {
          created_at?: string
          group_id?: string
          group_title?: string
          id?: string
          is_external?: boolean | null
          label?: string
          last_modified?: string
          sort_order?: number | null
          url?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_admin_password: {
        Args: {
          admin_username: string
          new_password: string
        }
        Returns: boolean
      }
      verify_admin_credentials: {
        Args: {
          admin_username: string
          admin_password: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
