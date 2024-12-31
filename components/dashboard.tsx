import { Card } from "@/components/ui/card";
import Image from "next/image";

export function DashboardPreview() {
  return (
    <Card className="w-full  max-w-5xl mx-auto mt-16">
      <Image src={"/dash.jpg"} alt="test" width={1600} height={400} />
    </Card>
  );
}
