"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { editorInSchema } from "@/lib/editor-in-schema";
import {
  editorOutSchema,
  EditorFormState,
  EditorOutSchema,
} from "@/lib/editor-out-schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export function RecipeEditor({ existingRecipeData = {} }) {
  const form = useForm<EditorFormState, any, EditorOutSchema>({
    // What to use to validate data during editing and on submit
    resolver: zodResolver(editorOutSchema),
    mode: "onTouched",

    // What to use for initial data (must be RHF safe, i.e. no nulls etc)
    defaultValues: editorInSchema.parse(existingRecipeData),
  });

  function onSubmit(data: EditorOutSchema) {
    console.log("DB-ready data:", data);
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}></form>;
}
