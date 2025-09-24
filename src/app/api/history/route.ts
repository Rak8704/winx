/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";

import pmap from "p-map";
import { paymentSystemsLogos } from "@/data/paymentWallet";

// type HistoryType = "all" | "deposit" | "withdraw";
// type StatusFilter = "all" | "pending" | "approved" | "rejected";
// type DepositStatus = "PENDING" | "APPROVED" | "REJECTED";
// type WithdrawStatus = "PENDING" | "APPROVED" | "REJECTED";

// interface DepositWhere {
//   userId: string;
//   status?: DepositStatus;
// }

// interface WithdrawWhere {
//   userId: string;
//   status?: WithdrawStatus;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const type = (searchParams.get("type") as HistoryType) || "all";
//     const status = (searchParams.get("status") as StatusFilter) || "all";
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const recordId = searchParams.get("id");

//     const user: any = await findCurrentUser();
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const skip = (page - 1) * limit;

//     // Base where clauses with proper typing
//     const depositWhere: DepositWhere = { userId: user.id };
//     const withdrawWhere: WithdrawWhere = { userId: user.id };

//     // Apply status filters with type safety
//     if (status !== "all") {
//       const upperStatus = status.toUpperCase();
//       if (type === "all" || type === "deposit") {
//         depositWhere.status = upperStatus as DepositStatus;
//       }
//       if (type === "all" || type === "withdraw") {
//         withdrawWhere.status = upperStatus as WithdrawStatus;
//       }
//     }

//     let deposits: any[] = [];
//     let withdrawals: any[] = [];
//     let totalDeposits = 0;
//     let totalWithdrawals = 0;

//     if (type === "all" || type === "deposit") {
//       // Get deposits with depositWallet info
//       deposits = await db.deposit.findMany({
//         where: depositWhere,
//         include: {
//           wallet: true,
//         },
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit,
//       });

//       const paymentWallets = await db.paymentWallet.findMany({
//         where: {},
//       });

//       // Combine the data
//       deposits = deposits.map((deposit) => {
//         const paymentWallet = paymentWallets.find(
//           (pw) => pw.id === deposit.wallet?.paymentWalletId
//         );
//         return {
//           ...deposit,
//           depositWallet: {
//             ...deposit.depositWallet,
//             paymentWallet: paymentWallet || null,
//           },
//         };
//       });

//       totalDeposits = await db.deposit.count({ where: depositWhere });
//     }

//     if (type === "all" || type === "withdraw") {
//       // Get withdrawals with card info
//       withdrawals = await db.withdraw.findMany({
//         where: withdrawWhere,
//         include: {
//           card: {
//             include: {
//               container: true,
//             },
//           },
//         },
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit,
//       });

//       // Get paymentWallet info separately for cards
//       const cardPaymentWalletIds = withdrawals
//         .map((w) => w.card?.paymentWalletid)
//         .filter(Boolean) as string[];

//       const cardPaymentWallets =
//         cardPaymentWalletIds.length > 0
//           ? await db.paymentWallet.findMany({
//               where: { id: { in: cardPaymentWalletIds } },
//             })
//           : [];

//       // Combine the data
//       withdrawals = withdrawals.map((withdrawal) => {
//         const paymentWallet = cardPaymentWallets.find(
//           (pw) => pw.id === withdrawal.card?.paymentWalletid
//         );
//         return {
//           ...withdrawal,
//           card: {
//             ...withdrawal.card,
//             paymentWallet: paymentWallet || null,
//           },
//         };
//       });

//       totalWithdrawals = await db.withdraw.count({ where: withdrawWhere });
//     }

//     // Combine and sort results when showing all
//     let combinedResults: any[] = [];
//     if (type === "all") {
//       combinedResults = [...deposits, ...withdrawals].sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );
//     } else if (type === "deposit") {
//       combinedResults = deposits;
//     } else {
//       combinedResults = withdrawals;
//     }

//     // If a specific record ID is requested, find it
//     let highlightedRecord = null;
//     if (recordId) {
//       if (type === "deposit" || type === "all") {
//         highlightedRecord = deposits.find((d) => d.id === recordId);
//       }
//       if (!highlightedRecord && (type === "withdraw" || type === "all")) {
//         highlightedRecord = withdrawals.find((w) => w.id === recordId);
//       }
//     }

