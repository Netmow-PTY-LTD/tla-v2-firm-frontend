"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  AtSign,
  BadgeCent,
  BadgeCheck,
  BadgeX,
  Bell,
  BellOff,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Delete,
  Edit,
  Loader2,
  LogIn,
  Mail,
  MailCheck,
  MessageSquare,
  MoveLeft,
  Phone,
  PhoneCall,
  PhoneOutgoing,
  PlusCircle,
  Rss,
  Send,
  Tag,
  Trash2,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { notifications } from "@/data/data";
import PageLoadingSkeletons from "../_components/PageLoadingSkeletons";
import { useGetAllNotificationsQuery } from "@/store/firmFeatures/notificationsApiService";
import AccessDenied from "@/components/AccessDenied";
import { useSelector } from "react-redux";
import permissions from "@/data/permissions";
import { useCurrentUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

// const {
//   useGetNotificationsQuery,
//   useMarkAsRedNotificationMutation,
// } = require("@/store/features/notification/notificationApiService");

dayjs.extend(relativeTime);

export default function NotificationPreview() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const { data, isLoading } = useGetNotificationsQuery();
  // const [markAsRead] = useMarkAsRedNotificationMutation();

  const pageId = permissions?.find(
    (perm) => perm.slug === "view-list-of-notifications"
  )._id;

  const { data: currentUser } = useCurrentUserInfoQuery();
  console.log("Current User on Notifications Page:", currentUser);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const { data: notifications, isLoading: notificationsLoading } =
    useGetAllNotificationsQuery({
      pollingInterval: 3000,
      skipPollingIfUnfocused: true,
    });

  console.log("notifications", notifications);

  const iconStyles = {
    login: { Icon: LogIn, fill: "#3B82F6" }, // Blue
    update: { Icon: Edit, fill: "#F59E0B" }, // Amber/Yellow
    delete: { Icon: Trash2, fill: "#EF4444" }, // Red
    create: { Icon: PlusCircle, fill: "#10B981" }, // Green
    schedule: { Icon: CalendarCheck, fill: "#6366F1" }, // Indigo
    sendsms: { Icon: Send, fill: "#0EA5E9" }, // Sky blue
    contact: { Icon: PhoneCall, fill: "#8B5CF6" }, // Violet
    sendemail: { Icon: Mail, fill: "#2563EB" }, // Blue
    whatsapp: { Icon: Bell, fill: "#25D366" }, // WhatsApp green
    status: { Icon: BadgeCheck, fill: "#22C55E" }, // Success green
    other: { Icon: Bell, fill: "#6B7280" }, // Gray
  };

  const generateActivityIcon = (type) => {
    const { Icon, fill } = iconStyles[type] || iconStyles.other;

    return <Icon className="w-5 h-5 inline" stroke={"#fff"} />;
  };

  // const handleMarkAsRead = async (id) => {
  //   try {
  //     await markAsRead(id).unwrap();
  //     // Optionally, you can refetch or update local cache if needed here
  //   } catch (error) {
  //     console.error('Failed to mark notification as read', error);
  //   }
  // };

  // calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = notifications?.data?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(
    (notifications?.data?.length || 0) / itemsPerPage
  );

  const groupedData = [];

  paginatedData?.forEach((item) => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).formatToParts(new Date(item.createdAt));

    const formattedDate = parts
      .filter(({ type }) => ["weekday", "day", "month"].includes(type))
      .map(({ value }) => value)
      .join(" "); // e.g., "Mon 14 Jul"

    const existingGroup = groupedData?.find(
      (group) => group.date === formattedDate
    );
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      groupedData.push({ date: formattedDate, items: [item] });
    }
  });

  function getPageNumbers(currentPage, totalPages) {
    const visiblePages = [];

    if (totalPages <= 10) {
      // Show all pages if 10 or less
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Always show first 3
      visiblePages.push(1, 2, 3);

      if (currentPage > 6) {
        visiblePages.push("...");
      }

      // Show middle pages
      const start = Math.max(4, currentPage - 1);
      const end = Math.min(totalPages - 3, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!visiblePages.includes(i)) visiblePages.push(i);
      }

      if (currentPage < totalPages - 5) {
        visiblePages.push("...");
      }

      // Show last 3
      visiblePages.push(totalPages - 2, totalPages - 1, totalPages);
    }

    return visiblePages;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  //console.log('data', data?.data);

  if (notificationsLoading) return <PageLoadingSkeletons />;

  // ✅ Apply page access control only for 'staff' role
  const hasPageAccess =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch = perm?.pageId?._id === pageId || perm?._id === pageId;
          return idMatch && perm?.permission === true;
        })
      : true; // other roles always have access

  if (!hasPageAccess) {
    return <AccessDenied />;
  }

  return (
    <div className="p-4 max-w-[1100px] mx-auto">
      <h2 className="text-black font-semibold heading-lg mb-4">
        All Notifications
      </h2>
      <div className="">
        {groupedData.length > 0 && (
          <div className="bg-white rounded-lg relative p-4">
            {groupedData.map((group, groupIndex) => (
              <Fragment key={groupIndex}>
                <div
                  className={`activity-log-date-item text-sm font-medium text-gray-500 pb-2 text-center ml-[16px] ${
                    groupIndex === 0 ? "" : "border-l border-[#e6e7ec]"
                  }`}
                >
                  {group.date}
                </div>

                {group.items.map((n, index) => (
                  <div
                    key={n._id}
                    className={`activity-log-item flex gap-2 ${
                      groupIndex === 0 && index === 0 ? "first-log-item" : ""
                    }`}
                  >
                    <div className="left-track flex-grow-0 flex flex-col w-[32px] items-center">
                      <div className="line-top h-1/2 w-[1] border-l border-[#e6e7ec]"></div>
                      <div className="icon-wrapper mt-[-16px]">
                        {(() => {
                          const iconStyle =
                            iconStyles[n?.type] || iconStyles.other;
                          return (
                            <div
                              className="icon w-[32px] h-[32px] rounded-full flex justify-center items-center"
                              style={{ backgroundColor: iconStyle.fill }}
                            >
                              {n?.type && generateActivityIcon(n?.type)}
                            </div>
                          );
                        })()}
                      </div>
                      <div className="line-bottom h-1/2 w-[1] border-l border-[#e6e7ec]"></div>
                    </div>

                    <div className="flex-1 flex items-start justify-between mb-4 py-3 px-4 rounded-lg border border-gray-200">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              Sender
                            </span>
                            <span className="text-sm text-black font-medium">
                              {n?.userId?.profile?.name || "Unknown"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Receiver
                            </span>
                            <span className="text-sm text-black font-medium">
                              {n?.toUser?.profile?.name || "Unknown"}
                            </span>
                          </div>
                        </div>

                        <div className="text-gray-500 mb-1">
                          {n.title || ""}
                        </div>
                        <div className="text-sm text-black font-medium">
                          {n?.message}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {!n.isRead && (
                          <button
                            className="text-sm text-blue-600 hover:underline"
                            onClick={() => handleMarkAsRead(n._id)}
                          >
                            Mark as Read
                          </button>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(n?.createdAt)
                            .toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(/ (AM|PM)/, "")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        )}

        {paginatedData?.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <BellOff className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No Notifications found
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              You currently have no notifications.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        )}
        {paginatedData?.length > 0 && (
          <div className="flex justify-center gap-1 mt-10 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-80"
            >
              Prev
            </button>

            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-3 py-1">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border border-gray-300 rounded ${
                    currentPage === page ? "bg-black text-white" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-80"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
