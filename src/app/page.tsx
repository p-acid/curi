import { Button } from "@/components/button";
import { Textarea } from "@/components/textarea";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-2">
      <div className="flex flex-col gap-2">
        <Button color="graySolid" size="small">
          텍스트
        </Button>
        <Button color="graySolid" size="medium">
          텍스트
        </Button>
        <Button color="graySolid" size="large">
          텍스트
        </Button>
        <Button color="graySolid" size="large" disabled>
          텍스트
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Button color="primarySolid" size="small">
          텍스트
        </Button>
        <Button color="primarySolid" size="medium">
          텍스트
        </Button>
        <Button color="primarySolid" size="large">
          텍스트
        </Button>
        <Button color="primarySolid" size="large" disabled>
          텍스트
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Button color="primaryOutline" size="small">
          텍스트
        </Button>
        <Button color="primaryOutline" size="medium">
          텍스트
        </Button>
        <Button color="primaryOutline" size="large">
          텍스트
        </Button>
        <Button color="primaryOutline" size="large" disabled>
          텍스트
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Textarea />
        <Textarea error helperText="설명 문구 입력" />
      </div>
    </div>
  );
}
