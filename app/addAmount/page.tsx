import { Suspense } from "react";
import AddClientAmount from "./AddClientAmount";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddClientAmount />
    </Suspense>
  );
}
