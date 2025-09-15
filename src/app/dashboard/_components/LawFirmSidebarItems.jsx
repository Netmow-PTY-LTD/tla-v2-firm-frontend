"use client";
import {
  ArrowLeftRight,
  ChartBarStacked,
  ChartColumnStacked,
  CircleEllipsis,
  Earth,
  FileQuestionMark,
  Kanban,
  LandPlot,
  LayoutDashboard,
  List,
  Logs,
  MapPinHouse,
  Package,
  Plus,
  Podcast,
  Settings,
  SquareKanban,
  SquareTerminal,
  Users,
} from "lucide-react";

export const LawFirmSidebarItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Staffs",
      url: "/dashboard/staffs",
      icon: Users,
      isActive: true,
    },
    {
      title: "Lawyers",
      url: "/dashboard/lawyers",
      icon: Users,
      isActive: true,
    },

    {
      title: "Requests",
      url: "/dashboard/requests",
      icon: MapPinHouse,
      isActive: true,
    },
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: LandPlot,
      isActive: true,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: true,
    },
  ],
};
