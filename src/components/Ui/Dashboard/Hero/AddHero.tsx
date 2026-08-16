"use client";

/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, X } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { statIconOptions } from "@/src/utils/statIconMap";
import { useCreateHeroMutation } from "@/src/redux/api/heroApi";

interface AddHeroFormValues {
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

const AddHero = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createHero, { isLoading }] = useCreateHeroMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddHeroFormValues>({
    defaultValues: {
      badge: "",
      affiliation: "",
      title: "",
      description: "",
      specialties: "",
      primary_button_text: "Book a Service",
      primary_button_link: "#contact",
      secondary_button_text: "View Our Work",
      secondary_button_link: "#portfolio",
      stats: [{ icon: "Wrench", value: "10+", label: "Years Experience" }],
      rating_value: "5",
      rating_label: "",
      floating_badge: "",
      position: 1,
      is_active: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stats",
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

  const onSubmit: SubmitHandler<AddHeroFormValues> = async (values) => {
    try {
      const formData = new FormData();

      if (values.badge) formData.append("badge", values.badge);
      if (values.affiliation)
        formData.append("affiliation", values.affiliation);
      formData.append("title", values.title);
      if (values.description)
        formData.append("description", values.description);

      const specialtiesArr = (values.specialties || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (specialtiesArr.length > 0) {
        formData.append("specialties", JSON.stringify(specialtiesArr));
      }

      if (values.primary_button_text)
        formData.append("primary_button_text", values.primary_button_text);
      if (values.primary_button_link)
        formData.append("primary_button_link", values.primary_button_link);
      if (values.secondary_button_text)
        formData.append("secondary_button_text", values.secondary_button_text);
      if (values.secondary_button_link)
        formData.append("secondary_button_link", values.secondary_button_link);

      const validStats = (values.stats || []).filter(
        (s) => s.icon && s.value && s.label,
      );
      if (validStats.length > 0) {
        formData.append("stats", JSON.stringify(validStats));
      }

      if (values.rating_value)
        formData.append("rating_value", values.rating_value);
      if (values.rating_label)
        formData.append("rating_label", values.rating_label);
      if (values.floating_badge)
        formData.append("floating_badge", values.floating_badge);

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

      await createHero(formData).unwrap();
      toast.success("Hero entry created successfully!");
      reset();
      setImagePreview(null);
      router.push(ALL_HERO_PATH);
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
        title="Add Hero Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Hero Section", link: ALL_HERO_PATH },
          { title: "Add Hero" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badge */}
          <Input
            label="Badge Text (Optional)"
            text="badge"
            placeholder="Dhaka's Premium Auto Detailing Studio"
            register={register("badge")}
            errors={errors}
            required={false}
          />

          {/* Affiliation */}
          <Input
            label="Affiliation (Optional)"
            text="affiliation"
            placeholder="e.g. Certified Partner Workshop"
            register={register("affiliation")}
            errors={errors}
            required={false}
          />

          {/* Title */}
          <Input
            label="Headline Title"
            text="title"
            placeholder="Where Machines Become Art"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Rating value */}
          <Input
            label="Rating Value (Optional)"
            text="rating_value"
            placeholder="5"
            register={register("rating_value")}
            errors={errors}
            required={false}
          />

          {/* Primary button text */}
          <Input
            label="Primary Button Text"
            text="primary_button_text"
            placeholder="Book a Service"
            register={register("primary_button_text", {
              required: "Primary button text is required",
            })}
            errors={errors}
          />

          {/* Primary button link */}
          <Input
            label="Primary Button Link"
            text="primary_button_link"
            placeholder="#contact"
            register={register("primary_button_link")}
            errors={errors}
            required={false}
          />

          {/* Secondary button text */}
          <Input
            label="Secondary Button Text (Optional)"
            text="secondary_button_text"
            placeholder="View Our Work"
            register={register("secondary_button_text")}
            errors={errors}
            required={false}
          />

          {/* Secondary button link */}
          <Input
            label="Secondary Button Link (Optional)"
            text="secondary_button_link"
            placeholder="#portfolio"
            register={register("secondary_button_link")}
            errors={errors}
            required={false}
          />

          {/* Floating badge */}
          <Input
            label="Floating Badge Text (Optional)"
            text="floating_badge"
            placeholder="Available for Bookings"
            register={register("floating_badge")}
            errors={errors}
            required={false}
          />

          {/* Rating label */}
          <Input
            label="Rating Label (Optional)"
            text="rating_label"
            placeholder="See what our customers say"
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
            placeholder="Premium Auto Detailing, Restoration & Customization in Dhaka"
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
          />

          {/* Specialties */}
          <Textarea
            label="Specialties / Focus Areas (Optional, one per line)"
            text="specialties"
            placeholder={"Paint Correction\nCeramic Coating\nFull Restoration"}
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
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-red-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Hero Background / Photo
            </label>

            {imagePreview && (
              <div className="relative mb-4 h-32 w-48 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Hero Photo Preview"
                  fill
                  className="object-cover"
                  unoptimized
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
            text={isLoading ? "Saving..." : "Create Hero"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddHero;
