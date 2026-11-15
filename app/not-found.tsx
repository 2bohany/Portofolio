import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container as="section" className="flex flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Button href="/" variant="primary">
        Back to Home
      </Button>
    </Container>
  );
}
