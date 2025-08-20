"use client";

import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Bot, Home as HomeIcon, Edit, FileText, Lightbulb, FileCode2 } from "lucide-react";
import { OrvellaLogo } from "@/components/logo";
import { DashboardView } from "@/components/views/dashboard-view";
import { TextRefinementView } from "@/components/views/text-refinement-view";
import { IdeaGenerationView } from "@/components/views/idea-generation-view";
import { PromptCreationView } from "@/components/views/prompt-creation-view";
import { TextSummarizationView } from "@/components/views/text-summarization-view";
import { TemplatesView } from "@/components/views/templates-view";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: HomeIcon },
  { id: "refine", label: "Text Refinement", icon: Edit },
  { id: "ideas", label: "Idea Generation", icon: Lightbulb },
  { id: "prompt", label: "Prompt Engineer", icon: Bot },
  { id: "summarize", label: "Text Summarization", icon: FileText },
  { id: "templates", label: "Templates", icon: FileCode2 },
];

function MainContent({ activeView, setActiveView }: { activeView: string, setActiveView: (view: string) => void }) {
  switch (activeView) {
    case "refine":
      return <TextRefinementView />;
    case "ideas":
      return <IdeaGenerationView />;
    case "prompt":
      return <PromptCreationView />;
    case "summarize":
      return <TextSummarizationView />;
    case "templates":
      return <TemplatesView />;
    default:
      return <DashboardView setActiveView={setActiveView} />;
  }
}

function Header() {
    const { isMobile } = useSidebar();
    if (!isMobile) return null;

    return (
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex items-center gap-2">
                <OrvellaLogo />
            </div>
        </header>
    );
}

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="bg-background/80 backdrop-blur-sm border-r border-white/10">
        <SidebarHeader>
          <OrvellaLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveView(item.id)}
                  isActive={activeView === item.id}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto h-[calc(100vh-57px)] md:h-screen">
            <MainContent activeView={activeView} setActiveView={setActiveView}/>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
