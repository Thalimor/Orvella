
import { OrvellaLogo } from "@/components/logo";
import { DashboardView } from "@/components/views/dashboard-view";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <OrvellaLogo />
        <a href="https://discord.gg/rxJNyg9BUp" target="_blank" rel="noopener noreferrer">
          <Button className="bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_theme(colors.accent)] transition-all duration-300 transform hover:-translate-y-1">Contact Staff</Button>
        </a>
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
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 flex items-center justify-center gap-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Orvella AI
                        </span>
                        <Image src="https://files.catbox.moe/76tlv9.png" alt="Orvella Logo" width={60} height={60} className="rounded-full hidden md:block" />
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
    const socialLinks = [
        { name: "Discord", href: "https://discord.gg/rxJNyg9BUp", icon: "https://files.catbox.moe/otokzd.png" },
        { name: "Twitter", href: "https://x.com/Orvella_ai", icon: "https://files.catbox.moe/4niq18.png" },
        { name: "Facebook", href: "https://www.facebook.com/share/175WDeeDZ3/", icon: "https://files.catbox.moe/txew9z.png" },
        { name: "Instagram", href: "https://www.instagram.com/orvella_ai", icon: "https://files.catbox.moe/opowh7.png" },
        { name: "Youtube", href: "https://www.youtube.com/@Orvella-AI", icon: "https://files.catbox.moe/ck6v9n.png" },
    ];

    return (
        <footer className="py-8 text-center text-foreground/50">
            <div className="container mx-auto px-6">
                <div className="mb-4">
                    <p className="text-lg font-semibold text-white mb-3">Follow us</p>
                    <div className="flex justify-center items-center space-x-6">
                        {socialLinks.map((link) => (
                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                                <Image src={link.icon} alt={link.name} width={32} height={32} className="rounded-full" />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Orvella. All rights reserved.</p>
                    <Link href="/policies" className="hover:text-primary transition-colors">Policies</Link>
                </div>
            </div>
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
