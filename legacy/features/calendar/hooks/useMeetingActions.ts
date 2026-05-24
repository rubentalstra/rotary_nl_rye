/**
 * Hook for meeting-related actions (join, copy, dial)
 */

import { useCallback, useState } from "react";
import type { ConferenceData } from "../types";
import {
  buildDialInInfoText,
  copyToClipboard,
  dialPhoneNumber,
  openMeetingLink,
} from "../utils/meetingUtils";

interface UseMeetingActionsReturn {
  /** Join the video meeting */
  joinMeeting: (conference: ConferenceData) => Promise<boolean>;
  /** Copy all meeting info to clipboard */
  copyMeetingInfo: (conference: ConferenceData) => Promise<void>;
  /** Dial a phone number */
  dialIn: (number: string, pin?: string) => Promise<boolean>;
  /** Copy any text to clipboard */
  copyText: (text: string) => Promise<void>;
  /** Whether a copy action just succeeded */
  copied: boolean;
  /** Reset the copied state */
  resetCopied: () => void;
}

/**
 * Hook providing meeting action functions with feedback state
 */
export function useMeetingActions(): UseMeetingActionsReturn {
  const [copied, setCopied] = useState(false);

  const joinMeeting = useCallback(async (conference: ConferenceData) => {
    return await openMeetingLink(conference);
  }, []);

  const copyMeetingInfo = useCallback(async (conference: ConferenceData) => {
    const text = buildDialInInfoText(conference);
    await copyToClipboard(text);
    setCopied(true);
    // Reset after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const dialIn = useCallback(async (number: string, pin?: string) => {
    return await dialPhoneNumber(number, pin);
  }, []);

  const copyText = useCallback(async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    // Reset after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const resetCopied = useCallback(() => {
    setCopied(false);
  }, []);

  return {
    joinMeeting,
    copyMeetingInfo,
    dialIn,
    copyText,
    copied,
    resetCopied,
  };
}
