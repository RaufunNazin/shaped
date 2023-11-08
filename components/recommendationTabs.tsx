import { CustomTabsTrigger, Tabs, TabsList } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { Outline } from "./outline"
import TitleInfo from "./title-info"
import { RecommendationTabEnum } from "@/types/enums"
import { getLoggedInUserOrganizationInfo } from "@/utils/organization-info"

interface RecommendationTabsProps {
  currentTab: RecommendationTabEnum
  onTabClick: (tab: RecommendationTabEnum) => void
}

export function RecommendationTabs({
  currentTab,
  onTabClick,
}: RecommendationTabsProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    async function getModels() {
      try {
        const { isAdmin } = await getLoggedInUserOrganizationInfo()
        setIsAdmin(isAdmin)
      } catch (error) {
        console.log("Error occurred while getting organization info: ", error)
      }
    }
    getModels()
  }, [])

  return (
    <Outline className="flex flex-row items-center">
      <div className="flex w-[30%] justify-start">
        <TitleInfo
          title="Explore"
          tooltipText="Provides insights on effectiveness and quality of the ML model for user recommendations."
        />
      </div>

      {isAdmin && (
        <div className="flex w-[30%] justify-center">
          <Tabs
            defaultValue={RecommendationTabEnum.User}
            orientation="vertical"
            onValueChange={(e:any) => onTabClick(e as RecommendationTabEnum)}
          >
            <TabsList aria-label="tabs example" className="bg-white">
              <CustomTabsTrigger
                value={RecommendationTabEnum.User}
                activeValue={currentTab}
              >
                User
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value={RecommendationTabEnum.Cohort}
                activeValue={currentTab}
              >
                Cohort
              </CustomTabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
    </Outline>
  )
}