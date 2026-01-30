import Item from "@/components/item/Item";
import Bubble from "@/components/shared/bubble/Bubble";
import LoadingWheel from "@/components/shared/loadingWheel/LoadingWheel";
import type { CharacterEquipment } from "@/lib/types";

type Props = {
  loading: boolean;
  error: string | null;
  characterEquipment: CharacterEquipment | null;
};

const CharacterEquipment = ({ loading, error, characterEquipment }: Props) => {
  if (loading) {
    return <LoadingWheel />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Bubble xs={12} type="solid">
      <div>
        {characterEquipment?.equipped_items.map((item, index) => (
          <div key={`${item.item?.id}-${index}`}>
            {item?.item?.id && <Item item={item} />}
          </div>
        ))}
      </div>
    </Bubble>
  );
};

export default CharacterEquipment;
