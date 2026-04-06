import svgPaths from "./svg-88z2so2g9v";
import imgAvatar from "figma:asset/2f1190870d753151f58657595136f67c584b5c8c.png";
import imgAvatar1 from "figma:asset/2780e16db1a4a364d3d872737f7fe9563d7abb29.png";
import imgAvatar2 from "figma:asset/d688ab8bff2aebfc3cab587865468c4713ecad78.png";
import imgAvatar3 from "figma:asset/c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png";
import imgAvatar4 from "figma:asset/ca269fff9961afb9c6a84bffddcb988a6fad7166.png";
import imgAvatar5 from "figma:asset/2e2cf1b6f441c6f28c3b0e1e0eb4863eb80b7401.png";
import imgAvatar6 from "figma:asset/e355a90b1eddfbc917a39138b5c2e12ac350dfe8.png";
import imgAvatar7 from "figma:asset/6ec94186cc6e3e60f69ecac1443984f93e6078eb.png";

function BadgeBase() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">100 users</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase />
    </div>
  );
}

function TextAndBadge() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Text and badge">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#181d27] text-[18px]">Team members</p>
      <Badge />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[19px] pt-[20px] px-[24px] relative w-full">
          <TextAndBadge />
        </div>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Card header">
      <Content />
    </div>
  );
}

function CheckboxBase() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">Name</p>
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-white h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Checkbox />
          <TableHeader />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase1() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase1 />
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#c7b9da] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Olivia Rhye</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@olivia</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox1 />
          <Avatar />
          <TextAndSupportingText />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase2() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase2 />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#aa9c75] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Phoenix Baker</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@phoenix</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox2 />
          <Avatar1 />
          <TextAndSupportingText1 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase3() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase3 />
    </div>
  );
}

function Avatar2() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#d4b5ad] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar2} />
      </div>
    </div>
  );
}

function TextAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Lana Steiner</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@lana</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox3 />
          <Avatar2 />
          <TextAndSupportingText2 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase4() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase4 />
    </div>
  );
}

function Avatar3() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#bea887] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar3} />
      </div>
    </div>
  );
}

function TextAndSupportingText3() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Demi Wilkinson</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@demi</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox4 />
          <Avatar3 />
          <TextAndSupportingText3 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase5() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase5 />
    </div>
  );
}

function Avatar4() {
  return (
    <div className="bg-[#dffdea] relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <p className="absolute css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#00858a] text-[16px] text-center top-[calc(50%-12px)] translate-x-[-50%] w-[40px]">CW</p>
    </div>
  );
}

function TextAndSupportingText4() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Candice Wu</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@candice</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox5 />
          <Avatar4 />
          <TextAndSupportingText4 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase6() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase6 />
    </div>
  );
}

function Avatar5() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#d1baa9] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar4} />
      </div>
    </div>
  );
}

function TextAndSupportingText5() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Natali Craig</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@natali</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox6 />
          <Avatar5 />
          <TextAndSupportingText5 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase7() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase7 />
    </div>
  );
}

function Avatar6() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#d1dfc3] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar5} />
      </div>
    </div>
  );
}

function TextAndSupportingText6() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Drew Cano</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@drew</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox7 />
          <Avatar6 />
          <TextAndSupportingText6 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase8() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase8 />
    </div>
  );
}

function Avatar7() {
  return (
    <div className="bg-[#dffdea] relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <p className="absolute css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-1/2 not-italic text-[#00858a] text-[16px] text-center top-[calc(50%-12px)] translate-x-[-50%] w-[40px]">OD</p>
    </div>
  );
}

function TextAndSupportingText7() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Orlando Diggs</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@orlando</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox8 />
          <Avatar7 />
          <TextAndSupportingText7 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase9() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase9 />
    </div>
  );
}

function Avatar8() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#d2c7ac] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar6} />
      </div>
    </div>
  );
}

function TextAndSupportingText8() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Andi Lane</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@andi</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox9 />
          <Avatar8 />
          <TextAndSupportingText8 />
        </div>
      </div>
    </div>
  );
}

