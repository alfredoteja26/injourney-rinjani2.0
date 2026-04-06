import { homeData } from "../../data/homeData";

export function GreetingRegion() {
  const { currentUser } = homeData;
  const date = new Date();
  const hour = date.getHours();

  let greeting = "Selamat pagi";
  if (hour >= 11 && hour < 15) {
    greeting = "Selamat siang";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Selamat sore";
  } else if (hour >= 18) {
    greeting = "Selamat malam";
  }

  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Take first name or full name
  const name = currentUser.name.split(" ")[0] || currentUser.name;

  return (
    <div className="flex flex-col gap-1 mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {greeting}, {name}
      </h1>
      <p className="text-muted-foreground">{formattedDate}</p>
    </div>
  );
}
