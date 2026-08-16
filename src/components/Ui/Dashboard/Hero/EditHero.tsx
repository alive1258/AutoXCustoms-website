"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload, Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { statIconOptions } from "@/src/utils/statIconMap";
import {
  useGetSingleHeroQuery,
  useUpdateHeroMutation,
} from "@/src/redux/api/heroApi";

interface EditHeroProps {
  id: string;
}

interface EditHeroFormValues {
  badge?: string;
  affiliation?: string;
  title: string;
  description?: string;
  specialties?: string;
  primary_button_text: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  stats: { icon: string; value: string; label: string }[];
  rating_value?: string;
  rating_label?: string;
  floating_badge?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_HERO_PATH = "/dashboard/hero/all-hero";

const EditHero: React.FC<EditHeroProps> = ({ id }) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: heroData, isLoading: isFetching } = useGetSingleHeroQuery(id);
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditHeroFormValues>({
    defaultValues: { stats: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stats",
  });

  const imageFileList = watch("image");

  useEffect(() => {
    if (heroData?.data) {
      const item = heroData.data;
      reset({
        badge: item.badge || "",
        affiliation: item.affiliation || "",
        title: item.title || "",
        description: item.description || "",
        specialties: (item.specialties || []).join("\n"),
        primary_button_text: item.primary_button_text || "",
        primary_button_link: item.primary_button_link || "",
        secondary_button_text: item.secondary_button_text || "",
        secondary_button_link: item.secondary_button_link || "",
        stats: item.stats || [],
        rating_value: item.rating_value || "",
        rating_label: item.rating_label || "",
        floating_badge: item.floating_badge || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [heroData, reset]);

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFileList]);

  const onSubmit: SubmitHandler<EditHeroFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("badge", values.badge || "");
      formData.append("affiliation", values.affiliation || "");
      formData.append("title", values.title);
      formData.append("description", values.description || "");

      const specialtiesArr = (values.specialties || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      formData.append("specialties", JSON.stringify(specialtiesArr));

      formData.append("primary_button_text", values.primary_button_text || "");
      formData.append("primary_button_link", values.primary_button_link || "");
      formData.append(
        "secondary_button_text",
        values.secondary_button_text || "",
      );
      formData.append(
        "secondary_button_link",
        values.secondary_button_link || "",
      );

      const validStats = (values.stats || []).filter(
        (s) => s.icon && s.value && s.label,
      );
      formData.append("stats", JSON.stringify(validStats));

      formData.append("rating_value", values.rating_value || "");
      formData.append("rating_label", values.rating_label || "");
      formData.append("floating_badge", values.floating_badge || "");
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

      await updateHero({ id, data: formData }).unwrap();
      toast.success("Hero entry updated successfully!");
      router.push(ALL_HERO_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update hero entry.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-red-600" />
          <span>Loading hero details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Hero Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Hero Section", link: ALL_HERO_PATH },
          { title: "Edit Hero" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badge */}
          <Input
            label="Badge Text (Optional)"
            text="badge"
            register={register("badge")}
            errors={errors}
            required={false}
          />

          {/* Affiliation */}
          <Input
            label="Affiliation (Optional)"
            text="affiliation"
            register={register("affiliation")}
            errors={errors}
            required={false}
          />

          {/* Title */}
          <Input
            label="Headline Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Rating value */}
          <Input
            label="Rating Value (Optional)"
            text="rating_value"
            register={register("rating_value")}
            errors={errors}
            required={false}
          />

          {/* Primary button text */}
          <Input
            label="Primary Button Text"
            text="primary_button_text"
            register={register("primary_button_text", {
              required: "Primary button text is required",
            })}
            errors={errors}
          />

          {/* Primary button link */}
          <Input
            label="Primary Button Link"
            text="primary_button_link"
            register={register("primary_button_link")}
            errors={errors}
            required={false}
          />

          {/* Secondary button text */}
          <Input
            label="Secondary Button Text (Optional)"
            text="secondary_button_text"
            register={register("secondary_button_text")}
            errors={errors}
            required={false}
          />

          {/* Secondary button link */}
          <Input
            label="Secondary Button Link (Optional)"
            text="secondary_button_link"
            register={register("secondary_button_link")}
            errors={errors}
            required={false}
          />

          {/* Floating badge */}
          <Input
            label="Floating Badge Text (Optional)"
            text="floating_badge"
            register={register("floating_badge")}
            errors={errors}
            required={false}
          />

          {/* Rating label */}
          <Input
            label="Rating Label (Optional)"
            text="rating_label"
            register={register("rating_label")}
            errors={errors}
            required={false}
          />

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

          {/* Description */}
          <Textarea
            label="Sub-headline Description (Optional)"
            text="description"
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
          />

          {/* Specialties */}
          <Textarea
            label="Specialties / Focus Areas (Optional, one per line)"
            text="specialties"
            register={register("specialties")}
            errors={errors}
            required={false}
            className="col-span-full"
          />

          {/* Trust Stats */}
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-2">
              Trust Stats (icon / value / label)
            </label>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                  <select
                    {...register(`stats.${index}.icon` as const)}
                    className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-300 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    {statIconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder="Value, e.g. 10+"
                    {...register(`stats.${index}.value` as const)}
                    className="w-full sm:flex-1 px-3 py-2 rounded-md border border-gray-300 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <input
                    placeholder="Label, e.g. Years Experience"
                    {...register(`stats.${index}.label` as const)}
                    className="w-full sm:flex-1 px-3 py-2 rounded-md border border-gray-300 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="shrink-0 rounded-md p-2 text-red-600 hover:bg-red-100 transition self-center"
                    title="Remove stat"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ icon: "Star", value: "", label: "" })}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <Plus size={16} /> Add Stat
            </button>
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Hero Background / Photo
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Hero Photo Preview"
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
            text={isUpdating ? "Updating..." : "Update Hero"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditHero;
