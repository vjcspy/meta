import type { PropsWithChildren } from 'react';
import { useCallback, useState } from 'react';

export default function Row(props: PropsWithChildren<{ title?: string }>) {
    const [expanded, setExpanded] = useState(true);
    const toggleCode = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    return (
        <div className="space-y-8 pt-5">
            <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-1">
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">
                            {props?.title}
                        </h5>
                        <button
                            type="button"
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                            onClick={toggleCode}
                        >
                            <span className="flex items-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ltr:mr-2 rtl:ml-2"
                                >
                                    <path
                                        d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M13.9868 5L10.0132 19.8297"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                    {expanded && (
                        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3 lg:grid-cols-6">
                            <div className="mb-5">{props.children}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
