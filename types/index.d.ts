import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem
export type ModelsNav = NavItem
export type DatasetsNav = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  modelsNav: ModelsNav[]
  datasetsNav: DatasetsNav[]
  settingSidebarNav: SidebarNavItem[]
  adminSidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = {
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  isPro: boolean
}

export type Organization = {
  name?: string
  organizationId: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  email: string
  apiKey: string
  isAdmin: boolean
}

export type Member = {
  organizationId: number
  organizationName?: string
  member_id: number
  email: string
  name?: string
  role: string
  status: string
}

export interface Model {
  model_name: string
  status: string
  created_at: string
  last_updated: string
  model_uri: string
}

export interface Feature {
  name: string
  type: string
}

export interface ModelSchema {
  interaction: Feature[]
  user: Feature[]
  item: Feature[]
}

export interface ModelDetails extends Model {
  error_message?: string
  model_schema: ModelSchema
  fetch: string
  trained_at: string
}

export interface ModelTableSchema {
  name: string
  features: Feature[]
}

interface DatasetTableField {
  id: string
  fieldName: string
  fieldType: string
  accordionOpen: boolean
  nestedFields: DatasetTableField[]
}

export interface DatasetTableSchema {
  fields: DatasetTableField[]
  idToFieldMapping: Record<number, DatasetTableField>
}

export interface DataSet {
  dataset_id: string
  dataset_uri: string
  dataset_name: string
  status: string
  created_at: string
  updated_at: string
}

export interface DatasetDetails extends DataSet {
  schema_type: string
  dataset_schema: Feature[]
}

interface DataPoint {
  name: string
  value: number
}

interface BarData extends DataPoint {
  color?: string
  alias: string
}

interface LineData {
  title: string
  color: string
  data: DataPoint[]
}

interface GraphData {
  title: string
  latestValue: string
  color: string
}

interface ChartSelector {
  selectorName: string
  values: string[]
  defaultValue: string
}

interface TrainMetricsData {
  metricName: string
  modelType: string
  segmentation: string
  slateSize?: string
  data: DataPoint[]
}

interface TrainMetrics {
  evaluationData: TrainMetricsData[]
  summaryData: TrainMetricsData[]
}

interface OnlineMetricsData {
  timestamp: string
  shaped: number
}
interface OnlineMetrics {
  precision: OnlineMetricsData[]
  coverage: OnlineMetricsData[]
  attributedSessionCount: OnlineMetricsData[]
  sessionCount: OnlineMetricsData[]
  rankRequestCount: OnlineMetricsData[]
}

export interface ComboBoxData {
  attributeName: string
  attributeType: DataType
  uniqueValues?: string[]
}

export interface ComboBoxSelectedData {
  attributeName: string
  attributeType: DataType
  operator?: string
  value?: string
}