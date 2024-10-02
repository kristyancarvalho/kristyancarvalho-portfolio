import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, BarChart2 } from 'lucide-react';

interface CustomTabsProps {
  value: 'recent' | 'relevant';
  onValueChange: (value: 'recent' | 'relevant') => void;
  theme?: 'light' | 'dark';
}

export default function CustomTabs({ value, onValueChange, theme = 'light' }: CustomTabsProps) {
  const handleValueChange = (newValue: string) => {
    if (newValue === 'recent' || newValue === 'relevant') {
      onValueChange(newValue);
    }
  };

  return (
    <Tabs 
      value={value} 
      onValueChange={handleValueChange}
      className="lg:w-[240px] min-[320px]:w-full"
    >
      <TabsList className={`grid w-full grid-cols-2 gap-3 items-center justify-center rounded-md ${
        theme === 'dark' 
          ? 'bg-neutral-900' 
          : 'bg-neutral-100'
      }`}>
        <TabsTrigger 
          value="recent"
          className={`flex items-center justify-start px-3 gap-1.5 text-sm ${
            theme === 'dark'
              ? 'data-[state=active]:bg-violet-600 data-[state=active]:text-white'
              : 'data-[state=active]:bg-violet-500 data-[state=active]:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Recentes
        </TabsTrigger>
        <TabsTrigger 
          value="relevant"
          className={`flex items-center justify-start px-3 gap-1.5 text-sm ${
            theme === 'dark'
              ? 'data-[state=active]:bg-violet-600 data-[state=active]:text-white'
              : 'data-[state=active]:bg-violet-500 data-[state=active]:text-white'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Relevantes
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}