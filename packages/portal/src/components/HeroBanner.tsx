import imgInjourneyBanner from "figma:asset/62ac0bbe164e4ce2984c3a38fe96712f3cd06c91.png";
import imgFrame1000001778 from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgFrame1000001779 from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";
import imgFrame1000001780 from "figma:asset/e8aa5d3a3d822909dd3c274e5ac1c80ef63111a4.png";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  const employees = [
    {
      name: "From: Doni Mardani",
      title: "Direktur Utama",
      subtitle: "Managing Director, PT Angkasa Pura Solusi",
      image: imgFrame1000001778,
    },
    {
      name: "Denny Septyan",
      title: "Manager",
      subtitle: "Employee Experience Team",
      image: imgFrame1000001779,
    },
    {
      name: "Acara Terdekat",
      title: "Town Hall Meeting",
      subtitle: "Kamis, 20 December 2024",
      image: imgFrame1000001780,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Banner */}
      <div className="lg:col-span-2">
        <div className="relative h-[280px] rounded-xl overflow-hidden">
          <img 
            src={imgInjourneyBanner} 
            alt="InJourney Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
            <div className="flex flex-col justify-center h-full p-8">
              <div className="max-w-[500px] space-y-4">
                <div className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                  <p className="caption text-white">Employee Exclusive</p>
                </div>
                <h2 className="text-white">INJOURNEY EMPLOYEE EXCLUSIVE MEMBERSHIP</h2>
                <p className="text-white/90">
                  Benefit Program Eksklusif Untuk Karyawan Sebagai Kehormatan Injourney Group
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors">
                  <span className="text-white">Learn More</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="flex flex-col gap-4">
        {employees.slice(0, 2).map((employee, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={employee.image} 
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-foreground truncate">{employee.name}</h4>
              <p className="caption text-muted-foreground truncate">{employee.title}</p>
              <p className="caption text-muted-foreground truncate">{employee.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}