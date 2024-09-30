"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zfd } from "zod-form-data";

// Zod schema validation
const applicationSchema = z.object({
  document: zfd.file(
    z
      .instanceof(File)
      .refine((file) => file.size <= 10000000, "File size should be under 10MB")
      .refine(
        (file) =>
          ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(
            file.type
          ),
        "File format must be PDF, JPG, JPEG, or PNG"
      )
  ),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm = () => {
  const { data: session } = useSession();
  const { toast } = useToast();

  // Derive name and image URL from session data
  const userName =
    session?.user?.name ||
    session?.user?.username ||
    session?.user?.email ||
    "";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || ""; // Assuming 'image' URL is in the session

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ApplicationFormData) => {
    const formData = new FormData();
    formData.append("email", userEmail);
    formData.append("name", userName);
    formData.append("image", userImage); // Sending the image URL from session
    if (selectedDocument) {
      formData.append("document", selectedDocument);
    }

    try {
      const response = await fetch("/api/aplication/new", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Application submitted successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Ooops! Failed to submit application.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Ooops! An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Document File */}
      <div>
        <Label htmlFor="document">Upload Document (PDF, JPG, JPEG, PNG)</Label>
        <Input
          type="file"
          id="document"
          //accept="application/pdf, image/jpeg, image/png, image/jpg"
          {...register("document")}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setSelectedDocument(e.target.files[0]);
            }
          }}
        />
        {errors.document && (
          <p className="text-red-600">{errors.document.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="mt-4">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default ApplicationForm;
