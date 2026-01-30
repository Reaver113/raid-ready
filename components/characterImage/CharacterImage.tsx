import Image from "next/image";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";

const CharacterImage = ({
  appearance,
  appearanceLoading,
}: {
  appearance?: string;
  appearanceLoading?: boolean;
}) => {
  if (appearanceLoading) {
    return <LoadingWheel />;
  }

  if (!appearance) return null;

  return (
    <Image
      src={appearance}
      alt="Character Appearance"
      width={500}
      height={500}
    />
  );
};

export default CharacterImage;
