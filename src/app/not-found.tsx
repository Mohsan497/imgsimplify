import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-3 text-muted">This page could not be found.</p>
      <Button href="/" className="mt-6">Back home</Button>
    </Container>
  );
}
