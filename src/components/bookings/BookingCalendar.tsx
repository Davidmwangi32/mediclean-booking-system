
import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingEvent {
  id: string;
  date: Date;
  time: string;
  wasteType: "general" | "sharps" | "pharmaceutical" | "hazardous";
  status: "scheduled" | "completed" | "canceled";
}

const BookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookingEvents, setBookingEvents] = useState<BookingEvent[]>([
    {
      id: "1",
      date: new Date(2025, 0, 28),
      time: "10:00 AM",
      wasteType: "general",
      status: "scheduled"
    },
    {
      id: "2",
      date: new Date(2025, 0, 31),
      time: "2:00 PM",
      wasteType: "sharps",
      status: "scheduled"
    },
    {
      id: "3",
      date: new Date(2025, 1, 5),
      time: "9:30 AM",
      wasteType: "pharmaceutical",
      status: "scheduled"
    },
  ]);
  const [selectedTime, setSelectedTime] = useState<string>("9:00 AM");
  const [selectedType, setSelectedType] = useState<string>("general");
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];
  
  const wasteTypes = [
    { value: "general", label: "General Medical Waste" },
    { value: "sharps", label: "Sharps Waste" },
    { value: "pharmaceutical", label: "Pharmaceutical Waste" },
    { value: "hazardous", label: "Hazardous Waste" },
  ];
  
  const handleBooking = () => {
    if (!date) return;
    
    const newBooking: BookingEvent = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date(date),
      time: selectedTime,
      wasteType: selectedType as "general" | "sharps" | "pharmaceutical" | "hazardous",
      status: "scheduled"
    };
    
    setBookingEvents([...bookingEvents, newBooking]);
  };
  
  const getTodaysEvents = () => {
    if (!date) return [];
    return bookingEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const cancelBooking = (id: string) => {
    setBookingEvents(bookingEvents.map(event => 
      event.id === id ? { ...event, status: "canceled" } : event
    ));
  };
  
  const getWasteTypeLabel = (type: string) => {
    return wasteTypes.find(t => t.value === type)?.label || type;
  };

  const getWasteTypeClass = (type: string) => {
    switch (type) {
      case "general": return "waste-tag-safe";
      case "sharps": return "waste-tag-caution";
      case "pharmaceutical": return "waste-tag-caution";
      case "hazardous": return "waste-tag-hazard";
      default: return "waste-tag-safe";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Collection Schedule</CardTitle>
            <CardDescription>
              Book a waste collection for your facility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    initialFocus
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Select Time</h3>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Waste Type</h3>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full mt-4" onClick={handleBooking}>
                  Book Collection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTodaysEvents().length > 0 ? (
                getTodaysEvents().map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "p-3 rounded-lg border space-y-2",
                      event.status === "canceled" ? "opacity-50" : ""
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                      <span className={getWasteTypeClass(event.wasteType)}>
                        {getWasteTypeLabel(event.wasteType)}
                      </span>
                    </div>
                    {event.status !== "canceled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-waste-hazard hover:text-waste-hazard"
                        onClick={() => cancelBooking(event.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel Booking
                      </Button>
                    )}
                    {event.status === "canceled" && (
                      <div className="text-sm text-waste-hazard mt-1">Canceled</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No bookings for this date
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingCalendar;
