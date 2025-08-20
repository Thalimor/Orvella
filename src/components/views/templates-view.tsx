"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templates = [
  {
    title: "Professional Email",
    category: "Communication",
    content: `Subject: [Your Subject]\n\nDear [Recipient Name],\n\nI am writing to...\n\nThank you for your time and consideration.\n\nSincerely,\n[Your Name]`,
  },
  {
    title: "Blog Post Intro",
    category: "Content Creation",
    content: `Have you ever wondered [intriguing question]? In today's post, we're diving deep into [topic] to uncover [key insight or benefit]. Let's get started!`,
  },
  {
    title: "Social Media Update",
    category: "Marketing",
    content: `🚀 Big news! We're excited to announce [your announcement]. Check it out and let us know what you think! #[RelevantHashtag] #[YourBrand]`,
  },
  {
    title: "Project Proposal Outline",
    category: "Productivity",
    content: `1. Introduction & Problem Statement\n2. Proposed Solution\n3. Scope of Work\n4. Timeline & Milestones\n5. Budget\n6. Conclusion`,
  },
  {
    title: "Customer Service Reply",
    category: "Support",
    content: `Hello [Customer Name],\n\nThank you for reaching out. We understand you're having an issue with [issue]. We are looking into this and will get back to you shortly.\n\nBest,\nThe [Your Company] Team`,
  },
  {
    title: "Press Release Headline",
    category: "Public Relations",
    content: `[Company Name] Revolutionizes [Industry] with the Launch of [Product Name]`,
  },
];

export function TemplatesView() {
  const { toast } = useToast();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard!",
      description: "The template content has been copied.",
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Content Templates</h1>
      <p className="text-muted-foreground mb-8">Jumpstart your work with our library of pre-designed templates.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className="bg-black/60 backdrop-blur-md border border-white/10 hover:border-primary transition-colors duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-primary">{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-sm text-muted-foreground mb-4 flex-grow whitespace-pre-wrap">{template.content.substring(0, 100)}...</p>
              <Button onClick={() => handleCopy(template.content)} variant="outline" className="w-full mt-auto bg-transparent hover:bg-primary/10 border-primary/50 hover:border-primary text-primary">
                <Copy className="mr-2 h-4 w-4" /> Copy Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
