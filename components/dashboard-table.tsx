import { cn } from "@/lib/utils"
interface DashboardTableWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DashboardTableWrapper = ({
  className,
  children,
}: DashboardTableWrapperProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-lg border border-solid border-gray-200 bg-white  md:block lg:block ",
        className
      )}
    >
      <div className="sm:rounded-lg">{children}</div>
    </div>
  )
}

interface DashboardTableCellProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DashboardTableCell = ({
  className,
  children,
}: DashboardTableCellProps) => {
  return (
    <td
      className={cn(
        "text-heading whitespace-nowrap px-6 py-2 text-left text-sm font-normal",
        className
      )}
    >
      {children}
    </td>
  )
}

interface DashboardTableHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: number
}

export const DashboardTableHeader = ({
  className,
  colSpan,
  children,
}: DashboardTableHeaderProps) => {
  return (
    <th
      scope="col"
      colSpan={colSpan ?? 1}
      className={cn(
        "border-grey-200 round rounded-t-lg border-b bg-gray-50 px-6 py-2 text-left text-xs font-medium uppercase text-gray-500",
        className
      )}
    >
      {children}
    </th>
  )
}

interface DashboardEmptyRowProps extends React.HtmlHTMLAttributes<HTMLElement> {
  colSpan: number
}

export const DashboardEmptyRow = ({
  colSpan,
  className,
  children,
}: DashboardEmptyRowProps) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>{children}</td>
      </tr>
    </tbody>
  )
}
