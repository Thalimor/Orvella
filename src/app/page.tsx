import { OrvellaLogo } from "@/components/logo";
import { DashboardView } from "@/components/views/dashboard-view";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <OrvellaLogo />
        <Button variant="ghost" className="text-foreground hover:bg-transparent hover:text-primary transition-colors duration-300 group">
          Contact
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
        </Button>
      </nav>
    </header>
  );
}

function HeroSection() {
    return (
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 flex items-center justify-center text-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative container mx-auto px-6">
                <div className="glassmorphic max-w-3xl mx-auto p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Orvella AI
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto mb-8">
                        Your all-in-one AI suite for content creation and optimization. Enhance, generate, and summarize with powerful AI tools.
                    </p>
                    <a href="#tools">
                        <Button size="lg" className="bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_theme(colors.accent)] transition-all duration-300 transform hover:-translate-y-1">
                            Get Started
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-8 text-center text-foreground/50">
            <p>&copy; {new Date().getFullYear()} Orvella. All rights reserved.</p>
        </footer>
    );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DashboardView />
      </main>
      <Footer />
    </div>
  );
}
