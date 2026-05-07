"use client";

import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const position: [number, number] = [siteConfig.geo.lat, siteConfig.geo.lng];

export function BoutiqueMap() {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="h-[360px] w-full overflow-hidden rounded-xl sm:h-[480px] lg:h-full lg:min-h-[480px]">
      <MapContainer center={position} zoom={15} className="h-full w-full" scrollWheelZoom={false}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            <strong>{siteConfig.name}</strong>
            <br />
            {siteConfig.address.full}
            <br />
            <Button asChild size="sm" className="mt-2">
              <a href={siteConfig.social.googleMaps} target="_blank" rel="noreferrer">
                Itinéraire
              </a>
            </Button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
