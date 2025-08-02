import { 
  Button, 
  Input, 
  Label, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from 'react-component';
import 'react-component/styles';

export default function ComponentsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">React Component Library Demo</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔥</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
            <Button disabled>Disabled</Button>
            <Button variant="destructive" onClick={() => confirm('Are you sure?')}>
              Confirm Action
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input 
                id="disabled-input" 
                placeholder="This input is disabled" 
                disabled 
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              ← Back to Home
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => window.open('http://localhost:6006', '_blank')}
            >
              📚 Open Storybook
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}