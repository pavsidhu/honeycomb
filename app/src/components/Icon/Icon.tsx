import { SvgProps } from "react-native-svg";

import AddIcon from "../../../assets/images/icons/add.svg";
import BackIcon from "../../../assets/images/icons/back.svg";
import LocationIcon from "../../../assets/images/icons/location.svg";
import ShareIcon from "../../../assets/images/icons/share.svg";

const IconList = {
  location: LocationIcon,
  add: AddIcon,
  back: BackIcon,
  share: ShareIcon,
};

export interface IconProps extends SvgProps {
  name: keyof typeof IconList;
  size?: number;
}

export default function Icon(props: IconProps) {
  const { name, size = 24 } = props;

  const Component = IconList[name];

  if (!Component) throw new Error("Icon not found");

  return <Component width={size} height={size} {...props} />;
}
