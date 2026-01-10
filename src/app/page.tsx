import ChatContainer from "@/components/ui/ChatContainer";
import Header from "@/components/ui/Header";
import FloatingDoctor from "@/components/ui/FloatingDoctor";
import FloatingLines from "@/components/ui/FloatingLines";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden flex flex-col bg-background text-foreground">
      {/* Background FloatingLines */}
      <div className="absolute inset-0 z-0">
        <div className="md:hidden w-full h-full">
          <FloatingLines
            enabledWaves={['middle']}
            lineCount={[5, 30, 1]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>
        <div className="hidden md:block w-full h-full">
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 20]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-[1920px] mx-auto">
        <Header />

        <div className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
          <div className="w-full max-w-4xl h-full">
            <ChatContainer />
          </div>
        </div>

        <div className="hidden md:block">
          <Footer />
        </div>
      </div>

      <FloatingDoctor />

    </main>
  );
}