import { useEffect, useState } from "react";
import { IncidentLine } from "./LogEntry.tsx";
import testdata from "../data/testdata.json";

export interface IIncident {
    id: number;
    description: string;
    classification: number | null;
    resolved: boolean;
    reported: boolean;
    performedActions: string[];
    location: string;
    licensePlate: string;
    videoUrl: string | null;
}


export default function LogList() {
  const [incidents, setIncidents] = useState<IIncident[]>([]);

  useEffect(() => {
    async function load() {
        try{
            const res = await fetch("http://localhost:8080/api/incidents");
            if (!res.ok) throw new Error(`HTTP error! Status ${res.status}`);
            const data: IIncident[] = await res.json();
            setIncidents(data);
        }
        catch (error){
            console.error("Failed to fetch incidents", error);
        }
    }
    load();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {incidents.map((incident) => (
        <IncidentLine key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
