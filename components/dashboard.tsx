import { Card } from "@/components/ui/card";
import Image from "next/image";

export function DashboardPreview() {
  return (
    <Card className="w-full md:max-w-5xl mx-auto md:mt-16 mt-8">
      <Image
        src={"/dash.jpg"}
        alt="test"
        width={1600}
        height={400}
        className=" h-full w-full "
      />
    </Card>
  );
}
