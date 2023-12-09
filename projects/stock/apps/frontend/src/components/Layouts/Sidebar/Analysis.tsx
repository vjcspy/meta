import Link from 'next/link';

const SidebarAnalysis = () => {
  return (
    <>
      {/*Stock Analysis*/}
      <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
        <svg
          className="hidden h-5 w-4 flex-none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Tick</span>
      </h2>

      <li className="nav-item">
        <Link href="/analysis/tick/intraday" className="group">
          <div className="flex items-center">
            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
              Tick Intraday
            </span>
          </div>
        </Link>
        <Link href="/analysis/tick/at-price" className="group">
          <div className="flex items-center">
            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
              Tick At Prices
            </span>
          </div>
        </Link>
        <Link href="/analysis/tick/range" className="group">
          <div className="flex items-center">
            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
              Tick Range
            </span>
          </div>
        </Link>
        <Link href="/analysis/tick/range-market" className="group">
          <div className="flex items-center">
            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
              Tick Range Market
            </span>
          </div>
        </Link>
      </li>
    </>
  );
};

export default SidebarAnalysis;
