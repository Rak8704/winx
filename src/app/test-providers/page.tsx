"use client";
import { Title } from "@/types/game";
import { getProviderDisplayName, ProviderNameDisplay } from "@/lib/utils/providerUtils";

const TestProviders = () => {
  // Test data with different provider types
  const testProviders = Object.values(Title);


  return (
    <div className="min-h-screen bg-[#003e3e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Provider Display Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testProviders.map((provider) => (
            <div key={provider} className="bg-white/10 rounded-lg p-4">
              <div className="text-white">
                <div className="text-sm text-gray-300 mb-2">Original: {provider}</div>
                <div className="text-lg font-semibold">
                  Function: {getProviderDisplayName(provider)}
                </div>
                <div className="text-lg font-semibold text-[#23FFC8]">
                  Component: <ProviderNameDisplay providerName={provider} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/10 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Test Unknown Provider</h2>
          <div className="text-white">
            <div className="text-sm text-gray-300 mb-2">Original: unknown_provider</div>
            <div className="text-lg font-semibold">
              Function: {getProviderDisplayName("unknown_provider")}
            </div>
            <div className="text-lg font-semibold text-[#23FFC8]">
              Component: <ProviderNameDisplay providerName="unknown_provider" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/10 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Original Code Equivalent</h2>
          <div className="text-white">
            <div className="text-sm text-gray-300 mb-2">
              Your original code: {`<span>{game.provider ? game.provider.toUpperCase() : "UNKNOWN"}</span>`}
            </div>
            <div className="text-lg font-semibold">
              Now works as: <span>{Title.Evolution ? getProviderDisplayName(Title.Evolution) : "UNKNOWN"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProviders;