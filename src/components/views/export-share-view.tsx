"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExportShareView() {
  const [textToExport, setTextToExport] = useState("Your content here...");
  const [format, setFormat] = useState("txt");
  const { toast } = useToast();

  const handleExport = () => {
    if (!textToExport) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There is no content to export.",
      });
      return;
    }

    let mimeType = "text/plain";
    let fileExtension = "txt";

    if (format === "md") {
      mimeType = "text/markdown";
      fileExtension = "md";
    } else if (format === "json") {
      mimeType = "application/json";
      fileExtension = "json";
    }

    const blob = new Blob([textToExport], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orvella-export.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: `Your content has been downloaded as a .${fileExtension} file.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share && textToExport) {
      try {
        await navigator.share({
          title: "Orvella Content",
          text: textToExport,
        });
        toast({
          title: "Shared Successfully",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Sharing Failed",
          description: "Could not share the content at this time.",
        });
      }
    } else {
        navigator.clipboard.writeText(textToExport);
        toast({
            title: "Copied to Clipboard",
            description: "Sharing is not supported on this browser. Content copied to clipboard.",
        });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Export & Share</h1>
      <p className="text-muted-foreground mb-8">Download your notes and ideas or share them with others.</p>
      
      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle className="text-primary">Your Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={textToExport}
            onChange={(e) => setTextToExport(e.target.value)}
            className="h-64 bg-black/40 border-white/20 focus:border-primary transition-colors duration-300 resize-none"
            placeholder="Enter or paste your content here..."
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Select onValueChange={setFormat} defaultValue={format}>
                <SelectTrigger className="w-[180px] bg-black/40 border-white/20">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="txt">Text (.txt)</SelectItem>
                  <SelectItem value="md">Markdown (.md)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <Button onClick={handleShare} variant="default" className="bg-accent text-white hover:bg-accent/90">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
