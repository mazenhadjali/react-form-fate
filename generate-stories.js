import { readdir, writeFile, access } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const componentsDir = join(__dirname, "src/lib");

const storyTemplate = (componentName) => `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
  title: "Components/${componentName}",
  component: ${componentName},
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {},
};
`;

async function generateStories() {
  try {
    const files = await readdir(componentsDir);

    for (const file of files) {
      if (file.endsWith(".tsx") && !file.endsWith(".stories.tsx")) {
        const componentName = file.replace(".tsx", "");
        const storyPath = join(componentsDir, `${componentName}.stories.tsx`);

        try {
          await access(storyPath); // Check if the story file exists
          console.log(`Skipped: ${storyPath} (already exists)`);
        } catch {
          await writeFile(storyPath, storyTemplate(componentName));
          console.log(`Generated: ${storyPath}`);
        }
      }
    }

    console.log("Story generation complete!");
  } catch (error) {
    console.error("Error generating stories:", error);
  }
}

generateStories();
