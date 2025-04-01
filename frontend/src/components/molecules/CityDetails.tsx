import {FaPlaneDeparture, FaPlaneArrival, FaMapMarkerAlt } from "react-icons/fa";

interface CityDetailsProps {
  title: string;
  city: string;
  uf: string;
  airport : string;
  arriving: boolean;
  airportCode?: string;
}

function CityDetails({
  title,
  airport,
  city,
  arriving,
  uf,
  airportCode,
}: CityDetailsProps) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">{arriving ? <FaPlaneArrival /> : <FaPlaneDeparture />} {title} - {airportCode}</h3>
      <p className="flex items-center gap-2"><FaMapMarkerAlt size={16} /> {airport}</p>
      <p><strong>Cidade:</strong> {city}</p>
      <p><strong>UF:</strong> {uf}</p>
    </div>
  )
}


export default CityDetails;