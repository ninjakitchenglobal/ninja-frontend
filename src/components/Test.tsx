import { toast } from 'react-toastify';

export default function Test() {
  return (
    <button
      onClick={() => {
        toast.success('Hello!');
      }}
      className="h-40"
    >
      Test Toast
    </button>
  );
}
