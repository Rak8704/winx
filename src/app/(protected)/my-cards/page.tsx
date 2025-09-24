// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import CardCreateIcon from "@/components/CardCreateIcon";
import MyCards from "@/components/MyCards";
import SiteHeader from "@/components/SiteHeader";

const Card = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <SiteHeader title="My Cards">
        <CardCreateIcon />
      </SiteHeader>

      <main>
        <MyCards />
      </main>
    </div>
  );
};

export default Card;
