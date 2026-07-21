import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { DetailedGroup } from "../types/groups.types";

export function DetailGroupCard({
    group
}: {
    group: DetailedGroup
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
            {group.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  )
}