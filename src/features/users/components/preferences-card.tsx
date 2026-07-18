import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { ThemeToggle } from "@/shared/components/dashboard/theme-toggle";

export function PreferencesCard() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Preferencias</CardTitle>
        <CardDescription>
          Aquí puedes ver y actualizar tus preferencias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <p>Tema</p>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  );
}
