"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table";
import { MessageBox } from "./message-box";
import DescriptionModal from "./description-modal";
import React, { useState } from "react";
import { Button } from "./ui/button";

export function UserResultsTable({ resultsData, error }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = Math.min(
    currentPage * recordsPerPage,
    resultsData?.length ?? 0
  );
  const records = resultsData?.slice(firstIndex, lastIndex);

  const keys = ["Preview", "title", "genre", "score", "source", "shapley"];
  return (
    <div className="flex justify-center">
      {error ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="Error" subtitle={error} />
        </DashboardEmptyRow>
      ) : resultsData == null ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="No data yet">
            Enter a user_id and click submit.
          </MessageBox>
        </DashboardEmptyRow>
      ) : resultsData && resultsData.length === 0 ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="No previous interaction found"></MessageBox>
        </DashboardEmptyRow>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="my-2 text-black bg-white font-bold">Results</div>
          </div>
          <div className="max-w-full overflow-x-auto flex flex-col gap-y-4">
            <DashboardTableWrapper className="max-w-full overflow-x-auto">
              <table className="w-full">
                <tbody className="relative divide-y divide-gray-200">
                  {keys.map((key, index) => {
                    if (key === "Preview" || key === "title" || key === "genre")
                      return (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <DashboardTableHeader className="bg-white p-4 text-sm font-bold normal-case text-black">
                            {key}
                          </DashboardTableHeader>
                          {records.map((result: any, resultIndex: number) => (
                            <td
                              key={resultIndex}
                              className="p-4 border w-[20%]"
                            >
                              {key === "Preview" && result[key] ? (
                                <img
                                  key={key}
                                  src={result[key]}
                                  alt={result["title"]}
                                  className="rounded-lg img-fluid min-w-full"
                                />
                              ) : key === "title" && result[key] ? (
                                <div className="underline">{result[key]}</div>
                              ) : key === "genre" && result[key] ? (
                                result[key].join(", ")
                              ) : (
                                result[key]
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </DashboardTableWrapper>
            <DashboardTableWrapper className="max-w-full overflow-x-auto">
              <table className="w-full">
                <tbody className="relative divide-y divide-gray-200">
                  {keys.map((key, index) => {
                    if (
                      key === "score" ||
                      key === "source" ||
                      key === "shapley"
                    )
                      return (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <DashboardTableHeader className="bg-white p-4 text-sm font-bold normal-case text-black">
                            {key}
                          </DashboardTableHeader>
                          {records.map((result: any, resultIndex: number) => (
                            <td
                              key={resultIndex}
                              className="p-4 border w-[20%]"
                            >
                              {result[key]}
                            </td>
                          ))}
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </DashboardTableWrapper>
            <div className="flex flex-row justify-between pb-6 pt-8 ">
              <div className="text-sm">
                Showing {firstIndex + 1}-{lastIndex} of {resultsData.length}{" "}
                interactions
              </div>
              <div className="flex flex-row space-x-4">
                <Button
                  disabled={firstIndex + 1 === 1 ? true : false}
                  className="border border-slate-200 bg-white text-black hover:bg-white"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={lastIndex === resultsData.length ? true : false}
                  className="border border-slate-200 bg-white text-black hover:bg-white"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
