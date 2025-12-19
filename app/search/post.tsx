import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { Entry, entryTags } from "@/db/schema";
import { BlockMath } from "react-katex";
import { Button } from "@/components/ui/button";
import { Braces, Brackets, Copy, DollarSign } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export async function Post({ entry }: { entry: Entry }) {
  const tags = await db
    .select()
    .from(entryTags)
    .where(eq(entryTags.entryId, entry.id));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                {tags.map((tag, i) => (
                  <Badge key={i}>{tag.tagId}</Badge>
                ))}
              </div>
              <BlockMath>{entry.content}</BlockMath>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry.title}</DialogTitle>
          <DialogDescription>{entry.description}</DialogDescription>
        </DialogHeader>
        <div>
          <BlockMath>{entry.content}</BlockMath>
          <div className="flex justify-end">
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>
                    <Copy />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>
                    <DollarSign />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Math</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>
                    <Brackets />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Display Math</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>
                    <Braces />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align</TooltipContent>
              </Tooltip>
            </ButtonGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
