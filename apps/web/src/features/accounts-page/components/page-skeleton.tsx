import { Card, CardContent, CardHeader } from "@/lib/components/card";
import { Skeleton } from "@/lib/components/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Summary Section Skeletons */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="gap-2">
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Accounts Section Skeleton */}
      <section>
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardHeader>
          <CardContent className="pt-6" />
        </Card>
      </section>
    </div>
  );
}
