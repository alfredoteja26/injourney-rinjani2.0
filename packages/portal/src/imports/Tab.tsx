export default function Tab() {
  return (
    <div className="bg-white relative size-full" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#00a199] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[12px] py-[16px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#121619] text-[16px] text-nowrap">Dashboard KPI</p>
        </div>
      </div>
    </div>
  );
}