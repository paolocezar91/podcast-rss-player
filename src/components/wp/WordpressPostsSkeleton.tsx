import React from "react";
import Skeleton from "../ui/Skeleton";
import { ContentColumn } from "../ui/content/ContentColumn";
import DescriptionColumn from "../ui/content/DescriptionColumn";
import Table from "../table/table";
import { twMerge as cn } from "tailwind-merge";

export default function WordpressPostsSkeleton() {
  const tableHeaders = (
    <>
      <th className="text-white text-left py-1 px-1 w-2/3">Post</th>
      <th className="text-white text-left py-1 px-1 w-1/6 text-center">Data</th>
      <th className=""></th>
    </>
  );

  const rows = Array.from({ length: 20 }).map((_, idx) => (
    <tr
      key={idx}
      className={cn(
        idx !== 5
          ? "border-solid border-foreground border-b-2 cursor-pointer bg-gray-100 hover:bg-gray-300/50"
          : ""
      )}
    >
      <td className="truncate max-w-[225px] px-1 py-2">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="px-1 py-2 text-center">
        <Skeleton className="h-4 w-20 mx-auto" />
      </td>
      <td className="px-1 py-2">
        <div className="flex items-center justify-center">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="flex gap-4 h-full">
      <DescriptionColumn>
        <>
          <div className="flex flex-col grow gap-4">
            <div className="flex flex-col items-center gap-4 mt-2 justify-center">
              <h1 className="text-3xl font-bold text-gray-900">
                <Skeleton className="h-8 w-64" />
              </h1>
              <div className="w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-7/8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          <div className="overflow-auto grow">
            <Table headers={tableHeaders}>{rows}</Table>
            <div className="p-4 flex justify-center">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </>
      </DescriptionColumn>

      <ContentColumn>
        <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-lg font-semibold text-gray-900 mt-1">
                  <Skeleton className="h-6 w-48" />
                </h1>
              </div>
            </div>
            <div>
              <Skeleton className="w-full h-[500px] rounded-md mb-2" />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-sm text-gray-900 font-medium">
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-1 prose max-w-none">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
              </div>

              <div className="mt-2">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </ContentColumn>
    </div>
  );
}
