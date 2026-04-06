import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner@2.0.3";

interface TalentDayScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  positionTitle: string;
  successors: {
    primary?: { id: string; name: string; };
    secondary?: { id: string; name: string; };
    tertiary?: { id: string; name: string; };
  };
  onConfirm: (data: {
    date: Date;
    time: string;
    duration: string;
    location: string;
    attendees: string[];
    agenda: string;
    notes: string;
  }) => void;
}

export function TalentDayScheduleModal({
  open,
  onOpenChange,
  positionTitle,
  successors,
  onConfirm
}: TalentDayScheduleModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("09:00");
  const [duration, setDuration] = useState("2");
  const [location, setLocation] = useState("");
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [agenda, setAgenda] = useState("");
  const [notes, setNotes] = useState("");

  // Mock attendees
  const availableAttendees = [
    { id: "1", name: "CEO - Bambang Suryanto", role: "Chief Executive Officer" },
    { id: "2", name: "CHRO - Dewi Kartika", role: "Chief HR Officer" },
    { id: "3", name: "Head of Talent - Sarah Johnson", role: "Talent Management" },
    { id: "4", name: "VP Operations - Ahmad Budiman", role: "Operations Lead" },
    { id: "5", name: "Director HR - Linda Wijaya", role: "HR Director" },
  ];

  const handleConfirm = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    if (!location) {
      toast.error("Please enter a location");
      return;
    }
    if (selectedAttendees.length === 0) {
      toast.error("Please select at least one attendee");
      return;
    }

    onConfirm({
      date,
      time,
      duration,
      location,
      attendees: selectedAttendees,
      agenda,
      notes
    });

    // Reset form
    setDate(undefined);
    setTime("09:00");
    setDuration("2");
    setLocation("");
    setSelectedAttendees([]);
    setAgenda("");
    setNotes("");
  };

  const toggleAttendee = (attendeeId: string) => {
    setSelectedAttendees(prev => 
      prev.includes(attendeeId) 
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Talent Day Session</DialogTitle>
          <DialogDescription>
            Schedule a talent day discussion for {positionTitle} succession planning
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Successors Summary */}
          <div className="p-4 bg-muted rounded-lg">
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="mb-3">
              Successors to be discussed:
            </p>
            <div className="flex flex-wrap gap-2">
              {successors.primary && (
                <Badge variant="default" className="gap-1">
                  <Users className="w-3 h-3" />
                  Primary: {successors.primary.name}
                </Badge>
              )}
              {successors.secondary && (
                <Badge variant="secondary" className="gap-1">
                  <Users className="w-3 h-3" />
                  Secondary: {successors.secondary.name}
                </Badge>
              )}
              {successors.tertiary && (
                <Badge variant="outline" className="gap-1">
                  <Users className="w-3 h-3" />
                  Tertiary: {successors.tertiary.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="talent-day-date" style={{ fontSize: 'var(--text-sm)' }}>
                Date <span className="text-destructive-foreground">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talent-day-time" style={{ fontSize: 'var(--text-sm)' }}>
                Time <span className="text-destructive-foreground">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="talent-day-time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="1.5">1.5 hours</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="talent-day-location" style={{ fontSize: 'var(--text-sm)' }}>
              Location <span className="text-destructive-foreground">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="talent-day-location"
                placeholder="e.g., Meeting Room A, 3rd Floor HQ"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-2">
            <Label style={{ fontSize: 'var(--text-sm)' }}>
              Required Attendees <span className="text-destructive-foreground">*</span>
            </Label>
            <div className="border rounded-lg p-4 space-y-2 max-h-[200px] overflow-y-auto">
              {availableAttendees.map((attendee) => (
                <label
                  key={attendee.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedAttendees.includes(attendee.id)}
                    onChange={() => toggleAttendee(attendee.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <div className="flex-1">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                      {attendee.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      {attendee.role}
                    </p>
                  </div>
                  {selectedAttendees.includes(attendee.id) && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </label>
              ))}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              {selectedAttendees.length} attendee(s) selected
            </p>
          </div>

          {/* Agenda */}
          <div className="space-y-2">
            <Label htmlFor="talent-day-agenda" style={{ fontSize: 'var(--text-sm)' }}>
              Meeting Agenda
            </Label>
            <Textarea
              id="talent-day-agenda"
              placeholder="Outline the discussion topics and objectives..."
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="talent-day-notes" style={{ fontSize: 'var(--text-sm)' }}>
              Additional Notes
            </Label>
            <Textarea
              id="talent-day-notes"
              placeholder="Any special requirements or additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Schedule Talent Day
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
