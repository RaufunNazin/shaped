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
import { Icons } from "./icons";
import { Selector, SelectorLabeled } from "./selector";

export function UserResultsTable({ resultsData, error }: any) {
  const LightBulb = Icons["lightBulb"];
  const [currentPage, setCurrentPage] = useState(1);
  const [slateSize, setSlateSize] = useState("5");
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 5;
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = Math.min(
    currentPage * recordsPerPage,
    resultsData?.length ?? 0
  );
  const records = resultsData?.slice(firstIndex, lastIndex);

  const keys = ["item_id", "score"];
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
          <div className="flex justify-between items-center my-4">
            <div className="my-2 text-black bg-white font-bold">Results</div>
            <div className="flex items-center">
              <div className="flex items-center gap-x-3">
                <p>Slate Size:</p>
                <Selector
                  placeholder={slateSize}
                  items={["5", "10", "15"]}
                  onValueChange={(value: string) => {
                    setSlateSize(value);
                  }}
                  className="rounded-lg shadow-sm py-2 px-5"
                />
              </div>

              <Button
                type="submit"
                // onClick={() => handleSubmit(userId)}
                className="w-[7.5rem] rounded-2xl bg-black text-white ml-5"
                // disabled={loading || userId == null || userId.length == 0}
              >
                {loading ? (
                  <Icons.spinner className="mr-2 h-4 w-10 animate-spin" />
                ) : (
                  <div className="flex flex-row justify-between items-center space-x-1">
                    <LightBulb className="h-4 w-4" />
                    <div className="font-semibold">Re-rank</div>
                  </div>
                )}
              </Button>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto flex flex-col gap-y-4">
            <DashboardTableWrapper className="max-w-full overflow-x-auto">
              <table className="w-full">
                <tbody className="relative divide-y divide-gray-200">
                  {keys.map((key, index) => {
                    if (key === "Preview" || key === "item_id" || key === "genre")
                      return (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <DashboardTableHeader className="bg-white p-4 text-sm font-bold normal-case text-black w-[10%]">
                            {key}
                          </DashboardTableHeader>
                          {records.map((result: any, resultIndex: number) => (
                            <td
                              key={resultIndex}
                              className={`p-4 border border-t-0 w-[18%]`}
                            >
                              {key === "Preview" && result[key] ? (
                                <img
                                  key={key}
                                  src={result[key]}
                                  alt={result["title"]}
                                  className="rounded-lg img-fluid min-w-full"
                                />
                              ) : key === "item_id" && result[key] ? (
                                <div className="">{result[key]}</div>
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
                          <DashboardTableHeader className="bg-white p-4 text-sm font-bold normal-case text-black w-[10%]">
                            {key}
                          </DashboardTableHeader>
                          {records.map((result: any, resultIndex: number) => (
                            <td
                              key={resultIndex}
                              className={`p-4 border border-t-0 w-[18%]`}
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
