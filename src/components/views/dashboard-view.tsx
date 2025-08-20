"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit, FileText, Lightbulb, Bot, FileCode2 } from "lucide-react";
import { TextRefinementView } from "@/components/views/text-refinement-view";
import { IdeaGenerationView } from "@/components/views/idea-generation-view";
import { PromptCreationView } from "@/components/views/prompt-creation-view";
import { TextSummarizationView } from "@/components/views/text-summarization-view";
import { TemplatesView } from "@/components/views/templates-view";
import { useState } from "react";

const tools = [
  {
    title: "Smart Notes",
    description: "AI-powered text refinement to improve clarity, tone, and style.",
    icon: Edit,
    view: "refine",
    color: "text-cyan-400",
    shadow: "hover:shadow-[0_0_20px_#00FFCC]",
  },
  {
    title: "Flexible Organization",
    description: "Use AI to brainstorm fresh ideas and organize your thoughts.",
    icon: Lightbulb,
    view: "ideas",
    color: "text-blue-400",
    shadow: "hover:shadow-[0_0_20px_#1E90FF]",
  },
  {
    title: "Cloud Sync",
    description: "Generate effective prompts to get the best from any AI model.",
    icon: Bot,
    view: "prompt",
    color: "text-pink-400",
    shadow: "hover:shadow-[0_0_20px_#FF69B4]",
  },
];

export function DashboardView() {
  const [activeView, setActiveView] = useState<string | null>(null);

  if (activeView) {
    return (
        <section id="tool-view" className="py-16 md:py-24">
             <div className="container mx-auto px-6">
                <Button onClick={() => setActiveView(null)} className="mb-8">Back to Tools</Button>
                {activeView === 'refine' && <TextRefinementView />}
                {activeView === 'ideas' && <IdeaGenerationView />}
                {activeView === 'prompt' && <PromptCreationView />}
             </div>
        </section>
    )
  }

  return (
    <section id="tools" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Core Features
            </h2>
            <p className="text-lg text-muted-foreground">
                Unlock your creative potential with our suite of intelligent tools.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              onClick={() => setActiveView(tool.view)}
              className="glassmorphic group p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className={`p-4 rounded-full bg-black/50 mb-4 ${tool.shadow} transition-shadow duration-300`}>
                <tool.icon className={`h-8 w-8 ${tool.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-foreground/70 flex-grow">{tool.description}</p>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 mt-4" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
