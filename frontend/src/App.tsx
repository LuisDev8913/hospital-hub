import { useCallback, useMemo, useState } from "react";

import { Input } from "./components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { useDebouncedValue } from "./lib/use-debounced-value";
import { useQuery } from "@tanstack/react-query";
import { searchClinics } from "./api/clinics";
import { Button } from "./components/ui/button";
import { cn } from "./styling/utils";
import { Skeleton } from "./components/ui/skeleton";
import { Search } from "./assets/icons/Search";
import { Loader } from "./assets/icons/Loader";
import { Badge } from "./components/ui/badge";
import { Map } from "./components/map";
import { Marker } from "@react-google-maps/api";
import { getPosition } from "./components/map/get-position";
import { GitHub } from "./assets/icons/GitHub";

const SERVICE_TYPES = [
  "Physiotherapy",
  "Chiropractor",
  "Massage",
  "Dietitian",
  "Osteopathy",
  "Podiatry",
] as const;

type ServiceType = (typeof SERVICE_TYPES)[number];

export default function App() {
  const [service, setService] = useState<ServiceType>();
  const handleServiceChange = useCallback((value: string) => {
    setService((prev) => (prev === value ? undefined : (value as ServiceType)));
  }, []);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const { data, isFetching, isLoading, refetch } = useQuery(
    ["clinics", service, debouncedQuery],
    () => searchClinics(service, debouncedQuery),
    {
      staleTime: 20 * 60 * 1000, // 20 minutes
      keepPreviousData: true,
    },
  );

  const { center, zoom } = useMemo(() => {
    return getPosition(
      data?.clinics.map(({ fields: { lat, lng } }) => ({ lat, lng })) || [],
    );
  }, [data]);

  return (
    <main className="container min-h-screen px-4 pb-32 pt-32 sm:px-8">
      <header className="fixed inset-0 bottom-auto z-10 bg-white py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Hospital{" "}
            <Badge className="pointer-events-none inline-flex rounded px-1 py-0 text-2xl">
              hub
            </Badge>
          </h1>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/apostlekotov/hospital-hub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <GitHub className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </header>

      <div className="relative mb-16 h-96 overflow-hidden rounded-2xl ring-1 ring-zinc-200">
        <Map center={center} zoom={zoom}>
          {data?.clinics.map((clinic) => (
            <Marker
              key={clinic.id}
              position={{ lat: clinic.fields.lat, lng: clinic.fields.lng }}
            />
          ))}
        </Map>
      </div>

      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-end gap-4 rounded-xl bg-white p-8 sm:px-12 md:flex-row">
        <div className="w-full shrink-0 md:w-48">
          <Select
            value={service}
            onValueChange={handleServiceChange}
            autoComplete="off"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_TYPES.map((serviceType) => (
                <SelectItem key={serviceType} value={serviceType}>
                  {serviceType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          value={query}
          onChange={handleSearch}
          placeholder="Search location"
          className="w-full"
        />

        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="pl-3"
        >
          {isFetching ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Search
        </Button>
      </div>

      <div
        className={cn(
          "mt-16 transition-opacity",
          isFetching && !isLoading && "opacity-40",
        )}
      >
        {data && !isLoading ? (
          <ul className="space-y-8">
            {data.clinics.map((clinic) => (
              <li
                key={clinic.id}
                className="flex flex-col rounded-xl bg-white md:flex-row"
              >
                <div className="relative aspect-[7/5] h-48 shrink-0">
                  <img
                    src={
                      clinic.id
                        ? `/images/${clinic.id}.jpg`
                        : "/images/default.jpg"
                    }
                    alt={clinic.fields.Name}
                    className="absolute inset-0 h-full w-full rounded-l-xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-l-xl ring-1 ring-inset ring-zinc-200" />
                </div>

                <div className="flex-1 space-y-4 px-4 py-8 sm:px-8 sm:py-4">
                  <span className="text-xl font-bold">
                    {clinic.fields.Name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {clinic.fields["Service Tvpe"].map((serviceType) => (
                      <Badge key={serviceType} className="pointer-events-none">
                        {serviceType}
                      </Badge>
                    ))}
                  </div>
                  <span className="block">{clinic.fields.Address}</span>

                  <div className="mt-auto flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:5555555555">Book</a>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <ClinicSkeleton key={i} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

const ClinicSkeleton: React.FC = () => (
  <Skeleton className="h-[12rem] rounded-xl bg-white" />
);
