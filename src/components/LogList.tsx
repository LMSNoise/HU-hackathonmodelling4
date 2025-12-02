import { useEffect, useState } from "react";
import { IncidentLine } from "./LogEntry.tsx";
import testdata from "../data/testdata.json";

export interface IIncident {
    id: number;
    description: string;
    classification: number;
    resolved: boolean;
    reported: boolean;
    location: string;
    licenseplate: string;
}


export default function LogList() {
  const [incidents, setIncidents] = useState<IIncident[]>([]);

  useEffect(() => {
    async function load() {
    //   const res = await fetch("/api/incidents");
    //   const data: IIncident[] = await res.json();
      const data: IIncident[] = testdata;
      setIncidents(data);
    }
    load();
  }, []);

  return (
    <div className="p-4 space-y-2">
      {incidents.map((incident) => (
        <IncidentLine key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