function CheckboxBase10() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase10 />
    </div>
  );
}

function Avatar9() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute bg-[#dbc0dd] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[200px] size-full" src={imgAvatar7} />
      </div>
    </div>
  );
}

function TextAndSupportingText9() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[20px] not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#181d27]">Kate Morrison</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">@kate</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[16px] relative size-full">
          <Checkbox10 />
          <Avatar9 />
          <TextAndSupportingText9 />
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Column">
      <TableHeaderCell />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-down">
          <path d={svgPaths.p14089660} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">Status</p>
      <ArrowDown />
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <TableHeader1 />
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase1() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase1 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge1 />
        </div>
      </div>
    </div>
  );
}

function Dot1() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase2() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot1 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase2 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge2 />
        </div>
      </div>
    </div>
  );
}

function Dot2() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase3() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot2 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase3 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge3 />
        </div>
      </div>
    </div>
  );
}

function Dot3() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase4() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot3 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase4 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge4 />
        </div>
      </div>
    </div>
  );
}

function Dot4() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase5() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot4 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase5 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge5 />
        </div>
      </div>
    </div>
  );
}

function Dot5() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase6() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot5 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase6 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge6 />
        </div>
      </div>
    </div>
  );
}

function Dot6() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase7() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot6 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase7 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge7 />
        </div>
      </div>
    </div>
  );
}

function Dot7() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase8() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot7 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase8 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge8 />
        </div>
      </div>
    </div>
  );
}

function Dot8() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase9() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot8 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase9 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge9 />
        </div>
      </div>
    </div>
  );
}

function Dot9() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="_Dot">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="_Dot">
          <circle cx="4.00001" cy="4" fill="var(--fill-0, #12B76A)" id="Dot" r="3" />
        </g>
      </svg>
    </div>
  );
}

function BadgeBase10() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] items-center justify-center pl-[6px] pr-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <Dot9 />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center">Active</p>
    </div>
  );
}

function Badge10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase10 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badge10 />
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[120px]" data-name="Column">
      <TableHeaderCell1 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function HelpIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Help icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_364_13071)" id="help-circle">
          <path d={svgPaths.p255c9380} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_364_13071">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">Role</p>
      <HelpIcon />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-white h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <TableHeader2 />
        </div>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">Product Designer</p>
        </div>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">Product Manager</p>
        </div>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">Frontend Developer</p>
        </div>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">Backend Developer</p>
        </div>
      </div>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">Fullstack Developer</p>
        </div>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">UX Designer</p>
        </div>
      </div>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">UX Copywriter</p>
        </div>
      </div>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">UI Designer</p>
        </div>
      </div>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">Product Manager</p>
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">QA Engineer</p>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[176px]" data-name="Column">
      <TableHeaderCell2 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">Email address</p>
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-white h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <TableHeader3 />
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">olivia@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">phoenix@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">lana@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">demi@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">candice@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">natali@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">drew@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">orlando@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">andi@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px]">kate@untitledui.com</p>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[224px]" data-name="Column">
      <TableHeaderCell3 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#535862] text-[12px]">Teams</p>
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-white h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <TableHeader4 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase11() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase11 />
    </div>
  );
}

function BadgeBase12() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase12 />
    </div>
  );
}

function BadgeBase13() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase13 />
    </div>
  );
}

function BadgeBase14() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase14 />
    </div>
  );
}

function Badges() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge11 />
      <Badge12 />
      <Badge13 />
      <Badge14 />
    </div>
  );
}

function TableCell40() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges />
        </div>
      </div>
    </div>
  );
}

function BadgeBase15() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase15 />
    </div>
  );
}

function BadgeBase16() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase16 />
    </div>
  );
}

function BadgeBase17() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase17 />
    </div>
  );
}

function BadgeBase18() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase18 />
    </div>
  );
}

function Badges1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge15 />
      <Badge16 />
      <Badge17 />
      <Badge18 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges1 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase19() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase19 />
    </div>
  );
}

function BadgeBase20() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase20 />
    </div>
  );
}

function BadgeBase21() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase21 />
    </div>
  );
}

