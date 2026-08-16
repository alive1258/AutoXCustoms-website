"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, Car } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { ProjectCategory, ProjectItem } from "@/src/types/projectType";
import { ApiError } from "@/src/types/authType";
import Pagination from "@/src/utils/Pagination";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "@/src/redux/api/projectApi";

const LIMIT = 10;

const categoryOptions: ProjectCategory[] = [
  "Paint",
  "Restoration",
  "Detailing",
  "Mechanical",
  "Accessories",
];

const AllProjects: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "">(
    "",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, refetch } = useGetAllProjectsQuery({
    search: (debouncedSearch as string) || undefined,
    category: categoryFilter || undefined,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteProject] = useDeleteProjectMutation();

  const projects: ProjectItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value as ProjectCategory | "");
    setCurrentPage(1);
  };

  const handleDeleteProject = async (project: ProjectItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete project "${project.vehicle}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteProject(project.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Project "${project.vehicle}" has been deleted.`,
        timer: 1000,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      const apiError = err as ApiError;

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: apiError.data?.message || apiError.message || "Delete failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-200">Projects</h1>
          <p className="text-sm text-gray-500">
            Manage featured restoration/portfolio projects
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search projects..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-600"
          />

          <Link href="/dashboard/projects/add-projects">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition w-full sm:w-auto">
              <Plus size={18} />
              Add Project
            </button>
          </Link>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Vehicle
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Work
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Created
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {projects?.length > 0 ? (
              projects.map((project, index) => (
                <tr
                  key={project.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-sm">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="px-5 py-3">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.vehicle}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                        <Car size={20} />
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-3 text-sm font-medium text-gray-800">
                    {project.vehicle}
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {project.work}
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      {project.category}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        project.is_active
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {project.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/projects/edit-projects/${project.id}`}
                      >
                        <button
                          className="rounded-lg p-2 cursor-pointer text-red-600 hover:bg-red-100 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteProject(project)}
                        className="rounded-lg p-2 cursor-pointer text-red-600 hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {projects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default AllProjects;
