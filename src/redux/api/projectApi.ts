import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ProjectItem,
  ProjectPaginatedResponse,
  ProjectQueryParams,
  UpdateProjectRequest,
} from "@/src/types/projectType";

const PROJECT_URL = "/projects";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE PROJECT
    createProject: builder.mutation<ApiResponse<ProjectItem>, FormData>({
      query: (formData) => ({
        url: PROJECT_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.projects],
    }),

    // 2. GET ALL PROJECTS (Paginated & Filtered)
    getAllProjects: builder.query<
      ProjectPaginatedResponse,
      ProjectQueryParams | void
    >({
      query: (params) => ({
        url: PROJECT_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.projects],
    }),

    // 3. GET ACTIVE PROJECTS (Public homepage feed)
    getActiveProjects: builder.query<ApiResponse<ProjectItem[]>, void>({
      query: () => ({
        url: `${PROJECT_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.projects],
    }),

    // 4. GET SINGLE PROJECT BY ID
    getSingleProject: builder.query<ApiResponse<ProjectItem>, string>({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.projects],
    }),

    // 4. UPDATE PROJECT
    updateProject: builder.mutation<ApiResponse<ProjectItem>, UpdateProjectRequest>({
      query: ({ id, data }) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.projects],
    }),

    // 5. DELETE PROJECT
    deleteProject: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.projects],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetActiveProjectsQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
