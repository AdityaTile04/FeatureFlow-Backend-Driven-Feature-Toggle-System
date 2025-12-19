import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

type FeatureFlagFormProps = {
  onSuccess: () => void;
};

const FeatureFlagForm = ({ onSuccess }: FeatureFlagFormProps) => {
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("dev");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/v1/flags", {
        name,
        environment,
        enabled,
      });

      toast.success("Feature flag created");

      setName("");
      setEnvironment("dev");
      setEnabled(false);
      onSuccess();
    } catch {
      toast.error("Failed to create feature flag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Create Feature Flag
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm">Feature Name</Label>
            <Input
              placeholder="e.g. newDashboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Environment</Label>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              checked={enabled}
              onCheckedChange={(v) => setEnabled(Boolean(v))}
            />
            <Label className="text-sm">Enabled</Label>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Creating..." : "Create Feature Flag"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeatureFlagForm;
