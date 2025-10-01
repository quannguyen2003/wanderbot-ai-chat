import { Compass, Globe, MapPin } from "lucide-react";

export const WelcomeScreen = () => {
  const suggestions = [
    { icon: Globe, text: "Find hidden gems in Europe" },
    { icon: MapPin, text: "Plan a beach getaway" },
    { icon: Compass, text: "Discover adventure destinations" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in px-4">
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-sky bg-clip-text text-transparent">
          Your AI Travel Companion
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover amazing destinations, plan perfect itineraries, and get personalized travel advice
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="group p-6 bg-card hover:bg-muted border border-border rounded-2xl transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
          >
            <suggestion.icon className="w-8 h-8 mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
            <p className="text-sm font-medium text-foreground">{suggestion.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
