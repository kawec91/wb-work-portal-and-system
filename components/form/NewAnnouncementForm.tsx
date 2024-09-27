"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TipTap from "../TipTap";
import { useRouter } from "next/navigation";

const NewAnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");

  const router = useRouter();

  const handleContentChange = (res: string) => {
    setContent(res);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("salary", salary);
    formData.append("location", location);
    formData.append("description", content);

    if (image) {
      formData.append("image", image); // Attach the file to FormData
    }

    try {
      const response = await fetch("/api/announcement/new", {
        method: "POST",
        body: formData, // Send the FormData as the request body
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const result = await response.json();
      console.log("Announcement created:", result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      router.push(`${process.env.NEXTAPP_URL}/admin/announcements`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 w-full max-w-lg"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Tytuł</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Wpisz tytuł..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="salary">Wynagrodzenie</Label>
        <Input
          id="salary"
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Podaj wynagrodzenie np. 31-35"
          required
        />
      </div>

      <div className="space-y-2 flex items-center gap-4">
        <Label htmlFor="location">Localizacja</Label>
        <select
          id="location"
          name="location"
          defaultValue={"Wybierz..."}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value={""}>Wybierz...</option>
          <option value={"ul. Mostowa 36, 87-100 Toruń"}>Toruń</option>
          <option value={"ul. Poznańska 8, 85-129 Bydgoszcz"}>Bydgoszcz</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <TipTap
          initialContent={content}
          onChange={(newContent: string) => handleContentChange(newContent)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Zdjęie (Kafelek)</Label>
        <Input
          id="image"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </div>

      <Button type="submit">Utwórz</Button>
    </form>
  );
};

export default NewAnnouncementForm;