function BadgeBase22() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase22 />
    </div>
  );
}

function Badges2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge19 />
      <Badge20 />
      <Badge21 />
      <Badge22 />
    </div>
  );
}

function TableCell42() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges2 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase23() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase23 />
    </div>
  );
}

function BadgeBase24() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge24() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase24 />
    </div>
  );
}

function BadgeBase25() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge25() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase25 />
    </div>
  );
}

function BadgeBase26() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase26 />
    </div>
  );
}

function Badges3() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge23 />
      <Badge24 />
      <Badge25 />
      <Badge26 />
    </div>
  );
}

function TableCell43() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges3 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase27() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge27() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase27 />
    </div>
  );
}

function BadgeBase28() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge28() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase28 />
    </div>
  );
}

function BadgeBase29() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge29() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase29 />
    </div>
  );
}

function BadgeBase30() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge30() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase30 />
    </div>
  );
}

function Badges4() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge27 />
      <Badge28 />
      <Badge29 />
      <Badge30 />
    </div>
  );
}

function TableCell44() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges4 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase31() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge31() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase31 />
    </div>
  );
}

function BadgeBase32() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge32() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase32 />
    </div>
  );
}

function BadgeBase33() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge33() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase33 />
    </div>
  );
}

function BadgeBase34() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge34() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase34 />
    </div>
  );
}

function Badges5() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge31 />
      <Badge32 />
      <Badge33 />
      <Badge34 />
    </div>
  );
}

function TableCell45() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges5 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase35() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge35() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase35 />
    </div>
  );
}

function BadgeBase36() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge36() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase36 />
    </div>
  );
}

function BadgeBase37() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge37() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase37 />
    </div>
  );
}

function BadgeBase38() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge38() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase38 />
    </div>
  );
}

function Badges6() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge35 />
      <Badge36 />
      <Badge37 />
      <Badge38 />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges6 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase39() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge39() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase39 />
    </div>
  );
}

function BadgeBase40() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge40() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase40 />
    </div>
  );
}

function BadgeBase41() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge41() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase41 />
    </div>
  );
}

function BadgeBase42() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge42() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase42 />
    </div>
  );
}

function Badges7() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge39 />
      <Badge40 />
      <Badge41 />
      <Badge42 />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges7 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase43() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge43() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase43 />
    </div>
  );
}

function BadgeBase44() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge44() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase44 />
    </div>
  );
}

function BadgeBase45() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge45() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase45 />
    </div>
  );
}

function BadgeBase46() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge46() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase46 />
    </div>
  );
}

function Badges8() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge43 />
      <Badge44 />
      <Badge45 />
      <Badge46 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges8 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase47() {
  return (
    <div className="bg-[#dffdea] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#006573] text-[12px] text-center">Design</p>
    </div>
  );
}

function Badge47() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase47 />
    </div>
  );
}

function BadgeBase48() {
  return (
    <div className="bg-[#eff8ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#175cd3] text-[12px] text-center">Product</p>
    </div>
  );
}

function Badge48() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase48 />
    </div>
  );
}

function BadgeBase49() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#3538cd] text-[12px] text-center">Marketing</p>
    </div>
  );
}

function Badge49() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase49 />
    </div>
  );
}

function BadgeBase50() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#414651] text-[12px] text-center">+4</p>
    </div>
  );
}

function Badge50() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Badge">
      <BadgeBase50 />
    </div>
  );
}

function Badges9() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Badges">
      <Badge47 />
      <Badge48 />
      <Badge49 />
      <Badge50 />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Badges9 />
        </div>
      </div>
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[288px]" data-name="Column">
      <TableHeaderCell4 />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
      <TableCell49 />
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-white h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase1 />
    </div>
  );
}

function TableCell50() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Trash1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase2 />
    </div>
  );
}

function Edit1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit1 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase3 />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button2 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Trash2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash2 />
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase4 />
    </div>
  );
}

function Edit2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit2 />
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase5 />
    </div>
  );
}

