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
  const [filterClass, setFilterClass] = useState<number | "all">("all");

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

  const filteredIncidents = incidents.filter((inc) => 
        filterClass === "all" ? true : inc.classification === filterClass);

  return (
    <>
     <select
          id="classificationFilter"
          value={filterClass}
          onChange={(e) =>
            setFilterClass(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">All</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
        </select>
    <div className="flex flex-wrap gap-4 justify-center">
      {filteredIncidents.map((incident) => (
        <IncidentLine key={incident.id} incident={incident} />
      ))}
    </div>
    </>
  );
}
