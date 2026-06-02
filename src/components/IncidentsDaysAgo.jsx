import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const IncidentsDaysAgo = React.memo(({ data }) => {
  if (!data || !data.todaysDate || !data.lastRecordableDate || !data.lastNonOshaDate) {
    return <div className="loading text-muted-foreground">Loading…</div>;
  }
  const recordableDays = getDaysAgo(data.lastRecordableDate, data.todaysDate);
  const nonOshaDays = getDaysAgo(data.lastNonOshaDate, data.todaysDate);

  return (
    <section
      className="days-hero flex w-full shrink-0 flex-wrap items-stretch justify-center gap-4 sm:gap-6"
      aria-label="Days since last incident"
    >
      <StatCard
        label="Recordable"
        days={recordableDays}
        variant="recordable"
        accentClass="from-safe-green/20 via-safe-green/5 to-transparent"
      />
      <StatCard
        label="Non-recordable"
        days={nonOshaDays}
        variant="non-recordable"
        accentClass="from-safe-blue/20 via-safe-blue/5 to-transparent"
      />
    </section>
  );
});

function StatCard({ label, days, variant, accentClass }) {
  return (
    <Card
      className={cn(
        "days-stat-card relative min-w-[9rem] flex-1 overflow-hidden border-border/60 bg-card/80 py-0 shadow-[0_8px_32px_oklch(0_0_0/25%)] backdrop-blur-md sm:max-w-[16rem]"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b opacity-90",
          accentClass
        )}
      />
      <CardContent className="relative flex flex-col items-center px-5 py-4 sm:px-6 sm:py-5">
        <Badge variant={variant} className="days-label mb-2 uppercase tracking-wider">
          {label}
        </Badge>
        <span className="days-value font-extrabold tabular-nums tracking-tight">
          {days.toLocaleString()}
        </span>
        <span className="days-unit text-muted-foreground mt-0.5 font-medium lowercase">
          days
        </span>
      </CardContent>
    </Card>
  );
}

function getDaysAgo(dateString, todaysDate) {
  const dateFrom = new Date(dateString);
  const today = new Date(todaysDate);
  const timeDiff = today - dateFrom;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

export default IncidentsDaysAgo;
