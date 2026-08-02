// Delta State Fitness Carnival Configuration
// Update this file to change event settings

export const EVENT_CONFIG = {
  // Event date for countdown (format: YYYY-MM-DDTHH:mm:ss)
  EVENT_DATE: "2026-12-15T09:00:00",
  
  // Event ID for database
  EVENT_ID: "delta-state-fitness-carnival-2026",
  
  // Maximum capacity (set to null for unlimited)
  MAX_CAPACITY: 500,
  
  // Event details
  EVENT_DETAILS: {
    title: "Delta State Fitness Carnival",
    subtitle: "With Tim",
    date: "December 15, 2026",
    time: "9:00 AM",
    venue: "Delta State Sports Complex",
    location: "Asaba, Delta State, Nigeria",
    host: "Tim - 3Ripple T Fitness",
  },
  
  // Registration status
  REGISTRATION_OPEN: true,
};

// Helper function to get event date as Date object
export function getEventDate(): Date {
  return new Date(EVENT_CONFIG.EVENT_DATE);
}

// Helper function to check if registration is open
export function isRegistrationOpen(): boolean {
  return EVENT_CONFIG.REGISTRATION_OPEN;
}

// Helper function to check if capacity is reached
export async function isCapacityReached(): Promise<boolean> {
  if (EVENT_CONFIG.MAX_CAPACITY === null) return false;
  
  try {
    const response = await fetch("/api/events/delta-state-fitness-carnival/stats");
    const data = await response.json();
    return data.registrationCount >= EVENT_CONFIG.MAX_CAPACITY;
  } catch (error) {
    console.error("Error checking capacity:", error);
    return false;
  }
}
