import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 21h2v-2H7v2Zm0-8h2v-2H7v2Zm4 0h2v-2h-2v2Zm0 8h2v-2h-2v2Zm-8-4h2v-2H3v2Zm0 4h2v-2H3v2Zm0-8h2v-2H3v2Zm0-4h2V7H3v2Zm8 8h2v-2h-2v2Zm8-8h2V7h-2v2Zm0 4h2v-2h-2v2ZM3 3v2h18V3H3Zm16 14h2v-2h-2v2Zm-4 4h2v-2h-2v2ZM11 9h2V7h-2v2Zm8 12h2v-2h-2v2Zm-4-8h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
