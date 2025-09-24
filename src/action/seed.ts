// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { db } from "@/lib/db";

// export const seed = async () => {
//   try {
//     const bkash = await db.paymentWallet.create({
//       data: {
//         walletLogo:
//           "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1744652095/site/krsjjzw2u66kx16ong92.png",
//         walletName: "bKash",
//       },
//     });

//     const nagad = await db.paymentWallet.create({
//       data: {
//         walletLogo:
//           "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1744652096/site/ep2qtamubtfzhjhankpe.png",
//         walletName: "Nagad",
//       },
//     });

//     await db.depositWallet.createMany({
//       data: [
//         {
//           instructions: "Please Make a Payment Before Submitting Your Request",
//           walletNumber: "017351556549",
//           maximumDeposit: 25000,
//           minDeposit: 200,
//           paymentWalletId: bkash.id,
//           trxType: "Only cashout",
//         },
//         {
//           instructions: "Please Make a Payment Before Submitting Your Request",
//           walletNumber: "018351556549",
//           maximumDeposit: 25000,
//           minDeposit: 200,
//           paymentWalletId: nagad.id,
//           trxType: "Send Money",
//         },
//       ],
//     });

//     await db.bonus.create({
//       data: { referralBonus: 5, signinBonus: 5 },
//     });
//     return "Done";
//   } catch (error : any) {
//     return error.message;
//   }
// };
