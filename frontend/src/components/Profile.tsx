import { useEffect, useState } from "react";
import { TextInput, Button, Spinner, Toast, Alert } from "flowbite-react";
import { useProfile } from "../hooks/useProfile";
import { HiCheck, HiExclamation, HiInformationCircle } from "react-icons/hi";

interface ProfileProps {
  onClose: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const { profile, isLoading, updateError, update } = useProfile();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

const handleUpdate = () => {
  update(
    {
      name,
      email,
      password,
      currentPassword,
    },
    {
      onSuccess: () => {
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      },
      onError: () => {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
      },
    }
  );
};

  if (isLoading) return <Spinner color="blue" />;

  return (
    <>
    {updateError && (<Alert className='flex w-full mb-4' color="failure" icon={HiInformationCircle}>{updateError.message}</Alert>)}

        <form className="space-y-4 mb-6">
            <TextInput
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <TextInput
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            />
            <TextInput
            placeholder="New password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            />
            {password && (
            <TextInput
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                required
            />
            )}
        </form>

        <div className="flex justify-end gap-2">
            <Button className="cursor-pointer" color="blue" onClick={handleUpdate}>
            Save Changes
            </Button>
            <Button className="cursor-pointer" color="gray" onClick={onClose}>
            Cancel
            </Button>
        </div>
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {showSuccessToast && (
            <Toast>
            <HiCheck className="h-5 w-5 text-green-500" />
            <div className="ml-3 text-sm font-normal">Profile updated successfully.</div>
            </Toast>
        )}

        {showErrorToast && (
            <Toast>
            <HiExclamation className="h-5 w-5 text-red-500" />
            <div className="ml-3 text-sm font-normal">Update failed. Please try again.</div>
            </Toast>
        )}
        </div>
    </>
  );
}
