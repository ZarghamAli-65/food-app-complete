import SuccessContent from "@/components/SuccessContent";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
