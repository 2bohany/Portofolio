import { ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/Button";
import { isPlaceholder } from "@/data/links";

export function DemoLinkButton({ demoUrl }: { demoUrl: string }) {
  if (isPlaceholder(demoUrl)) {
    return (
      <Button variant="outline" disabled aria-disabled className="cursor-not-allowed opacity-60">
        <Lock className="h-4 w-4" aria-hidden />
        Live Demo Coming Soon
      </Button>
    );
  }

  return (
    <Button href={demoUrl} variant="accent" target="_blank" rel="noopener noreferrer">
      <ExternalLink className="h-4 w-4" aria-hidden />
      Open Live Demo
    </Button>
  );
}

export function GithubLinkButton({ githubUrl }: { githubUrl: string }) {
  if (isPlaceholder(githubUrl)) {
    return (
      <Button variant="outline" disabled aria-disabled className="cursor-not-allowed opacity-60">
        <Lock className="h-4 w-4" aria-hidden />
        GitHub Repository Coming Soon
      </Button>
    );
  }

  return (
    <Button href={githubUrl} variant="outline" target="_blank" rel="noopener noreferrer">
      <GithubIcon className="h-4 w-4" />
      View Source Code
    </Button>
  );
}
