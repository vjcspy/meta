import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div className="text-center space-y-4 flex-1">
            <h1 className="text-4xl font-bold text-foreground">
              Shadcn UI Button Components
            </h1>
            <p className="text-lg text-muted-foreground">
              Showcase of button variants and sizes with Storybook integration
            </p>
          </div>
          <ModeToggle />
        </div>

        {/* Button Variants */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Button Sizes
          </h2>
          <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Button States
          </h2>
          <div className="flex gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Interactive Examples
          </h2>
          <div className="flex gap-4">
            <Button onClick={() => alert("Primary clicked!")}>Click Me</Button>
            <Button
              variant="outline"
              onClick={() => console.log("Outline clicked!")}
            >
              Log to Console
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirm("Are you sure?")}
            >
              Confirm Action
            </Button>
          </div>
        </div>

        {/* Storybook Link */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            View detailed documentation and interactive examples in Storybook
          </p>
          <Button variant="outline" asChild>
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Storybook
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
