"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { ProjectCategory } from "@/src/types/projectType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "@/src/redux/api/projectApi";

interface EditProjectsProps {
  id: string;
}

interface EditProjectFormValues {
  vehicle: string;
  work: string;
  result: string;
  category: ProjectCategory;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const categoryOptions: ProjectCategory[] = [
  "Paint",
  "Restoration",
  "Detailing",
  "Mechanical",
  "Accessories",
];

const ALL_PROJECTS_PATH = "/dashboard/projects/all-projects";

const EditProjects: React.FC<EditProjectsProps> = ({ id }) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: projectData, isLoading: isFetching } =
    useGetSingleProjectQuery(id);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditProjectFormValues>();

  const imageFileList = watch("image");

  useEffect(() => {
    if (projectData?.data) {
      const item = projectData.data;
      reset({
        vehicle: item.vehicle || "",
        work: item.work || "",
        result: item.result || "",
        category: item.category,
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [projectData, reset]);

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFileList]);

  const onSubmit: SubmitHandler<EditProjectFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("vehicle", values.vehicle);
      formData.append("work", values.work);
      formData.append("result", values.result);
      formData.append("category", values.category);
      formData.append("is_active", String(values.is_active));

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await updateProject({ id, data: formData }).unwrap();
      toast.success("Project updated successfully!");
      router.push(ALL_PROJECTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update project.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-red-600" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Project"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Projects", link: ALL_PROJECTS_PATH },
          { title: "Edit Project" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle */}
          <Input
            label="Vehicle"
            text="vehicle"
            register={register("vehicle", {
              required: "Vehicle is required",
            })}
            errors={errors}
          />

          {/* Work */}
          <Input
            label="Work Performed"
            text="work"
            register={register("work", {
              required: "Work performed is required",
            })}
            errors={errors}
          />

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium mb-1">
              Category<span className="ml-1 text-red-500">*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <Input
            label="Display Position (Optional)"
            text="position"
            type="number"
            register={register("position", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-700"
            >
              Active (visible on homepage)
            </label>
          </div>

          {/* Result */}
          <Textarea
            label="Result / Outcome"
            text="result"
            placeholder="Mirror-finish shine restored and protected for the long haul."
            register={register("result", {
              required: "Result cannot be empty",
            })}
            errors={errors}
            required
            className="col-span-full"
          />

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Project Photo
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Project Photo Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-28 w-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400 shrink-0">
                  <Upload size={24} />
                </div>
              )}

              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:font-semibold file:bg-red-50
                  file:text-red-700 hover:file:bg-red-100
                  cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Allowed formats: JPG, PNG, WEBP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Project"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProjects;
