import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M7 3h2v2H7V3ZM3 7h2v2H3V7Zm0 14h2v-2H3v2Zm4 0h2v-2H7v2Zm-4-4h2v-2H3v2ZM5 3H3v2h2V3Zm10 0h2v2h-2V3Zm4 6h2V7h-2v2Zm0-4V3h2v2h-2Zm-4 16h2v-2h-2v2ZM11 3h2v8h8v2h-8v8h-2v-8H3v-2h8V3Zm8 18h2v-2h-2v2Zm2-4h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
