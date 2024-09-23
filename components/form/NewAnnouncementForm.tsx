"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import TipTap from "../TipTap";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  salary: z.string().min(1, "Salary is required").max(100),
  location: z.string({
    required_error: "Please select location to display.",
  }),
  image: z.string().min(1, "Password confirmation is required"),
  description: z.string(),
});

const NewAnnouncementForm = () => {
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      salary: "",
      location: "",
      image: "",
      description: "",
    },
  });

  const handleContentChange = (res: string) => {
    setContent(res);
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    values.description = content;
    console.log("values", values);
    const response = await fetch("/api/announcement/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        salary: values.salary,
        location: values.location,
        image: values.image,
        description: values.description,
      }),
    });

    if (response.ok) {
      router.push("/admin/announcements");
    } else {
      toast({
        title: "Error",
        description: "Ooops! Something went wrong.",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="text-black">
                <FormLabel>Tytuł</FormLabel>
                <FormControl>
                  <Input
                    className="border-black"
                    placeholder="Kelner/Kelnerka Toruń"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="text-black">
                <FormLabel>Wynagrodzenie</FormLabel>
                <FormControl>
                  <Input
                    className="border-black"
                    placeholder="np. 30 - 35"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="text-black">
                <FormLabel>Lokalizacja</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border-black">
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz lokalizacaje" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ul. Mostowa 36, 87-100 Toruń">
                      Toruń
                    </SelectItem>
                    <SelectItem value="ul. Poznańska 8, 85-129 Bydgoszcz">
                      Bydgoszcz
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="text-black">
                <FormLabel>Zdjęcie (Kafelek)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="border-black"
                    placeholder="Wybierz plik"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="text-black">
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Input
                    className="border-black"
                    placeholder="Kelner/Kelnerka Toruń"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <TipTap
            initialContent={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Dodaj
        </Button>
      </form>
    </Form>
  );
};

export default NewAnnouncementForm;
