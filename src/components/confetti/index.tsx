
import { useWindowSize } from '@/lib/windowSize';
import Confetti from 'react-confetti';
export default function ConfettiStore() {
  const { width, height } = useWindowSize();
  return (
    <div className=" w-full h-full ">
      <Confetti width={width} height={height} />
    </div>
  );
}
