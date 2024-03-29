import React from 'react';

const Tailwind: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="absolute inset-0 -skew-y-6 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
        <div className="relative bg-white py-10 shadow-lg sm:rounded-3xl sm:p-20 md:px-4">
          <div className="mx-auto max-w-md">
            <div>
              <img
                src="/images/icons/icon-512x512.png"
                className="h-7 sm:h-8"
                alt="logo"
              />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <p>
                  An advanced online playground for Tailwind CSS, including
                  support for things like:
                </p>
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="flex h-6 items-center sm:h-7">
                      <svg
                        className="h-5 w-5 shrink-0 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      Customizing your
                      <code className="text-sm font-bold text-gray-900">
                        tailwind.config.js
                      </code>{' '}
                      file
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex h-6 items-center sm:h-7">
                      <svg
                        className="h-5 w-5 shrink-0 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      Extracting classes with
                      <code className="text-sm font-bold text-gray-900">
                        @apply
                      </code>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex h-6 items-center sm:h-7">
                      <svg
                        className="h-5 w-5 shrink-0 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">Code completion with instant preview</p>
                  </li>
                </ul>
                <p>
                  Perfect for learning how the framework works, prototyping a
                  new idea, or creating a demo to share online.
                </p>
              </div>
              <div className="pt-6 text-base font-bold leading-6 sm:text-lg sm:leading-7">
                <p>Want to dig deeper into Tailwind?</p>
                <p>
                  <a
                    href="https://tailwindcss.com/docs"
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    {' '}
                    Read the docs &rarr;{' '}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tailwind;
