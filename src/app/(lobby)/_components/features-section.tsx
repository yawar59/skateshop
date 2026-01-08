import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    title: "Open Source",
    description:
      "Built with modern technologies and completely open source for maximum flexibility.",
    icon: Icons.gitHub,
  },
  {
    title: "Next.js 14",
    description:
      "Leveraging the latest Next.js features for optimal performance and developer experience.",
    icon: Icons.nextjs,
  },
  {
    title: "Stripe Integration",
    description:
      "Seamless payments handling with Stripe Connect for marketplaces.",
    icon: Icons.stripe,
  },
  {
    title: "Tailwind CSS",
    description:
      "Beautifully designed components built with Tailwind CSS and Radix UI.",
    icon: Icons.tailwind,
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="space-y-6 py-8 md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Skateshop comes with everything you need to build a modern e-commerce
          platform.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="flex h-[180px] flex-col justify-between rounded-md">
            <CardHeader className="grid gap-4 p-4">
              <feature.icon className="size-8" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
