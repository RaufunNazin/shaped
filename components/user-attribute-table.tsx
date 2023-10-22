"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
} from "./dashboard-table";
import DescriptionModal from "./description-modal";
import React, { use } from "react";

export function UserAttrubuteTable({ userAttributes, error }: any) {
  return (
    <div className="flex justify-center">
      {error ? (
        <div />
      ) : userAttributes && Object.keys(userAttributes).length === 0 ? (
        <div />
      ) : (
        <div className="w-full">
          <div className="my-2 text-black bg-white font-bold">
            User features
          </div>
          <DashboardTableWrapper className="max-w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <DashboardTableHeader className="w-[25%] bg-white p-4 text-sm font-bold normal-case text-black">
                    attribute
                  </DashboardTableHeader>
                  <DashboardTableHeader className="w-[25%] bg-white p-4 text-sm font-bold normal-case text-black">
                    value
                  </DashboardTableHeader>
                </tr>
              </thead>
              <tbody className="relative  divide-y divide-gray-200">
                {Object.keys(userAttributes).map((key: any, index: number) => {
                  return (
                    <tr key={index} className="cursor-pointer hover:bg-gray-50">
                      <DashboardTableCell className="w-[20%] p-4 text-gray-500">
                        {key}
                      </DashboardTableCell>
                      <DashboardTableCell className="w-[20%] p-4 text-gray-500">
                        {userAttributes[key] == null ? (
                          "NULL"
                        ) : userAttributes[key].toString().length < 100 ? (
                          userAttributes[key]
                        ) : (
                          <DescriptionModal description={userAttributes[key]} />
                        )}
                      </DashboardTableCell>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DashboardTableWrapper>
        </div>
      )}
    </div>
  );
}
