import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export const calculateSliderValue = (
  currentTime: number,
  totalDuration: number
): number => {
  return totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
};

export const encodePlaylistNameForUrl = (playlistName: string): string => {
  return encodeURIComponent(playlistName);
};

export const decodePlaylistNameFromUrl = (encodedName: string): string => {
  return decodeURIComponent(encodedName);
};

export const timeSince = (dateInput: string | Date): string => {
  const now = new Date();
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval === 1 ? "1 year ago" : `${interval} years ago`}`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval === 1 ? "1 month ago" : `${interval} months ago`}`;
  }

  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return `${interval === 1 ? "1 week ago" : `${interval} weeks ago`}`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval === 1 ? "1 day ago" : `${interval} days ago`}`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval === 1 ? "1 hour ago" : `${interval} hours ago`}`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval === 1 ? "1 minute ago" : `${interval} minutes ago`}`;
  }

  return `${seconds === 1 ? "1 second ago" : `${seconds} seconds ago`}`;
};
