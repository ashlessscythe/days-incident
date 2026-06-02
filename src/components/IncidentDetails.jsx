import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const IncidentDetails = React.memo(({ data }) => {
  if (!data || !data.lastRecordableDate || !data.lastNonOshaDate) {
    return null;
  }
  return (
    <footer className="incident-details shrink-0">
      <Card className="border-border/40 bg-card/60 py-0 shadow-lg backdrop-blur-sm">
        <CardContent className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
        <DetailItem
          label="Recordable"
          date={formatDate(data.lastRecordableDate)}
          variant="recordable"
        />
        <Separator orientation="vertical" className="hidden h-8 sm:block" />
        <DetailItem
          label="Non-recordable"
          date={formatDate(data.lastNonOshaDate)}
          variant="non-recordable"
        />
      </CardContent>
      </Card>
    </footer>
  );
});

function DetailItem({ label, date, variant }) {
  return (
    <p className="detail m-0 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
      <Badge variant={variant} className="detail-label uppercase tracking-wide">
        {label}
      </Badge>
      <span className="font-mono text-muted-foreground tabular-nums">{date}</span>
    </p>
  );
}

function formatDate(datestr) {
  const d = new Date(datestr);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default IncidentDetails;
