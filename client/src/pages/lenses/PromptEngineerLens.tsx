import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function LensPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 container py-16">
        <div className="section-label mb-4">Lens</div>
        <h1 className="text-3xl font-bold text-[#1A1A2E]">Building this lens...</h1>
      </main>
      <Footer />
    </div>
  );
}
