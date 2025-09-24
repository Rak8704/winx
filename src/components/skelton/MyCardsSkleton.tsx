import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
const MyCardsSkleton = () => {
  return (
    <div className="w-full mt-6 space-y-4">
      {/* Header */}
      <div className="flex justify-center mb-16">
        <Skeleton className="h-5 w-20 rounded" />
      </div>

      {/* Phone & status row */}
      <div className="flex items-center justify-between px-3 ">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-5 rounded" />
      </div>

      <Skeleton className="h-4 w-24 ml-8 -mt-4 " />

      {/* Card skeleton */}
      <Card className="bg-muted/30 rounded-xl shadow mx-4">
        <CardContent className="p-5 space-y-5">
          <Skeleton className="w-8 h-6 rounded-sm" />

          <Skeleton className="h-6 w-3/4" />

          <div className="flex justify-between mt-6 space-x-4">
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <Skeleton className="h-5 w-16 absolute top-5 right-5" />
        </CardContent>
      </Card>

      {/* Phone & status row */}
      <div className="flex items-center justify-between px-3 mt-3">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-5 rounded" />
      </div>

      <Skeleton className="h-4 w-24 ml-8 -mt-4 " />

      {/* Card skeleton */}
      <Card className="bg-muted/30 rounded-xl shadow mx-4">
        <CardContent className="p-5 space-y-5">
          <Skeleton className="w-8 h-6 rounded-sm" />

          <Skeleton className="h-6 w-3/4" />

          <div className="flex justify-between mt-6 space-x-4">
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <Skeleton className="h-5 w-16 absolute top-5 right-5" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCardsSkleton;
