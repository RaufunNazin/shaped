"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table";
import DescriptionModal from "./description-modal";
import { MessageBox } from "./message-box";
import { DistributedSelector, Selector, SelectorLabeled } from "./selector";
import { Button } from "./ui/button";
import React, { useEffect, useRef, useState } from "react";

export function UserInteractionsTable({
  userInteractions,
  features,
  error,
}: any) {
  const [label1, setlabel1] = useState("items_caption");
  const [label2, setlabel2] = useState("items_content_type");

  return (
    <div className="flex justify-center">
      {error ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="Error" subtitle={error} />
        </DashboardEmptyRow>
      ) : userInteractions == null || userInteractions.length === 0 ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox
            title={
              userInteractions == null
                ? "No Recent Interactions"
                : "No Interactions"
            }
          >
            {userInteractions == null
              ? "No events found for this session"
              : "Please select a session to view interactions"}
          </MessageBox>
        </DashboardEmptyRow>
      ) : (
        <div className="w-full">
          <div className="my-2 bg-white font-bold text-black">
            Recent Events
          </div>
          <DashboardTableWrapper className="table-container max-w-full overflow-y-auto h-[225px]">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr>
                  <DashboardTableHeader className="w-[30%] bg-white text-sm font-bold normal-case text-black">
                    <DistributedSelector
                      placeholder={label1}
                      onValueChange={(value: string) => {
                        setlabel1(value);
                      }}
                      features={features}
                      className="ml-0 px-0 shadow-none outline-none"
                    />
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[30%] bg-white text-sm font-bold normal-case text-black">
                    <DistributedSelector
                      placeholder={label2}
                      onValueChange={(value: string) => {
                        setlabel2(value);
                      }}
                      features={features}
                      className="ml-0 px-0 shadow-none outline-none"
                    />
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[25%] bg-white text-sm font-bold normal-case text-black">
                    label
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[20%] bg-white text-sm font-bold normal-case text-black">
                    timestamp
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[5%] bg-white text-sm font-bold normal-case text-black"></DashboardTableHeader>
                </tr>
              </thead>
              <tbody className="relative divide-y divide-gray-200">
                {userInteractions.map((item: any, index: any) => {
                  return (
                    <tr
                      key={`model_${index}`}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <DashboardTableCell className="w-[30%] text-gray-500">
                        {item[label1] == null ? (
                          "NULL"
                        ) : item[label1].toString().length < 100 ? (
                          item[label1]
                        ) : (
                          <DescriptionModal description={item[label1]} />
                        )}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[30%] text-gray-500">
                        {item[label2] == null ? (
                          "NULL"
                        ) : item[label2].toString().length < 100 ? (
                          item[label2]
                        ) : (
                          <DescriptionModal description={item[label2]} />
                        )}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[25%] text-gray-500">
                        {item["label"] == null ? (
                          "NULL"
                        ) : item["label"].toString().length < 100 ? (
                          item["label"]
                        ) : (
                          <DescriptionModal description={item["label"]} />
                        )}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[20%] text-gray-500">
                        {item["created_at"] == null ? (
                          "NULL"
                        ) : item["created_at"].toString().length < 100 ? (
                          item["created_at"]
                        ) : (
                          <DescriptionModal description={item["created_at"]} />
                        )}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[5%]"></DashboardTableCell>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DashboardTableWrapper>

          {/* 
          <div className="flex flex-row justify-between pb-6 pt-8 ">
            <div className="text-sm">
              Showing {firstIndex + 1}-{lastIndex} of {userInteractions.length}{" "}
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
                disabled={lastIndex === userInteractions.length ? true : false}
                className="border border-slate-200 bg-white text-black hover:bg-white"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
