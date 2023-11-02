"use client"

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table"
import DescriptionModal from "./description-modal"
import { MessageBox } from "./message-box"
import { Selector, SelectorLabeled } from "./selector"
import { Button } from "./ui/button"
import React, { useEffect, useRef, useState } from "react"

export function UserInteractionsTable({ userInteractions, error }: any) {
  // const [currentPage, setCurrentPage] = useState(1)

  // useEffect(() => setCurrentPage(1), [userInteractions])
  const [label1, setlabel1] = useState("items_caption")
  const [label2, setlabel2] = useState("items_content_type")
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const tableRef = useRef<any>(null)

  // const recordsPerPage = 5
  // const firstIndex = (currentPage - 1) * recordsPerPage
  // const lastIndex = Math.min(
  //   currentPage * recordsPerPage,
  //   userInteractions?.length ?? 0
  // )
  // const records = userInteractions?.slice(firstIndex, lastIndex)

  const table = tableRef.current
  const handleScroll = () => {
    console.log("first")
    if (tableRef.current) {
      const rowHeight = 50 // Adjust this to match your row height
      const scrollTop = tableRef.current.scrollTop
      const newIndex = Math.floor(scrollTop / rowHeight)
      console.log(newIndex)
    }
  }
  useEffect(() => {
    // document
    //   .getElementById("table")
    //   ?.addEventListener("scroll", (event) =>
    //     console.log(event.target?.scrollTop)
    //   )
    console.log(tableRef.current)
    if (tableRef.current) {
      // window.addEventListener("scroll", handleScroll)
      tableRef.current.onscroll = handleScroll as any

      return () => {
        table?.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

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
          <div className="my-2 bg-white font-bold text-black">
            Recent Events
          </div>
          <div onScroll={handleScroll} className="">
            <div id="table" className="table-container max-w-full">
              <table
                className="w-full border border-solid border-gray-200"
                ref={tableRef}
              >
                <thead className="sticky top-0 z-10">
                  <tr>
                    <DashboardTableHeader className="w-[30%] bg-white text-sm font-bold normal-case text-black">
                      <Selector
                        // label={label1}
                        placeholder={label1}
                        items={[
                          "items_caption",
                          "items_content_type",
                          "user_id",
                          "item_id",
                          "items_user_id",
                        ]}
                        onValueChange={(value: string) => {
                          setlabel1(value)
                        }}
                        className="ml-0 px-0 shadow-none outline-none"
                      />
                    </DashboardTableHeader>
                    <DashboardTableHeader className="w-[30%] bg-white text-sm font-bold normal-case text-black">
                      <Selector
                        // label={label2}
                        placeholder={label2}
                        items={[
                          "items_caption",
                          "items_content_type",
                          "user_id",
                          "item_id",
                          "items_user_id",
                        ]}
                        onValueChange={(value: string) => {
                          setlabel2(value)
                        }}
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
                            <DescriptionModal
                              description={item["created_at"]}
                            />
                          )}
                        </DashboardTableCell>
                        <DashboardTableCell className="w-[5%]"></DashboardTableCell>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

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
  )
}
