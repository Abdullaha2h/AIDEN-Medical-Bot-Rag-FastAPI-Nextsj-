import ChatContainer from "@/components/ui/ChatContainer";
import Header from "@/components/ui/Header";
import FloatingDoctor from "@/components/ui/FloatingDoctor";
import FloatingLines from "@/components/ui/FloatingLines";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex justify-center">
      {/* FloatingLines as background - covers entire screen */}
      <div className="fixed inset-0 -z-10">
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

      {/* Your main content */}
      <div className="relative flex min-h-screen max-w-full w-full mx-auto z-10">
        <div className="flex-1 flex flex-col">
          <Header />

          <div className="pt-20 px-6 md:px-20 md:pt-6">
            <ChatContainer />
          </div><Footer/>
        </div>

        <FloatingDoctor />
        
      </div>
    </main>
  );
}