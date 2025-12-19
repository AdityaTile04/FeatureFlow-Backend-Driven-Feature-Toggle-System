import { getAllFlags, toggleFlag } from "@/api/featureFlagApi";
import type { FeatureFlag } from "@/types/FeatureFlag";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import FeatureFlagSkeleton from "./FeatureFlagSkeleton";

type FeatureFlagListProps = {
  refreshKey: number;
};

const FeatureFlagList = ({ refreshKey }: FeatureFlagListProps) => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [environmentFilter, setEnvironmentFilter] = useState<
    "all" | "dev" | "prod"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchFlags();
  }, [refreshKey]);

  const fetchFlags = async () => {
    try {
      const data = await getAllFlags();
      setFlags(data);
    } catch {
      toast.error("Failed to load feature flags");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    setLoadingId(id);
    try {
      await toggleFlag(id);
      fetchFlags();
      toast.success("Feature flag updated");
    } catch {
      toast.error("Failed to update feature flag");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredFlags = useMemo(() => {
    return flags.filter((flag) => {
      const matchesEnv =
        environmentFilter === "all" || flag.environment === environmentFilter;

      const matchesSearch = flag.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesEnv && matchesSearch;
    });
  }, [flags, environmentFilter, searchTerm]);

  return (
    <Card className="max-w-xl mx-auto mt-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Feature Flags</CardTitle>

        <div className="flex gap-3">
          <Input
            placeholder="Search feature name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={environmentFilter}
          onValueChange={(value) =>
            setEnvironmentFilter(value as "all" | "dev" | "prod")
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by env" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="dev">Development</SelectItem>
            <SelectItem value="prod">Production</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <FeatureFlagSkeleton key={index} />
          ))}

        {!isLoading && filteredFlags.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No matching feature flags found
          </p>
        )}

        {!isLoading &&
          filteredFlags.map((flag) => (
            <div
              key={flag.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{flag.name}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{flag.environment}</Badge>
                  {flag.enabled ? (
                    <Badge className="bg-green-600">Enabled</Badge>
                  ) : (
                    <Badge variant="secondary">Disabled</Badge>
                  )}
                </div>
              </div>

              <Switch
                checked={flag.enabled}
                disabled={loadingId === flag.id}
                onCheckedChange={() => handleToggle(flag.id)}
              />
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default FeatureFlagList;
