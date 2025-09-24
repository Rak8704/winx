/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetHistoryQuery } from "@/lib/features/historyApiSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Wallet, CreditCard, Check, X, Loader } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function HistoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const type = searchParams.get("type") || "all";
  const status = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, isFetching } = useGetHistoryQuery({
    type,
    status,
    page,
  });
  console.log("HISOTRY : ", data);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    // Reset expanded items when filters change
    setExpandedItems({});
  }, [type, status, page]);

  const handleTypeChange = (newType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", newType);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", newStatus);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary">
            <Loader className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="secondary">
            <Check className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="destructive">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <SiteHeader title="Transaction History" />
      <div className="flex flex-col md:flex-row gap-4 mb-6  px-4 py-8">
        <Tabs defaultValue={type} onValueChange={handleTypeChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="deposit">Deposits</TabsTrigger>
            <TabsTrigger value="withdraw">Withdrawals</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Success">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading || isFetching ? (
        <div className="space-y-4 px-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-4 px-3">
          {data?.data?.map((item: any) => (
            <div
              key={item.id}
              className={`border rounded-lg overflow-hidden transition-all duration-300 `}
            >
              <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-center gap-4">
                  {item.amount ? (
                    <>
                      {item.type == "withdraw" ? (
                        <CreditCard className="h-6 w-6 text-red-500" />
                      ) : (
                        <Wallet className="h-6 w-6 text-green-500" />
                      )}
                      <div>
                        <div className="font-medium">
                          {item.amount}{" "}
                          {item?.depositWallet?.currency ||
                            item?.card?.container?.currency ||
                            "BDT"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(item.status)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                  >
                    {expandedItems[item.id] ? "Less" : "More"} details
                  </Button>
                </div>
              </div>

              {expandedItems[item.id] && (
                <div className="border-t p-4 bg-muted/50">
                  {item.type == "withdraw" ? (
                    // Withdraw details
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Withdrawal Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Order Id : {item.order_id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <Wallet className="h-4 w-4" />

                              <img
                                alt={item.label || 'Transaction image'}
                                src={item.image || '/games/provider/default-game.png'}
                                className="w-[50px]"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/games/provider/default-game.png';
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Requested: {formatDate(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Status Information</h4>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="font-medium">Status:</span>{" "}
                            {item.status}
                          </div>
                          {item.status === "Pending" && (
                            <div>
                              Note: Your withdrawal request under review
                            </div>
                          )}
                          {item.status === "Success" && (
                            <div className="text-emerald-600">
                              Note: Funds have been transferred to your card
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Deposit details
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Deposit Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />

                            <img
                              alt={item.label || 'Transaction image'}
                              src={item.image || '/games/provider/default-game.png'}
                              className="w-[50px]"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/games/provider/default-game.png';
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />

                            <span>Order Id: {item.order_id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Requested: {formatDate(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Status Information</h4>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="font-medium">Status:</span>{" "}
                            {item.status}
                          </div>
                          {item.status === "Pending" && (
                            <div className="text-warning">
                              Note: Please complete the payment to process your
                              deposit
                            </div>
                          )}

                          {item.status === "Success" && (
                            <div className="text-emerald-600">
                              Note: Funds have been added to your wallet
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.total > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) handlePageChange(page - 1);
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({
                length: Math.ceil(data.total / 10),
              }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i + 1);
                    }}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < Math.ceil(data.total / 10))
                      handlePageChange(page + 1);
                  }}
                  className={
                    page >= Math.ceil(data.total / 10)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
