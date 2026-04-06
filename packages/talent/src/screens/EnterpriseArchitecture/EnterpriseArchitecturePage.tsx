import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Layout } from "../../components/shell/Layout";
import { Calculator, TrendingDown, Building2, Users, Wallet, BarChart3, PieChart as PieChartIcon, Layers, Info, Settings2, ChevronDown } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, ComposedChart, Line
} from "recharts";
import { Button } from "../../components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";

// --- Constants & Defaults ---

const PRICING = {
  // SAP Pricing (Juta/user/year) - Range 0.45 - 0.90
  SAP_LOW: 0.45,
  SAP_HIGH: 0.90,
  
  // Sunfish Pricing (Rupiah/month)
  SUNFISH_ADMIN_MONTHLY: 257586,
  SUNFISH_EMP_MONTHLY: 30353,
  
  // Fixed assumptions
  SUNFISH_ADMIN_COUNT: 100, // From guidelines
};

const RECURRING_COSTS = {
  TRAINING: 0.05, // 50k -> 0.05 Juta
  HELPDESK: 0.075, // 75k -> 0.075 Juta
  APP_SUPPORT: 0.1, // 100k -> 0.1 Juta
  STORAGE: 0.025, // 25k -> 0.025 Juta
};

// Colors for Charts
const COLORS = [
  "#00495d", // Primary (Chart 1)
  "#ff9220", // Secondary (Chart 2)
  "#1e3a5f", // Chart 3
  "#009689", // Chart 4
  "#e31937", // Chart 5
  "#5c6370", // Muted
];

// Data Structure for Entities
interface EntityData {
  id: string;
  name: string;
  strategy: 'sap' | 'sunfish' | 'hybrid';
  counts: {
    nonCogsPkwtt: number;
    nonCogsPkwt: number;
    cogsPkwtt: number;
    cogsPkwt: number;
  };
}

const DEFAULT_ENTITIES: EntityData[] = [
  { 
    id: "injourney", name: "InJourney (Holding)", strategy: "sap", 
    counts: { nonCogsPkwtt: 49, nonCogsPkwt: 35, cogsPkwtt: 0, cogsPkwt: 0 } 
  },
  { 
    id: "api", name: "Angkasa Pura Indonesia (API)", strategy: "sap", 
    counts: { nonCogsPkwtt: 7724, nonCogsPkwt: 27, cogsPkwtt: 0, cogsPkwt: 0 } 
  },
  { 
    id: "itdc", name: "ITDC", strategy: "sap", 
    counts: { nonCogsPkwtt: 188, nonCogsPkwt: 67, cogsPkwtt: 0, cogsPkwt: 0 } 
  },
  { 
    id: "hin", name: "Hotel Indonesia Natour (HIN)", strategy: "sap", 
    counts: { nonCogsPkwtt: 278, nonCogsPkwt: 1177, cogsPkwtt: 0, cogsPkwt: 0 } 
  },
  { 
    id: "sarinah", name: "Sarinah", strategy: "sap", 
    counts: { nonCogsPkwtt: 147, nonCogsPkwt: 56, cogsPkwtt: 0, cogsPkwt: 0 } 
  },
  { 
    id: "twc", name: "Taman Wisata Candi (TWC)", strategy: "sap", 
    counts: { nonCogsPkwtt: 157, nonCogsPkwt: 335, cogsPkwtt: 0, cogsPkwt: 0 } 
  },
  { 
    id: "ias", name: "InJourney Aviation Services (IAS)", strategy: "hybrid", 
    counts: { nonCogsPkwtt: 1320, nonCogsPkwt: 507, cogsPkwtt: 1876, cogsPkwt: 28482 } 
  },
];

