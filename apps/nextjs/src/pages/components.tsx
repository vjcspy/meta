import { Button } from 'react-component';
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

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              ← Quay lại trang chủ
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => window.open('http://localhost:6006', '_blank')}
            >
              📚 Mở Storybook
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}