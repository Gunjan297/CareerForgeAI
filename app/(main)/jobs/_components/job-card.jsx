import { ExternalLink, MapPin, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobCard = ({ job }) => {
  return (
    <Card className="border border-orange-500/20 bg-black/40 shadow-lg shadow-orange-500/10 transition hover:border-orange-400/40">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
          {job.title}
        </CardTitle>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            {job.company}
          </span>

          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>

          {job.postedAt && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {job.postedAt}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm line-clamp-5 whitespace-pre-line">
          {job.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-400">
            Source: {job.source}
          </span>

          <Button
            asChild
            variant="destructive"
            className="px-6 py-2 rounded-lg font-medium text-orange-700 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-100 hover:to-orange-200 transition-all duration-300"
          >
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              Apply <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
