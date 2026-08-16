import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ServiceItem,
  ServicePaginatedResponse,
  ServiceQueryParams,
  UpdateServiceRequest,
} from "@/src/types/serviceType";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE SERVICE
    createService: builder.mutation<ApiResponse<ServiceItem>, FormData>({
      query: (formData) => ({
        url: SERVICE_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.services],
    }),

    // 2. GET ALL SERVICES (Paginated & Filtered)
    getAllServices: builder.query<ServicePaginatedResponse, ServiceQueryParams | void>({
      query: (params) => ({
        url: SERVICE_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.services],
    }),

    // 3. GET ACTIVE SERVICES (Public homepage feed)
    getActiveServices: builder.query<ApiResponse<ServiceItem[]>, void>({
      query: () => ({
        url: `${SERVICE_URL}/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    // 4. GET SINGLE SERVICE BY ID
    getSingleService: builder.query<ApiResponse<ServiceItem>, string>({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    // 5. UPDATE SERVICE
    updateService: builder.mutation<ApiResponse<ServiceItem>, UpdateServiceRequest>({
      query: ({ id, data }) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.services],
    }),

    // 6. DELETE SERVICE
    deleteService: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetActiveServicesQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
