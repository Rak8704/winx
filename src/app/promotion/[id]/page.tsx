import React from "react";
import { promotions } from "../../../../data/promotions";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import ReactMarkDown from "react-markdown";

const fetchPromotion = (id: number) => {
  const promotion = promotions.find((promotion) => promotion.id == id);

  return promotion;
};
type Params = Promise<{ id: string }>;
const Promotion = async ({ params }: { params: Params }) => {
  const { id: promotionId } = await params;

  const promotion = fetchPromotion(+promotionId);
  return (
    <div>
      {promotion && (
        <div>
          <div className="p-4">
            <Image
              src={promotion.image}
              alt={promotion.title}
              className="w-full h-auto"
            />
            <h3 className="text-center text-white text-lg font-medium py-2">
              {promotion.title}
            </h3>
          </div>

          <p className="my-7 text-sm font-medium text-[#FFDF1A] px-4">
            {promotion.description}
          </p>

          <div className="p-4">
            <div className="markdown p-2 bg-white rounded-lg text-black">
              <ReactMarkDown remarkPlugins={[remarkGfm]}>
                {promotion.content}
              </ReactMarkDown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotion;
