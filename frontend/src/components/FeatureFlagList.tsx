import { getAllFlags, toggleFlag } from "@/api/featureFlagApi";
import type { FeatureFlag } from "@/types/FeatureFlag";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

type FeatureFlagListProps = {
  refreshKey: number;
};

const FeatureFlagList = ({ refreshKey }: FeatureFlagListProps) => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFlags();
  }, [refreshKey]);

  const fetchFlags = async () => {
    try {
      const data = await getAllFlags();
      setFlags(data);
    } catch {
      toast.error("Failed to load feature flags");
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

  return (
    <Card className="max-w-xl mx-auto mt-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Feature Flags</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {flags.length == 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No Feature flags created yet
          </p>
        )}

        {flags.map((flag) => (
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
              disabled={loadingId == flag.id}
              onCheckedChange={() => handleToggle(flag.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeatureFlagList;
