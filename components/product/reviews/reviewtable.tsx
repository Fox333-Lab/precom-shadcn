import { useState } from "react";
import ReviewCard from "./reviewcard";
import TableHeader from "./tableheader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ReviewTable = ({ reviews, allSizes, colors }: any) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const lastIndex = page * PER_PAGE;
  const firstIndex = lastIndex - PER_PAGE;
  const records = reviews.slice(firstIndex, lastIndex);
  const count = Math.ceil(reviews.length / PER_PAGE);
  const numbers = Array.from({ length: count }, (_, index) => index + 1);

  const prevPage = (e: any) => {
    e.preventDefault();
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const nextPage = (e: any) => {
    e.preventDefault();
    if (page !== count) {
      setPage(page + 1);
    }
  };
  const changeCurrentPage = (e: any, pageId: number) => {
    e.preventDefault();
    setPage(pageId);
  };
  return (
    <>
      <TableHeader
        allSizes={[{ size: "All" }, ...allSizes]}
        colors={[{ color: "", image: "" }, ...colors]}
      />
      <div className="flex flex-col gap-2 mt-5">
        {records.map((review: any, i: number) => (
          <ReviewCard review={review} key={i} />
        ))}
      </div>
      {/* <ul className="mt-5">
        <li>
          <a href="#" onClick={prevPage}>
            Prev
          </a>
        </li>
        {numbers.map((number, i) => (
          <li
            key={i}
            className={`${page == number ? `font-semibold` : `font-normal`}`}
          >
            <a href="#" onClick={(e) => changeCurrentPage(e, number)}>
              {number}
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul> */}
      {reviews.length > 0 && (
        <nav className="mt-5">
          {/* <ul className="flex">
            <li>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
                aria-label="Previous"
                onClick={prevPage}
              >
                <span className="material-icons text-sm">
                  <ChevronLeft />
                </span>
              </a>
            </li>
            {numbers.map((number, i) => (
              <li
                key={i}
                className={`${
                  page == number ? `font-semibold` : `font-normal`
                }`}
              >
                <a
                  href="#"
                  onClick={(e) => changeCurrentPage(e, number)}
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                    page == number
                      ? `bg-gradient-to-tr from-green-600 to-blue-400 shadow-blue-500/20 transition duration-150 ease-in-out text-white`
                      : `text-black `
                  }  p-0 text-sm shadow-md`}
                >
                  {number}
                </a>
              </li>
            ))}

            <li>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
                aria-label="Next"
                onClick={nextPage}
              >
                <span className="text-sm">
                  <ChevronRight />
                </span>
              </a>
            </li>
          </ul> */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-label="Previous"
                  onClick={prevPage}
                />
              </PaginationItem>
              {numbers.map((number, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => changeCurrentPage(e, number)}
                    isActive={page == number}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext href="#" aria-label="Next" onClick={nextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </nav>
      )}
    </>
  );
};

export default ReviewTable;
