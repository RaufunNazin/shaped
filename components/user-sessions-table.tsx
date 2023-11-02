"use client";

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
} from "./dashboard-table";
import DescriptionModal from "./description-modal";
import React from "react";

export function UserSessionsTable({
  recentSessions,
  currentSession,
  onSessionChange,
  error,
}: any) {
  return (
    <div className="flex justify-center">
      {error ? (
        <div />
      ) : recentSessions && Object.keys(recentSessions).length === 0 ? (
        <div />
      ) : (
        <div className="w-full">
          <div className="my-2 text-black bg-white font-bold">
            Recent Sessions
          </div>
          <DashboardTableWrapper className="table-container max-w-full overflow-y-auto h-[225px]">
            <table className="w-full">
              <thead>
                <tr>
                  <DashboardTableHeader className="w-[25%] bg-white text-sm font-bold normal-case text-black">
                    Start/End
                  </DashboardTableHeader>
                </tr>
              </thead>
              <tbody className="relative divide-y divide-gray-200">
                {recentSessions.map((session: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={`cursor-pointer hover:bg-gray-50`}
                      onClick={() => {
                        onSessionChange(session.sessionStartTime);
                      }}
                    >
                      <DashboardTableCell
                        className={`${
                          currentSession === session.sessionStartTime
                            ? "bg-[#1e293b] text-white"
                            : "bg-white text-gray-500"
                        } w-[20%]`}
                      >
                        {session.sessionStartTime == null ? (
                          "NULL"
                        ) : (
                          <div>
                            {session.sessionStartTime}
                            <br />
                            {session.sessionEndTime}
                          </div>
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
