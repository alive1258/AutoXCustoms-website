// ==========================================
// 1. Core Entity Model
// ==========================================
export type ProjectCategory =
  | "Paint"
  | "Restoration"
  | "Detailing"
  | "Mechanical"
  | "Accessories";

export interface ProjectUserSummary {
  id: string;
  name?: string;
  email?: string;
}

export interface ProjectItem {
  id: string;
  vehicle: string;
  work: string;
  result: string;
  category: ProjectCategory;
  image?: string;
  position: number;
  is_active: boolean;
  addedBy?: ProjectUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateProjectRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: ProjectCategory;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

// ==========================================
// 4. API Response Wrappers
// ==========================================
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BaseApiResponse {
  apiVersion?: string;
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
}

export interface ProjectPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  data: ProjectItem[];
}
