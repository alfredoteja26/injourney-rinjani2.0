import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Medal, 
  Target, 
  TrendingUp, 
  Share2, 
  Download, 
  Star, 
  Award, 
  Zap, 
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Layout } from '../../components/shell/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { cn } from '../../components/ui/utils';
import { Link } from 'react-router';

// Mock Data for Wrapped
const wrappedData = {
  year: 2026,
  totalHours: 48,
  targetHours: 40,
  totalActivities: 5,
  completionRate: 100,
  topCompetency: {
    name: 'Leadership',
    levelChange: '2 → 3',
    improvement: '+1 Level'
  },
  achievements: [
    {
      id: 'early-finisher',
      title: 'Early Finisher',
      description: 'Completed before deadline',
      icon: Clock,
      color: 'text-teal-600 bg-teal-100'
    },
    {
      id: 'overachiever',
      title: 'Overachiever',
      description: 'Exceeded minimum hours',
      icon: Trophy,
      color: 'text-amber-600 bg-amber-100'
    },
    {
      id: 'consistent',
      title: 'Consistent Learner',
      description: 'Regular progress updates',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'gap-closer',
      title: 'Gap Closer',
      description: 'Addressed all top gaps',
      icon: Target,
      color: 'text-purple-600 bg-purple-100'
    }
  ],
  competencies: [
    { name: 'Leadership', level: 'Level 3', status: 'Improved' },
    { name: 'Digital Literacy', level: 'Level 3', status: 'Improved' },
    { name: 'Financial Analysis', level: 'Level 3', status: 'Maintained' },
    { name: 'Communication', level: 'Level 4', status: 'Improved' }
  ],
  highlightActivity: {
    title: 'Effective Leadership Fundamentals',
    hours: 8,
    type: 'Blended Learning',
    completedAt: 'March 2026',
    image: 'figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png' // Using a placeholder/mock asset if needed, or just a colored box
  }
};

export function MyLearningWrapped() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    // In a real implementation, we would trigger a canvas confetti here
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background font-sans overflow-hidden relative">
        {/* Simple Confetti CSS Effect (Visual Representation) */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: -20, 
                  left: `${Math.random() * 100}%`,
                  rotate: 0 
                }}
                animate={{ 
                  top: '100%', 
                  rotate: 360,
                  x: Math.random() * 100 - 50
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                className={cn(
                  "absolute w-2 h-2 rounded-full",
                  ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"][Math.floor(Math.random() * 5)]
                )}
              />
            ))}
          </div>
        )}

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto p-6 md:p-12 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <Badge className="bg-gradient-to-r from-primary to-teal-600 text-primary-foreground border-0 px-4 py-1 text-sm mb-4">
              IDP Period {wrappedData.year} Ended
            </Badge>
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-foreground tracking-tight">
              My Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">Wrapped</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What a journey! Here's a look back at your development achievements this year.
            </p>
          </motion.div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border shadow-xl overflow-hidden relative h-full group hover:scale-[1.02] transition-transform">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Clock size={120} />
                </div>
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full relative z-10">
                  <h3 className="text-muted-foreground font-medium uppercase tracking-wider text-sm mb-2">Total Development</h3>
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {wrappedData.totalHours} <span className="text-2xl text-muted-foreground font-normal">hours</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-2 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Target: {wrappedData.targetHours} hours exceeded
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border shadow-xl overflow-hidden relative h-full group hover:scale-[1.02] transition-transform">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckCircle2 size={120} />
                </div>
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full relative z-10">
                  <h3 className="text-muted-foreground font-medium uppercase tracking-wider text-sm mb-2">Activities Completed</h3>
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {wrappedData.totalActivities} <span className="text-2xl text-muted-foreground font-normal">/ {wrappedData.totalActivities}</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-2 flex items-center gap-1">
                    <Zap size={12} /> 100% Completion Rate
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Competencies */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-sans font-bold text-foreground">Competencies Unlocked</h2>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
                <Star size={12} className="mr-1 fill-amber-800" /> {wrappedData.topCompetency.improvement}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {wrappedData.competencies.map((comp, idx) => (
                <Card key={idx} className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3 text-muted-foreground">
                      <Award size={20} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{comp.name}</h3>
                    <p className="text-sm text-muted-foreground">{comp.level}</p>
                    <div className="mt-3 text-xs font-medium text-green-600 flex items-center gap-1">
                      <TrendingUp size={12} /> {comp.status}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-sans font-bold text-foreground">Your Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wrappedData.achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={cn(
                    "p-4 rounded-xl flex items-center gap-4 transition-transform hover:scale-[1.02]",
                    achievement.color.replace('text-', 'bg-').replace('bg-', 'bg-opacity-10 ') // Hacky generic bg
                  )}
                  style={{ backgroundColor: 'var(--card)' }} // Fallback
                >
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", achievement.color)}>
                    <achievement.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Highlight */}
          <motion.div variants={itemVariants} className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-0">Featured Activity</Badge>
                  <h3 className="text-2xl font-bold text-[rgb(202,213,226)]">{wrappedData.highlightActivity.title}</h3>
                  <div className="flex items-center gap-4 text-slate-300 text-sm">
                    <span className="flex items-center gap-1"><Clock size={14} /> {wrappedData.highlightActivity.hours} Hours</span>
                    <span className="flex items-center gap-1"><Medal size={14} /> {wrappedData.highlightActivity.type}</span>
                  </div>
                  <p className="text-slate-400">Completed in {wrappedData.highlightActivity.completedAt}</p>
                </div>
                <div className="w-full md:w-1/3 aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 shadow-lg">
                   {/* Placeholder for course image */}
                   <div className="text-center">
                      <Zap size={48} className="mx-auto text-slate-600 mb-2" />
                      <span className="text-xs text-slate-500">Course Thumbnail</span>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Footer Actions */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 border-t border-border">
             <Button className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-lg shadow-lg shadow-primary/20">
                <Share2 size={18} /> Share My Wrapped
             </Button>
             <Button variant="outline" className="w-full md:w-auto gap-2 h-12 px-8 text-lg border-border text-foreground hover:bg-muted">
                <Download size={18} /> Download PDF
             </Button>
             <Button variant="ghost" asChild className="w-full md:w-auto gap-2 h-12 px-8 text-lg text-muted-foreground hover:text-foreground">
                <Link to="/talent/idp/editor">
                  Start New IDP <ArrowRight size={18} />
                </Link>
             </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
