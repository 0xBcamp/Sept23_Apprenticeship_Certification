import { useState, useEffect } from "react";

export default ({ date }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const eventDate = new Date(date * 1000);
    const timeSettings = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // hour12: true,
      // timeZoneName: "short",
    };

    setFormattedDate(eventDate.toLocaleDateString("en-US", timeSettings));
  }, [date]);

  return <p>{formattedDate}</p>;
};
