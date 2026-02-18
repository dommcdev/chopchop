### Add Components

You can add shadcn components to our project:

```bash
bunx --bun shadcn@latest add button
```

The command above will add the `Button` component to our project. You can then import it like this:

```tsx {1,6} showLineNumbers title="app/page.tsx"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

</Steps>

You can find other components here: https://ui.shadcn.com/docs/components
