import { MAX_FREE_COUNTS } from "@/constants";

interface FreeCounterProps {
  apiLimitCount: number;
}
export default function FreeCounter({apiLimitCount=0}:FreeCounterProps) {
  return (
    <div>FreeCounter: {apiLimitCount}/{MAX_FREE_COUNTS}</div>
  )
}
