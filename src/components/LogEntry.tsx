import React, { useEffect, useState } from "react";
import { type IIncident } from "./LogList.tsx"

// Example React component that fetches incidents and displays each on one horizontal line
export function IncidentLine({ incident }: { incident: IIncident }) {
  return (
    <div className="flex gap-2 border-b pb-1 text-sm flex-wrap items-center">
        <span><strong>Reported license plate:</strong> {incident.licenseplate}</span>
        <span> | </span>
        <span><strong>Incident Classification:</strong> {incident.classification}</span>
        <span> | </span>
        <span><strong>Incident Description:</strong> {incident.description}</span>
        <span>   </span>
        {incident.classification === null && (
            <span className="flex gap-2">
                <select className="bg-black">
                    <option value="1">class 1</option>
                    <option value="2">class 2</option>
                    <option value="3">class 3</option>
                    <option value="4">class 4</option>
                </select>
                
                <button>
                    Apply classificiation
                </button>
            </span>
            
        )}
    </div>
  );
}