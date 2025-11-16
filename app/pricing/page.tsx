import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <h1>Pricing</h1>
        <div className="grid grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Guest</CardTitle>
              <CardDescription>Full access to public</CardDescription>
              <CardAction>a</CardAction>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Share, save, modify, and more.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2">
                <CardTitle className="text-center text-2xl font-normal">
                  Pro
                </CardTitle>
                <CardDescription></CardDescription>
              </div>
            </CardHeader>
            <Separator />
            <CardContent></CardContent>
            <Separator />
            <CardFooter>
              <CardAction className="w-full">
                <Button className="w-full">Get Pro</Button>
              </CardAction>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
