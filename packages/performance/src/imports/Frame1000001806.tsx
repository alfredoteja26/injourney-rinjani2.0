import svgPaths from "./svg-r60hz2otv0";

function Dashboard() {
  return (
    <div className="absolute left-1/2 size-[30px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="dashboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="dashboard">
          <path d={svgPaths.p3e7b5180} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#ec3d31] overflow-clip relative rounded-[8px] size-full">
      <Dashboard />
    </div>
  );
}