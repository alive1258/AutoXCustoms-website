import TrustUs from "../TrustUs/TrustUs";
import Hero from "../HeroSection/HeroSection";
import About from "../About/About";
import Services from "../Services/Services";
import Projects from "../Projects/Projects";
import Process from "../Process/Process";
import WhyUs from "../WhyUs/WhyUs";
import Testimonials from "../Testimonials/Testimonials";
import ClientVideoReviews from "../ClientVideoReviews/ClientVideoReviews";
import Gallery from "../Gallery/Gallery";
import Accessories from "../Accessories/Accessories";
import Contact from "../Contact/Contact";
import PhotoGallery from "../PhotoGallry/PhotoGallery";
import Blog from "../Blog/Blog";
import FAQ from "../FAQ/FAQ";
import Expertise from "../Expertise/Expertise";

const RootHomePage = () => {
  return (
    <>
      <Hero />
      <PhotoGallery />
      <About />
      <Expertise />
      <Services />
      <Projects />
      <Process />
      <WhyUs />
      <Testimonials />
      <ClientVideoReviews />
      <Gallery />
      <Accessories />
      <Blog />
      <FAQ />
      <Contact />
      <TrustUs />
    </>
  );
};

export default RootHomePage;
