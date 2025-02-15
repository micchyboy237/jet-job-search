import { atom } from "jotai";
import { Activity } from "./types";

const initialValue: Activity[] = [
  {
    activity: "Logged in",
    timestamp: "2024-06-12T09:00:00Z",
    user: "John Doe",
    details: "Logged in from IP 192.168.1.1",
    status: "Success",
  },
  {
    activity: "Updated profile",
    timestamp: "2024-06-12T09:15:00Z",
    user: "Jane Smith",
    details: "Updated email address",
    status: "Pending",
  },
  {
    activity: "Completed task",
    timestamp: "2024-06-12T10:00:00Z",
    user: "Alice Johnson",
    details: 'Completed task "Design Homepage"',
    status: "Success",
  },
  {
    activity: "Logged out",
    timestamp: "2024-06-12T18:00:00Z",
    user: "Bob Brown",
    details: "Logged out from IP 192.168.1.2",
    status: "Failed",
  },
];

export const activitiesAtom = atom(initialValue);