const CATEGORIES = [
  { id: "nonCogsPkwtt", label: "Non-COGS PKWTT", description: "Permanent non-operational" },
  { id: "nonCogsPkwt", label: "Non-COGS PKWT", description: "Contract non-operational" },
  { id: "cogsPkwtt", label: "COGS PKWTT", description: "Permanent operational" },
  { id: "cogsPkwt", label: "COGS PKWT", description: "Contract operational" },
];

const SYSTEMS = [
  { id: "sap", label: "SAP Core HR + Payroll" },
  { id: "sunfish", label: "Sunfish HRIS" },
];

const STRATEGIES = [
  { id: "sap", label: "Full SAP", description: "All employees use SAP" },
  { id: "sunfish", label: "Full Sunfish", description: "All employees use Sunfish" },
  { id: "hybrid", label: "Hybrid (Rule Based)", description: "Follows category assignment rules" },
];

// Initial Assignments for Hybrid Strategy
const INITIAL_CATEGORY_RULES = {
  nonCogsPkwtt: "sap",
  nonCogsPkwt: "sap",
  cogsPkwtt: "sap",
  cogsPkwt: "sunfish",
};

// CAPEX Data
const CAPEX_SUMMARY = [
  { category: "Infrastructure & Cloud", conservative: 2.0, optimistic: 4.5 },
  { category: "Core App Licenses", conservative: 0.8, optimistic: 1.5 },
  { category: "Rinjani Suite Dev", conservative: 2.8, optimistic: 7.1 },
  { category: "AI Engine Dev", conservative: 5.6, optimistic: 13.3 },
  { category: "Integration & Data", conservative: 2.6, optimistic: 6.5 },
  { category: "Security Infra", conservative: 1.65, optimistic: 4.1 },
  { category: "Professional Services", conservative: 3.2, optimistic: 7.5 },
];

const TOTAL_CAPEX = {
  conservative: CAPEX_SUMMARY.reduce((acc, curr) => acc + curr.conservative, 0),
  optimistic: CAPEX_SUMMARY.reduce((acc, curr) => acc + curr.optimistic, 0),
};

const CAPEX_DETAILS = [
  {
    category: "Infrastructure & Cloud (GCP)",
    items: [
      { name: "Compute Engine (VMs)", conservative: 300, optimistic: 650 },
      { name: "Google Kubernetes Engine (GKE)", conservative: 400, optimistic: 900 },
      { name: "Storage Infrastructure", conservative: 250, optimistic: 550 },
      { name: "Database Setup (Cloud SQL)", conservative: 350, optimistic: 800 },
      { name: "Cache Infrastructure (Redis)", conservative: 150, optimistic: 350 },
      { name: "CDN & Load Balancing", conservative: 200, optimistic: 450 },
      { name: "Network & Security (VPC, Cloud Armor)", conservative: 250, optimistic: 600 },
      { name: "Monitoring & Logging", conservative: 100, optimistic: 200 },
    ]
  },
  {
    category: "Core Application Licenses",
    items: [
      { name: "Sunfish Enhancement (Customization)", conservative: 800, optimistic: 1500 },
      { name: "SAP SuccessFactors Impl.", conservative: 0, optimistic: 0, note: "Bundled in OPEX" },
    ]
  },
  {
    category: "Rinjani Suite Development",
    items: [
      { name: "Rinjani Performance Suite", conservative: 800, optimistic: 2000 },
      { name: "Rinjani Talent Suite", conservative: 700, optimistic: 1800 },
      { name: "Rinjani Learning Platform", conservative: 1200, optimistic: 2000 },
      { name: "Mobile App (iOS + Android)", conservative: 1200, optimistic: 2000 },
      { name: "Rinjani Portal (Gateway)", conservative: 300, optimistic: 800 },
    ]
  },
  {
    category: "AI Engine Development",
    items: [
      { name: "Ask Rinjani Chatbot (RAG + LLM)", conservative: 600, optimistic: 1500 },
      { name: "Predictive Analytics Models", conservative: 1200, optimistic: 2800 },
      { name: "Generative AI Features", conservative: 1000, optimistic: 2500 },
      { name: "Agentic AI Platform", conservative: 2000, optimistic: 4500 },
      { name: "AI Infrastructure (GPU/TPU)", conservative: 800, optimistic: 2000 },
    ]
  },
  {
    category: "Integration & Data Architecture",
    items: [
      { name: "API Gateway & ESB", conservative: 400, optimistic: 1000 },
      { name: "Master Data Management (MDM)", conservative: 800, optimistic: 2000 },
      { name: "Data Warehouse Setup", conservative: 600, optimistic: 1500 },
      { name: "ETL Pipeline Development", conservative: 500, optimistic: 1200 },
      { name: "Data Quality & Governance Tools", conservative: 300, optimistic: 800 },
    ]
  },
  {
    category: "Security Infrastructure",
    items: [
      { name: "IAM & SSO Platform", conservative: 400, optimistic: 1000 },
      { name: "Multi-Factor Authentication", conservative: 200, optimistic: 500 },
      { name: "SIEM & Security Monitoring", conservative: 500, optimistic: 1200 },
      { name: "Endpoint Security (EDR)", conservative: 300, optimistic: 800 },
      { name: "Encryption Infrastructure", conservative: 250, optimistic: 600 },
    ]
  },
  {
    category: "Professional Services",
    items: [
      { name: "System Integrator Fees (Non-SAP)", conservative: 1500, optimistic: 3500 },
      { name: "Implementation Consulting", conservative: 500, optimistic: 1000 },
      { name: "Change Management (Non-SAP)", conservative: 400, optimistic: 1000 },
      { name: "Training Development", conservative: 300, optimistic: 800 },
      { name: "Data Migration Services", conservative: 500, optimistic: 1200 },
    ]
  }
];

