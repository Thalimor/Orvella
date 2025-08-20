import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit, FileText, Lightbulb, Bot, FileCode2 } from "lucide-react";

const tools = [
  {
    title: "Text Refinement",
    description: "Improve existing text for clarity, tone, and style.",
    icon: Edit,
    view: "refine",
  },
  {
    title: "Idea Generation",
    description: "Brainstorm fresh ideas and topics based on your input.",
    icon: Lightbulb,
    view: "ideas",
  },
  {
    title: "Prompt Engineer",
    description: "Generate effective prompts to get the best from AI.",
    icon: Bot,
    view: "prompt",
  },
  {
    title: "Text Summarization",
    description: "Condense long articles into concise summaries.",
    icon: FileText,
    view: "summarize",
  },
  {
    title: "Content Templates",
    description: "Access a library of pre-designed content templates.",
    icon: FileCode2,
    view: "templates",
  },
];

interface DashboardViewProps {
    setActiveView: (view: string) => void;
}

export function DashboardView({ setActiveView }: DashboardViewProps) {
  return (
    <div className="p-4 md:p-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                Welcome to Orvella
            </h1>
            <p className="text-lg text-muted-foreground">
                Your all-in-one AI suite for content creation and optimization. Select a tool to get started.
            </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.title}
            onClick={() => setActiveView(tool.view)}
            className="group bg-black/60 backdrop-blur-md border border-white/10 hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <tool.icon className="h-8 w-8 mb-4 text-primary" />
                    <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground">{tool.description}</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1 mt-1" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
