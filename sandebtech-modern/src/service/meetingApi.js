// Temporary mock APIs.
// Later these will call Spring Boot.

export async function getAvailableSlots(date) {

  console.log("Fetching slots for:", date);

  return [
    {
      time: "09:00 AM",
      available: true,
    },
    {
      time: "09:30 AM",
      available: true,
    },
    {
      time: "10:00 AM",
      available: false,
    },
    {
      time: "10:30 AM",
      available: true,
    },
    {
      time: "11:00 AM",
      available: true,
    },
    {
      time: "02:00 PM",
      available: true,
    },
    {
      time: "02:30 PM",
      available: false,
    },
    {
      time: "03:00 PM",
      available: true,
    },
  ];

}

export async function bookMeeting(data) {

  console.log(data);

  return {

    success: true,

    message: "Meeting booked successfully."

  };

}