export function EnterpriseArchitecturePage() {
  // --- State ---
  const [entities, setEntities] = useState<EntityData[]>(DEFAULT_ENTITIES);
  const [categoryRules, setCategoryRules] = useState(INITIAL_CATEGORY_RULES);
  const [projectionScenario, setProjectionScenario] = useState<'conservative' | 'optimistic'>('optimistic');

  // --- Calculations ---

  const calculation = useMemo(() => {
    let totalEmployees = 0;
    let sapCount = 0;
    let sunfishCount = 0;
    
    // Track breakdown by category for the detail view
    const breakdownMap = new Map<string, { count: number, system: string }>();
    CATEGORIES.forEach(cat => breakdownMap.set(cat.id, { count: 0, system: 'mixed' }));

    // Iterate through each entity
    entities.forEach(entity => {
      // For each category in the entity
      Object.entries(entity.counts).forEach(([catId, count]) => {
        if (count <= 0) return;

        totalEmployees += count;
        
        let assignedSystemId = '';

        if (entity.strategy === 'sap') {
          assignedSystemId = 'sap';
        } else if (entity.strategy === 'sunfish') {
          assignedSystemId = 'sunfish';
        } else {
          // Hybrid: use category rule
          assignedSystemId = categoryRules[catId as keyof typeof categoryRules];
        }

        // Accumulate counts
        if (assignedSystemId === 'sap') {
          sapCount += count;
        } else {
          sunfishCount += count;
        }

        // Update breakdown map
        const breakdownItem = breakdownMap.get(catId)!;
        breakdownItem.count += count;
      });
    });

    // --- Pricing Calculation ---

    // SAP Cost (Range)
    // Low: count * 0.45
    // High: count * 0.90
    const sapCostLow = sapCount * PRICING.SAP_LOW;
    const sapCostHigh = sapCount * PRICING.SAP_HIGH;

    // Sunfish Cost
    // Admin: 100 users * 257,586 * 12
    const sunfishAdminCost = (PRICING.SUNFISH_ADMIN_COUNT * PRICING.SUNFISH_ADMIN_MONTHLY * 12) / 1_000_000; // in Juta
    // Employee: sunfishCount * 30,353 * 12
    const sunfishEmpCost = (sunfishCount * PRICING.SUNFISH_EMP_MONTHLY * 12) / 1_000_000; // in Juta
    const sunfishTotalCost = sunfishAdminCost + sunfishEmpCost;

    // Recurring Costs (Headcount Based)
    const trainingCost = totalEmployees * RECURRING_COSTS.TRAINING;
    const helpdeskCost = totalEmployees * RECURRING_COSTS.HELPDESK;
    const appSupportCost = totalEmployees * RECURRING_COSTS.APP_SUPPORT;
    const storageCost = totalEmployees * RECURRING_COSTS.STORAGE;
    const totalRecurringOverhead = trainingCost + helpdeskCost + appSupportCost + storageCost;

    // Total Subscription
    const totalSubLow = sapCostLow + sunfishTotalCost;
    const totalSubHigh = sapCostHigh + sunfishTotalCost;

    // Total OPEX (Subscription + Overhead)
    const totalOpexLow = totalSubLow + totalRecurringOverhead;
    const totalOpexHigh = totalSubHigh + totalRecurringOverhead;

    // Convert breakdown map to array for UI
    const breakdown = CATEGORIES.map(cat => {
      const data = breakdownMap.get(cat.id)!;
      return {
        category: cat.label,
        count: data.count,
        system: "Dynamic", 
      };
    });

    return {
      totalEmployees,
      sapCount,
      sunfishCount,
      sapCostLow,
      sapCostHigh,
      sunfishAdminCost,
      sunfishEmpCost,
      sunfishTotalCost,
      totalRecurringOverhead,
      totalSubLow,
      totalSubHigh,
      totalOpexLow,
      totalOpexHigh,
      breakdown,
    };
  }, [entities, categoryRules]);

  // --- Projection Data Generation ---
  const projectionData = useMemo(() => {
    // Select base values based on scenario
    const annualOpex = projectionScenario === 'optimistic' ? calculation.totalOpexHigh : calculation.totalOpexLow;
    const totalCapex = projectionScenario === 'optimistic' ? TOTAL_CAPEX.optimistic : TOTAL_CAPEX.conservative;
    
    // Savings Assumptions (Hard + Soft) from Guidelines
    // Conservative: ~35-70M/year total
    // Optimistic: ~70-140M/year total
    // We will estimate savings roughly as a percentage of OPEX or fixed range for prototype
    const annualSavings = projectionScenario === 'optimistic' ? 60 : 35; // Milyar

    const data = [
      {
        year: "2026",
        capex: totalCapex * 0.4, // 40%
        opex: 0,
        savings: 0,
        net: -(totalCapex * 0.4)
      },
      {
        year: "2027",
        capex: totalCapex * 0.3, // 30%
        opex: annualOpex * 0.5, // 50% ramp up
        savings: annualSavings * 0.3, // 30% realized
        net: (annualSavings * 0.3) - (totalCapex * 0.3) - (annualOpex * 0.5)
      },
      {
        year: "2028",
        capex: totalCapex * 0.3, // 30%
        opex: annualOpex,
        savings: annualSavings * 0.7, // 70% realized
        net: (annualSavings * 0.7) - (totalCapex * 0.3) - annualOpex
      },
      {
        year: "2029",
        capex: 0,
        opex: annualOpex,
        savings: annualSavings, // 100% realized
        net: annualSavings - annualOpex
      },
      {
        year: "2030",
        capex: 0,
        opex: annualOpex,
        savings: annualSavings,
        net: annualSavings - annualOpex
      },
    ];
    return data;
  }, [calculation, projectionScenario]);


  // Format currency
  const formatMoney = (amountInJuta: number) => {
    if (amountInJuta >= 1000) {
      return `Rp ${(amountInJuta / 1000).toFixed(2)} Milyar`;
    }
    return `Rp ${amountInJuta.toFixed(0)} Juta`;
  };

  const formatBillion = (amountInMilyar: number) => {
    return `Rp ${amountInMilyar.toFixed(2)} M`;
  };

  const formatRange = (low: number, high: number) => {
     if (low >= 1000) {
       return `Rp ${(low / 1000).toFixed(2)} - ${(high / 1000).toFixed(2)} M`;
     }
     return `Rp ${low.toFixed(0)} - ${high.toFixed(0)} Juta`;
  };

  // --- Handlers ---
  const handleEntityStrategyChange = (entityId: string, val: 'sap' | 'sunfish' | 'hybrid') => {
    setEntities(prev => prev.map(e => e.id === entityId ? { ...e, strategy: val } : e));
  };

  const handleEntityCountChange = (entityId: string, categoryId: string, val: string) => {
    const num = parseInt(val) || 0;
    setEntities(prev => prev.map(e => {
      if (e.id === entityId) {
        return {
          ...e,
          counts: {
            ...e.counts,
            [categoryId]: num
          }
        };
      }
      return e;
    }));
  };

  const handleCategoryRuleChange = (catId: string, val: string) => {
    setCategoryRules(prev => ({ ...prev, [catId]: val }));
  };

  return (
    <Layout>
      <div className="p-8 max-w-[1200px] mx-auto space-y-8 pb-20">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Building2 className="w-8 h-8" />
            <h3>Enterprise Architecture Cost Model</h3>
          </div>
          <p className="text-muted-foreground">
            Interactive financial model for InJourney Group EA implementation (TOGAF 10).
            Adjust parameters to estimate 5-year OPEX and CAPEX.
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-primary text-primary-foreground border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-primary-foreground font-medium text-sm">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{calculation.totalEmployees.toLocaleString()}</div>
              <p className="text-xs text-primary-foreground/80 mt-1">Across all entities</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground font-medium text-sm">Annual OPEX (Sub.)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {formatRange(calculation.totalSubLow, calculation.totalSubHigh)}
              </div>
              <div className="flex items-center gap-1 text-xs text-[color:var(--color-chart-4)] mt-1 font-medium">
                <TrendingDown className="w-3 h-3" />
                <span>Based on current config</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground font-medium text-sm">SAP Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculation.sapCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Core HR + Payroll</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground font-medium text-sm">Sunfish Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculation.sunfishCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Workforce + 100 Admin</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Calculator Area */}
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" /> OPEX Calculator
            </TabsTrigger>
            <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
            <TabsTrigger value="capex" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Financial Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Configuration */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Entity Assignment Strategy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings2 className="w-5 h-5 text-primary" />
                      Entity Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure system assignment strategy and headcount per entity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]"></TableHead>
                          <TableHead>Entity</TableHead>
                          <TableHead>Strategy</TableHead>
                          <TableHead className="text-right">Total Headcount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entities.map((entity) => (
                          <Collapsible key={entity.id} asChild>
                            <>
                              <TableRow>
                                <TableCell>
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                      <ChevronDown className="h-4 w-4" />
                                      <span className="sr-only">Toggle</span>
                                    </Button>
                                  </CollapsibleTrigger>
                                </TableCell>
                                <TableCell className="font-medium">{entity.name}</TableCell>
                                <TableCell>
                                  <Select 
                                    value={entity.strategy}
                                    onValueChange={(val: any) => handleEntityStrategyChange(entity.id, val)}
                                  >
                                    <SelectTrigger className="w-[180px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {STRATEGIES.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                          {s.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                  {(
                                    entity.counts.nonCogsPkwtt + 
                                    entity.counts.nonCogsPkwt + 
                                    entity.counts.cogsPkwtt + 
                                    entity.counts.cogsPkwt
                                  ).toLocaleString()}
                                </TableCell>
                              </TableRow>
                              <CollapsibleContent asChild>
                                <TableRow className="bg-muted/30">
                                  <TableCell colSpan={4} className="p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      {CATEGORIES.map((cat) => (
                                        <div key={cat.id} className="flex flex-col space-y-1.5">
                                          <label className="text-xs font-medium text-muted-foreground">
                                            {cat.label}
                                          </label>
                                          <Input 
                                            type="number" 
                                            value={entity.counts[cat.id as keyof typeof entity.counts]}
                                            onChange={(e) => handleEntityCountChange(entity.id, cat.id, e.target.value)}
                                            className="h-8 bg-white"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </CollapsibleContent>
                            </>
                          </Collapsible>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* 2. Hybrid Category Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      Hybrid Strategy Rules
                    </CardTitle>
                    <CardDescription>
                      System assignment rules for entities set to <strong>"Hybrid"</strong> strategy (e.g., IAS).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between border p-3 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{cat.label}</div>
                            <div className="text-xs text-muted-foreground">{cat.description}</div>
                          </div>
                          <Select 
                            value={categoryRules[cat.id as keyof typeof categoryRules]}
                            onValueChange={(val) => handleCategoryRuleChange(cat.id, val)}
                          >
                            <SelectTrigger className="w-[140px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SYSTEMS.map((sys) => (
                                <SelectItem key={sys.id} value={sys.id}>
                                  {sys.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 text-sm text-primary flex items-start gap-2">
                  <Info className="w-5 h-5 mt-0.5" />
                  <div>
                    <strong>Pricing Model Updates:</strong>
                    <ul className="list-disc ml-4 mt-1 space-y-1">
                      <li>SAP pricing is bundled (Core HR + Payroll) at <strong>Rp 0.45 - 0.90 Juta/user/year</strong>.</li>
                      <li>Sunfish pricing splits Admin users (Rp 257k/mo) vs Employee users (Rp 30k/mo).</li>
                      <li>Costs are automatically calculated based on the Entity Strategy and assigned headcount.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      Annual Estimates
                    </CardTitle>
                    <CardDescription>Subscription & Support Costs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                         <div className="flex justify-between items-center text-sm font-medium">
                           <span>SAP Core HR + Payroll</span>
                           <span>{formatRange(calculation.sapCostLow, calculation.sapCostHigh)}</span>
                         </div>
                         <div className="text-xs text-muted-foreground text-right">
                           {calculation.sapCount.toLocaleString()} users
                         </div>
                      </div>

                      <div className="space-y-1">
                         <div className="flex justify-between items-center text-sm font-medium">
                           <span>Sunfish HRIS</span>
                           <span>{formatMoney(calculation.sunfishTotalCost)}</span>
                         </div>
                         <div className="text-xs text-muted-foreground text-right">
                           {calculation.sunfishCount.toLocaleString()} employees + 100 admins
                         </div>
                      </div>
                      
                      <div className="h-px bg-border my-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">Total Subscription</span>
                        <span className="font-bold text-primary">
                          {formatRange(calculation.totalSubLow, calculation.totalSubHigh)}
                        </span>
                      </div>

                      <div className="bg-muted p-3 rounded-md mt-4">
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                           <span>Overhead (Training, Support, Storage)</span>
                           <span>{formatMoney(calculation.totalRecurringOverhead)}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-sm">
                           <span>Total Annual OPEX</span>
                           <span>{formatRange(calculation.totalOpexLow, calculation.totalOpexHigh)}</span>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </TabsContent>

          <TabsContent value="details">
             <Card>
              <CardHeader>
                <CardTitle>Detailed Breakdown by Category</CardTitle>
                <CardDescription>
                  Aggregated counts from all entities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Assigned System</TableHead>
                      <TableHead className="text-right">Headcount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculation.breakdown.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              Dynamic (Entity Based)
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    
                    {/* Add separate row for Sunfish Admin Fixed Cost */}
                    <TableRow className="bg-accent/30">
                       <TableCell className="font-medium">Sunfish Admin Users (Fixed)</TableCell>
                       <TableCell><Badge variant="outline" className="bg-accent text-accent-foreground border-accent-foreground/20">Sunfish HRIS</Badge></TableCell>
                       <TableCell className="text-right">100</TableCell>
                    </TableRow>

                    <TableRow className="bg-muted/50 font-bold border-t-2">
                       <TableCell colSpan={2}>Total Subscription Base</TableCell>
                       <TableCell className="text-right">{calculation.totalEmployees.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="capex" className="space-y-6">
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
               <div className="space-y-1">
                 <h4 className="text-sm font-medium">Investment Scenario</h4>
                 <p className="text-xs text-muted-foreground">Toggle between Conservative and Optimistic estimates</p>
               </div>
               <div className="flex items-center space-x-2">
                 <Label htmlFor="scenario-toggle" className={projectionScenario === 'conservative' ? 'font-bold' : ''}>Conservative</Label>
                 <Switch 
                   id="scenario-toggle" 
                   checked={projectionScenario === 'optimistic'}
                   onCheckedChange={(checked) => setProjectionScenario(checked ? 'optimistic' : 'conservative')}
                 />
                 <Label htmlFor="scenario-toggle" className={projectionScenario === 'optimistic' ? 'font-bold' : ''}>Optimistic</Label>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CAPEX Pie Chart */}
              <Card className="min-w-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-primary" />
                    CAPEX Distribution
                  </CardTitle>
                  <CardDescription>
                    Investment breakdown by category ({projectionScenario})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={CAPEX_SUMMARY}
                          dataKey={projectionScenario}
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {CAPEX_SUMMARY.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`Rp ${value.toFixed(2)} M`, undefined]} />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 5-Year Projection Bar Chart */}
              <Card className="min-w-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    5-Year Financial Projection
                  </CardTitle>
                  <CardDescription>
                    Projected Cash Flow (CAPEX, OPEX, Savings)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={projectionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis label={{ value: 'IDR Milyar', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number) => [`Rp ${value.toFixed(1)} M`, undefined]} />
                        <Legend />
                        <Bar dataKey="capex" name="CAPEX" stackId="a" fill="#00495d" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="opex" name="OPEX" stackId="a" fill="#5c6370" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="savings" name="Est. Savings" stroke="#ff9220" strokeWidth={3} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Component Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Detailed CAPEX Components
                </CardTitle>
                <CardDescription>
                  Granular breakdown of investment items and estimated costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {CAPEX_DETAILS.map((section, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-1 items-center justify-between mr-4">
                          <span className="font-semibold">{section.category}</span>
                          <div className="text-sm font-normal text-muted-foreground hidden sm:block">
                            Est: {formatMoney(section.items.reduce((a,b) => a + b.conservative, 0))} - {formatMoney(section.items.reduce((a,b) => a + b.optimistic, 0))}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Component</TableHead>
                              <TableHead className="text-right">Conservative</TableHead>
                              <TableHead className="text-right">Optimistic</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {section.items.map((item, i) => (
                              <TableRow key={i}>
                                <TableCell className="py-2">
                                  {item.name}
                                  {item.note && <span className="text-xs text-muted-foreground ml-2">({item.note})</span>}
                                </TableCell>
                                <TableCell className="text-right py-2">{formatMoney(item.conservative)}</TableCell>
                                <TableCell className="text-right py-2">{formatMoney(item.optimistic)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-6 flex justify-between items-center p-4 bg-muted/30 rounded-lg border">
                   <div className="font-bold">Total Projected CAPEX</div>
                   <div className="text-right">
                     <div className="text-xl font-bold text-primary">{formatBillion(TOTAL_CAPEX.conservative)} - {formatBillion(TOTAL_CAPEX.optimistic)}</div>
                     <div className="text-xs text-muted-foreground">Range based on scenario selection</div>
                   </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
