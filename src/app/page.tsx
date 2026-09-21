import { BookingProvider } from "@/components/booking";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/Hero";
import { Promises } from "@/components/Promises";
import { Services } from "@/components/Services";
import { Care } from "@/components/Care";
import { Environment } from "@/components/environment";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <BookingProvider>
      <div className="announcement">
        一间有温度的宠物洗护小店 <span>✦</span> 把每一位毛孩子，都放在心上
      </div>
      <Navigation />
      <main id="home">
        <Hero />
        <Promises />
        <Services />
        <Care />
        <Environment />
        <Visit />
      </main>
      <Footer />
    </BookingProvider>
  );
}
