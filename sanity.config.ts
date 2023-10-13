import { defineConfig, type SchemaTypeDefinition } from "sanity";
import { deskTool } from "sanity/desk";
import { markdownSchema } from "sanity-plugin-markdown";

import { defineField, defineType } from "sanity";

const markdownType = defineType({
  name: "longMarkdownText",
  title: "Markdown",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "content",
      title: "content",
      type: "markdown",
    }),
  ],
});

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [markdownType],
};

export default defineConfig({
  name: "hackstack",
  title: "HackStack",
  projectId: "dsb0by8m",
  dataset: "production",
  plugins: [deskTool(), markdownSchema()],
  schema,
});
