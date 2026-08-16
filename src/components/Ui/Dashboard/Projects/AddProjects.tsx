"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { ProjectCategory } from "@/src/types/projectType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateProjectMutation } from "@/src/redux/api/projectApi";

interface AddProjectFormValues {
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

const AddProjects = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddProjectFormValues>({
    defaultValues: {
      vehicle: "",
      work: "",
      result: "",
      category: "Detailing",
      position: 1,
      is_active: true,
    },
  });

  const imageFileList = watch("image");

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFileList]);

  const onSubmit: SubmitHandler<AddProjectFormValues> = async (values) => {
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

      await createProject(formData).unwrap();
      toast.success("Project created successfully!");
      reset();
      setImagePreview(null);
      router.push(ALL_PROJECTS_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Add Project"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Projects", link: ALL_PROJECTS_PATH },
          { title: "Add Project" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle */}
          <Input
            label="Vehicle"
            text="vehicle"
            placeholder="Toyota Corolla Fielder 2020 Hybrid"
            register={register("vehicle", {
              required: "Vehicle is required",
            })}
            errors={errors}
          />

          {/* Work */}
          <Input
            label="Work Performed"
            text="work"
            placeholder="Professional Polishing & Detailing"
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
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-red-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Project Photo
            </label>

            {imagePreview && (
              <div className="relative mb-4 h-32 w-48 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Project Photo Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-full
              file:border-0
              file:font-semibold
              file:bg-red-50
              file:text-red-700
              hover:file:bg-red-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Create Project"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProjects;
