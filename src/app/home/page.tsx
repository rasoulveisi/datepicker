import { Datepicker } from "@/components/Datepicker/Datepicker";
import React from "react";

export default function Home() {
  const defaultDate = { start: new Date(), end: new Date() };
  return (
    <section className="container mx-auto flex justify-start">
      <Datepicker defaultDate={defaultDate}></Datepicker>
    </section>
  );
}
