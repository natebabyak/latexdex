import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Entry } from "@/db/schema";
import { BlockMath } from "react-katex";

export function Post({ entry }: { entry: Entry }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <BlockMath>{entry.content}</BlockMath>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
