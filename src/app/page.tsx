// import AnnouncementModal from "@/components/announcement-modal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeApp from "@/components/HomeApp";
import SideNavLayout from "@/components/SideNavLayout";
import TabLayout from "@/components/TabLayout";

export default function Home() {
  return (
    <SideNavLayout>
      <TabLayout>
        <Header />
        <HomeApp />
        <Footer />
        {/* <AnnouncementModal /> */}
      </TabLayout>
    </SideNavLayout>
  );
}
