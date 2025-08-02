import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          React Component Library Test
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          This is a clean NextJS app for testing the shared react-component package.
          All styling comes from the component library.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/components"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Components
          </Link>
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Open Storybook
          </a>
        </div>
      </main>
    </div>
  );
}