//     return NextResponse.json({
//       data: combinedResults.slice(0, limit),
//       total:
//         type === "deposit"
//           ? totalDeposits
//           : type === "withdraw"
//           ? totalWithdrawals
//           : totalDeposits + totalWithdrawals,
//       page,
//       limit,
//       highlightedId: highlightedRecord?.id || null,
//     });
//   } catch (error) {
//     console.error("[HISTORY_ERROR]", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
interface Transaction {
  type: "deposit" | "withdraw";
  amount: number;
  created_at: number;
  currency: string;
  order_id: string;
  payment_system: string;
  status: string;
  success: boolean;
  image?: string;
  label?: string;
  // Add other common fields if needed
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type") || "all"; // 'deposit', 'withdraw', or 'all'
    const status = searchParams.get("status") || "all"; // 'pending', 'success', or 'all'

    const user = await findCurrentUser();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Base where clauses
    const depositWhere = {
      userId: user.id,
    };
    const withdrawWhere = {
      userId: user.id,
    };

    let deposits: any[] = [];
    let withdraws: any[] = [];

    if (type === "all" || type === "deposit") {
      const dbDeposits = await db.aPayDeposit.findMany({
        where: depositWhere,
        take: type === "all" ? limit / 2 : limit,
        skip: type === "all" ? 0 : (page - 1) * limit,
        orderBy: { createdAt: "desc" },
      });

      deposits = await pmap(
        dbDeposits,
        async (dbDeposit) => {
          const response = await fetch(
            `${process.env.APAY_DOMAIN}/Remotes/deposit-info?project_id=${process.env.APAY_PROJECT_ID}&order_id=${dbDeposit.orderId}`,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
                apikey: `${process.env.APAY_API_KEY}`,
              },
            }
          );
          const apiData = await response.json();
          // Merge database fields with API response
          return {
            ...apiData,
            // Preserve these fields from the database
            id: dbDeposit.id,
            userId: dbDeposit.userId,
            createdAt: dbDeposit.createdAt,
            // Add status from database if not in API response
            status: apiData.status,
          };
        },
        { concurrency: 5 }
      );
    }

    if (type === "all" || type === "withdraw") {
      const dbWithdraws = await db.aPayWithdraw.findMany({
        where: withdrawWhere,
        take: type === "all" ? limit / 2 : limit,
        skip: type === "all" ? 0 : (page - 1) * limit,
        orderBy: { createdAt: "desc" },
      });

      withdraws = await pmap(
        dbWithdraws,
        async (dbWithdraw) => {
          const response = await fetch(
            `${process.env.APAY_DOMAIN}/Remotes/withdrawal-info?project_id=${process.env.APAY_PROJECT_ID}&order_id=${dbWithdraw.orderId}`,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
                apikey: `${process.env.APAY_API_KEY}`,
              },
            }
          );
          const apiData = await response.json();
          // Merge database fields with API response
          return {
            ...apiData,
            // Preserve these fields from the database
            id: dbWithdraw.id,
            userId: dbWithdraw.userId,
            createdAt: dbWithdraw.createdAt,
            // Add status from database if not in API response
            status: apiData.status,
          };
        },
        { concurrency: 5 }
      );
    }

    // Add payment system info
    const processPaymentSystem = (item: any) => {
      const ps = item.payment_system || item.paymentSystem; // Handle different response formats
      const paymentSystemData = paymentSystemsLogos.find(
        (paymentSystem) => paymentSystem.name == ps
      );

      return {
        ...item,
        image: paymentSystemData?.image,
        label: paymentSystemData?.label,
      };
    };

    deposits = deposits.map(processPaymentSystem);
    withdraws = withdraws.map(processPaymentSystem);

    // Combine and sort transactions by date (newest first)
    let transactions: Transaction[] = [
      ...deposits.map((d) => ({ ...d, type: "deposit" as const })),
      ...withdraws.map((w) => ({ ...w, type: "withdraw" as const })),
    ].sort(
      (a, b) => (b.created_at || b.createdAt) - (a.created_at || a.createdAt)
    );

    // Apply status filter if needed (as a fallback)
    if (status !== "all") {
      transactions = transactions.filter(
        (t) => t.status?.toLowerCase() === status.toLowerCase()
      );
    }

    // If showing all types, we might have more than limit, so slice
    if (type === "all") {
      transactions = transactions.slice(0, limit);
    }

    // Count queries for pagination
    const depositCount = await db.aPayDeposit.count({ where: depositWhere });
    const withdrawCount = await db.aPayWithdraw.count({ where: withdrawWhere });

    return Response.json(
      {
        data: transactions,
        pagination: {
          page,
          limit,
          total:
            type === "deposit"
              ? depositCount
              : type === "withdraw"
              ? withdrawCount
              : depositCount + withdrawCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction history error:", error);
    return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
