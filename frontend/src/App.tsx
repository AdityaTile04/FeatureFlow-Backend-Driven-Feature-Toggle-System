import { Toaster } from "sonner";
import FeatureFlagForm from "./components/FeatureFlagForm";
import { useState } from "react";
import FeatureFlagList from "./components/FeatureFlagList";

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshFlags = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen bg-muted p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        FeatureFlow Dashboard
      </h1>

      <FeatureFlagForm onSuccess={refreshFlags} />
      <FeatureFlagList refreshKey={refreshKey} />

      <Toaster richColors position="top-right" />
    </div>
  );
};

export default App;
