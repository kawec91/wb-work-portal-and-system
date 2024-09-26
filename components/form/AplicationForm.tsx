"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useState } from "react";

const formSchema = z.object({
  document: z.instanceof(File).refine(
    (file) => {
      return (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    },
    {
      message: "File must be a PDF or Word document.",
    }
  ),
});

type FormData = z.infer<typeof formSchema>;

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data: session } = useSession();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setUploading(true);
    const formData = new FormData();

    // Append user data from session
    formData.append("email", session?.user.email || "");
    formData.append("image", session?.user.image || "");
    formData.append(
      "name",
      session?.user.username || session?.user.name || session?.user.email || ""
    );

    // Append the document
    formData.append("document", data.document); // Ensure this is correct

    const response = await fetch("/api/aplication/new", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Handle success (e.g., show a success message)
    } else {
      // Handle error (e.g., show an error message)
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Document:</label>
        <input type="file" {...register("document")} />
        {errors.document && <p>{errors.document.message}</p>}
      </div>
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default ApplicationForm;
