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
      d="M3 3h2v2H3V3Zm2 4H3v2h2V7ZM3 21h2v-2H3v2Zm2-4H3v-2h2v2Zm2 4h2v-2H7v2ZM9 3H7v2h2V3Zm6 0h2v2h-2V3Zm-2 4h-2v2h2V7Zm-2-4h2v2h-2V3Zm8 14h2v-2h-2v2Zm-6 4h-2v-2h2v2ZM3 13h18v-2H3v2Zm16-8V3h2v2h-2Zm0 4h2V7h-2v2Zm-6 8h-2v-2h2v2Zm2 4h2v-2h-2v2Zm6 0h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