function TableCell52() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button4 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Trash3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase6() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash3 />
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase6 />
    </div>
  );
}

function Edit3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit3 />
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase7 />
    </div>
  );
}

function TableCell53() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button6 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Trash4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase8() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash4 />
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase8 />
    </div>
  );
}

function Edit4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase9() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit4 />
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase9 />
    </div>
  );
}

function TableCell54() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button8 />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function Trash5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase10() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash5 />
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase10 />
    </div>
  );
}

function Edit5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase11() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit5 />
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase11 />
    </div>
  );
}

function TableCell55() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button10 />
          <Button11 />
        </div>
      </div>
    </div>
  );
}

function Trash6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase12() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash6 />
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase12 />
    </div>
  );
}

function Edit6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase13() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit6 />
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase13 />
    </div>
  );
}

function TableCell56() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button12 />
          <Button13 />
        </div>
      </div>
    </div>
  );
}

function Trash7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase14() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash7 />
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase14 />
    </div>
  );
}

function Edit7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase15() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit7 />
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase15 />
    </div>
  );
}

function TableCell57() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button14 />
          <Button15 />
        </div>
      </div>
    </div>
  );
}

function Trash8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase16() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash8 />
    </div>
  );
}

function Button16() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase16 />
    </div>
  );
}

function Edit8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase17() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit8 />
    </div>
  );
}

function Button17() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase17 />
    </div>
  );
}

function TableCell58() {
  return (
    <div className="bg-[#fafafa] h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button16 />
          <Button17 />
        </div>
      </div>
    </div>
  );
}

function Trash9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d={svgPaths.p1b469680} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase18() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Trash9 />
    </div>
  );
}

function Button18() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase18 />
    </div>
  );
}

function Edit9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="edit-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_364_13059)" id="edit-2">
          <path d={svgPaths.p3c60bf0} id="Icon" stroke="var(--stroke-0, #535862)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_364_13059">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBase19() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <Edit9 />
    </div>
  );
}

function Button19() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase19 />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[16px] relative size-full">
          <Button18 />
          <Button19 />
        </div>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Column">
      <TableHeaderCell5 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-left">
          <path d={svgPaths.p11678e00} id="Icon" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase20() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <ArrowLeft />
        <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px]">Previous</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button20() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase20 />
    </div>
  );
}

function Content2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#00858a] text-[14px] text-center">1</p>
    </div>
  );
}

function PaginationNumberBase() {
  return (
    <div className="bg-[#dffdea] overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content2 />
    </div>
  );
}

function Content3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center">2</p>
    </div>
  );
}

function PaginationNumberBase1() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center">3</p>
    </div>
  );
}

function PaginationNumberBase2() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content4 />
    </div>
  );
}

function Content5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center">...</p>
    </div>
  );
}

function PaginationNumberBase3() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content5 />
    </div>
  );
}

function Content6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center">8</p>
    </div>
  );
}

function PaginationNumberBase4() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content6 />
    </div>
  );
}

function Content7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center">9</p>
    </div>
  );
}

function PaginationNumberBase5() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content7 />
    </div>
  );
}

function Content8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center">10</p>
    </div>
  );
}

function PaginationNumberBase6() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content8 />
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <PaginationNumberBase />
      <PaginationNumberBase1 />
      <PaginationNumberBase2 />
      <PaginationNumberBase3 />
      <PaginationNumberBase4 />
      <PaginationNumberBase5 />
      <PaginationNumberBase6 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-right">
          <path d={svgPaths.p3b6ad300} id="Icon" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase21() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px]">Next</p>
        <ArrowRight />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button21() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase21 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pagination">
      <div aria-hidden="true" className="absolute border-0 border-[#e9eaeb] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16px] pt-[12px] px-[24px] relative w-full">
          <Button20 />
          <PaginationNumbers />
          <Button21 />
        </div>
      </div>
    </div>
  );
}

export default function Table() {
  return (
    <div className="bg-white relative rounded-[12px] size-full" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <CardHeader />
        <Content1 />
        <Pagination />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" />
    </div>
  );
}