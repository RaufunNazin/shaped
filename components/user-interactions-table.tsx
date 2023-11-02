"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table";
import DescriptionModal from "./description-modal";
import { MessageBox } from "./message-box";
import { Selector, SelectorLabeled } from "./selector";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";

export function UserInteractionsTable({ userInteractions, error }: any) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [userInteractions]);
  const [label1, setlabel1] = useState("items_caption");
  const [label2, setlabel2] = useState("items_content_type");

  const recordsPerPage = 5;
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = Math.min(
    currentPage * recordsPerPage,
    userInteractions?.length ?? 0
  );
  const records = userInteractions?.slice(firstIndex, lastIndex);

  return (
    <div className="flex justify-center">
      {error ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="Error" subtitle={error} />
        </DashboardEmptyRow>
      ) : userInteractions == null ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="No data yet">
            Enter a user_id and click submit.
          </MessageBox>
        </DashboardEmptyRow>
      ) : userInteractions && userInteractions.length === 0 ? (
        <DashboardEmptyRow className="text-center" colSpan={5}>
          <MessageBox title="No previous interaction found"></MessageBox>
        </DashboardEmptyRow>
      ) : (
        <div className="w-full">
          <div className="my-2 text-black bg-white font-bold">
            Recent Events
          </div>
          <DashboardTableWrapper className="max-w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <DashboardTableHeader className="w-[20%] bg-white text-sm font-bold normal-case text-black">
                    <SelectorLabeled
                      label={label1}
                      placeholder={""}
                      items={["items_caption", "user_id", "item_id", "items_user_id"]}
                      onValueChange={(value: string) => {
                        setlabel1(value);
                      }}
                    />
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[20%] bg-white text-sm font-bold normal-case text-black">
                    <SelectorLabeled
                      label={label2}
                      placeholder={""}
                      items={["items_content_type", "user_id", "item_id", "items_user_id"]}
                      onValueChange={(value: string) => {
                        setlabel2(value);
                      }}
                    />
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[20%] bg-white text-sm font-bold normal-case text-black">
                    label
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[20%] bg-white text-sm font-bold normal-case text-black">
                    timestamp
                  </DashboardTableHeader>
                </tr>
              </thead>
              <tbody className="relative divide-y divide-gray-200">
                {records.map((item: any, index: any) => {
                  return (
                    <tr
                      key={`model_${index}`}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <DashboardTableCell className="w-[20%] text-gray-500">
                        {item[label1] == null ? (
                          "NULL"
                        ) : item[label1].toString().length < 100 ? (
                          item[label1]
                        ) : (
                          <DescriptionModal description={item[label1]} />
                        )}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[20%] text-gray-500">
                        {item[label2] == null ? (
                          "NULL"
                        ) : item[label2].toString().length < 100 ? (
                          item[label2]
                        ) : (
                          <DescriptionModal description={item[label2]} />
                        )}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[20%] text-gray-500">
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DashboardTableWrapper>

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
          </div>
        </div>
      )}
    </div>
  );
}
