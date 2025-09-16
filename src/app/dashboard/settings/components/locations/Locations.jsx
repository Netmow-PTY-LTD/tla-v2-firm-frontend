"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Edit, Trash2 } from "lucide-react";


export default function Locations() {
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({ name: "", address: "", lat: "", lng: "" });
    const [editingId, setEditingId] = useState(null);

    const handleSave = () => {
        if (editingId) {
            setLocations((prev) =>
                prev.map((loc) => (loc.id === editingId ? { ...loc, ...form } : loc))
            );
            setEditingId(null);
        } else {
            setLocations((prev) => [
                ...prev,
                { ...form, id: Date.now().toString() },
            ]);

        }
        setForm({ name: "", address: "", lat: "", lng: "" });
    };

    const handleEdit = (loc) => {
        setForm({ name: loc.name, address: loc.address, lat: loc.lat, lng: loc.lng });
        setEditingId(loc.id);
    };

    const handleDelete = (id) => {
        setLocations((prev) => prev.filter((loc) => loc.id !== id));
    };

    return (
       
        <div className="max-w-[900px] mx-auto  space-y-6">
            {/* Top Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Manage Locations</h2>
                    <p className="text-gray-600 text-sm">
                        Add and manage your office or branch locations with map details.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#3fd0ce] hover:bg-[#3fd0ce]">
                            <MapPin className="mr-2 h-4 w-4" />
                            Add Location
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Location" : "Add Location"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Office / Branch Name"
                                    className={'mt-1'}
                                />
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    placeholder="Full Address"
                                    className={'mt-1'}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label>Latitude</Label>
                                    <Input
                                        value={form.lat}
                                        onChange={(e) => setForm({ ...form, lat: e.target.value })}
                                        placeholder="e.g. -33.8688"
                                        className={'mt-1'}
                                    />
                                </div>
                                <div>
                                    <Label>Longitude</Label>
                                    <Input
                                        value={form.lng}
                                        onChange={(e) => setForm({ ...form, lng: e.target.value })}
                                        placeholder="e.g. 151.2093"
                                        className={'mt-1'}
                                    />
                                </div>
                            </div>
                            <div className="h-40">
                                {form.lat && form.lng ? (
                                    <iframe
                                        src={`https://maps.google.com/maps?q=${form.lat},${form.lng}&z=15&output=embed`}
                                        className="w-full h-full rounded-lg border"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 border rounded-lg">
                                        Google Map Preview
                                    </div>
                                )}
                            </div>
                            <Button className="w-full bg-[#3fd0ce]" onClick={handleSave}>
                                {editingId ? "Update Location" : "Save Location"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Locations List */}
            <div className="grid md:grid-cols-2 gap-4">
                {locations.map((loc) => (
                    <Card key={loc.id} className="shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{loc.name}</CardTitle>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(loc)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(loc.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-2">{loc.address}</p>
                            <iframe
                                src={`https://maps.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`}
                                className="w-full h-48 rounded-lg border"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}
