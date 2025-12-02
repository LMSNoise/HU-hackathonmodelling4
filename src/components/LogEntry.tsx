import React, { useEffect, useState } from "react";
import { type IIncident } from "./LogList.tsx"

// Example React component that fetches incidents and displays each on one horizontal line
export function IncidentLine({ incident }: { incident: IIncident }) {
    const [selectedClass, setSelectedClass] = useState<number | null>(null)
    const [loading, setLoading] = useState(false);
    const [classification, setClassification] = useState(incident.classification)

    async function openVideo(){
        if (incident.videoUrl === null) return;
        window.open(encodeURI(incident.videoUrl));
    }

    async function applyClassification(){
        if(selectedClass === null) return;
        
        setLoading(true);

        try{
             const response = await fetch("/api/incidents/classify", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                description: incident.description,
                classification: selectedClass,
                resolved: incident.resolved,
                location: incident.location,
                reported: incident.reported,
                licensePlate: incident.licensePlate,
                performedAction: incident.performedActions,
                videoUrl: incident.videoUrl
                })
            });
            if(!response.ok){
                throw new Error("failed to apply classification")
            } else{
                setClassification(selectedClass)
                
            }
        }
        catch(error){
            console.error(error);
        } finally{
            setLoading(false);
        }

    }

     return (
        <div className="border rounded p-4 w-80 flex flex-col gap-2 text-left">
            <div><strong>ID:</strong> {incident.id}</div>
            <div><strong>Reported license plate:</strong> {incident.licensePlate}</div>
            <div><strong>Incident Classification:</strong> {classification}</div>
            {incident.classification === 0 && (
                <span className="flex gap-2 w-full">
                    <select 
                    className="w-full"
                    onChange={(e) => setSelectedClass(Number(e.target.value))}>
                        <option value="">Select classification</option>
                        <option value="1">class 1</option>
                        <option value="2">class 2</option>
                        <option value="3">class 3</option>
                        <option value="4">class 4</option>
                        <option value="5">class 5</option>
                    </select>
                    
                    <button
                    disabled={loading || selectedClass === null}
                    onClick={applyClassification}>
                        Apply
                    </button>
                </span>
                
            )}
            <div><strong>Incident Description:</strong> {incident.description}</div>
            {incident.videoUrl != null && (
                <button
                onClick={openVideo}>
                    View video
                </button>
            )}
            
        </div>
    );
}