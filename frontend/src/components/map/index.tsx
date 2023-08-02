import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/styling/utils";

interface MapProps extends React.ComponentProps<typeof GoogleMap> {
  className?: string;
}

import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const Map: React.FC<MapProps> = ({ className, ...props }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <Skeleton className="bg-white" />;
  }

  return (
    <GoogleMap
      mapContainerClassName={cn("h-full", className)}
      options={{ mapId: import.meta.env.VITE_MAP_ID, disableDefaultUI: true }}
      {...props}
    />
  );
};
