"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Edit, Trash2, Loader } from "lucide-react";
import AddLocationModal from "./_components/AddLocationModal";
import {
  useDeleteOfficeLocationMutation,
  useGetOfficeLocationsQuery,
} from "@/store/firmFeatures/firmApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import EditLocationModal from "./_components/EditLocationModal";
import { ConfirmationModal } from "@/components/common/components/ConfirmationModal";

export default function Locations() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);

  const handleEditModalOpen = (location) => {
    setEditModalOpen(true);
    setSelectedLocation(location);
  };
  const {
    data: locations,
    isLoading: isLocationsLoading,
    refetch: refetchLocations,
  } = useGetOfficeLocationsQuery();

  const [deleteLocation] = useDeleteOfficeLocationMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteLocation(id).unwrap();
      console.log("Delete location response:", res);
      if (res?.success) {
        showSuccessToast(res?.message || "Location deleted successfully");
        refetchLocations();
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      showErrorToast(error?.data?.message || "Failed to delete location");
    }
  };

  return (
    <div className="max-w-[900px] mx-auto  space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-black font-semibold heading-lg mb-2">
            Manage Locations
          </h3>
          <p className="text-gray-600 text-sm">
            Add and manage your office or branch locations with map details.
          </p>
        </div>
        <AddLocationModal refetchLocations={refetchLocations} />
      </div>

      {/* Locations List */}
      {isLocationsLoading && (
        <div className="flex justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
      {locations?.data?.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {locations?.data?.map((loc) => (
            <Card key={loc?._id} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{loc?.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditModalOpen(loc)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <ConfirmationModal
                    onConfirm={() => handleDelete(loc?._id)}
                    open={openModalId === loc?._id}
                    onOpenChange={(isOpen) =>
                      setOpenModalId(isOpen ? loc?._id : null)
                    }
                    description="You want to delete this location?"
                    trigger={
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpenModalId(loc?._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  {loc?.address?.zipcode}
                </p>
                <iframe
                  src={`https://maps.google.com/maps?q=${loc?.address?.zipcode}&output=embed`}
                  className="w-full h-48 rounded-lg border"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {editModalOpen && (
        <EditLocationModal
          location={selectedLocation}
          refetchLocations={refetchLocations}
          open={editModalOpen}
          onClose={setEditModalOpen}
        />
      )}
    </div>
  );
}
