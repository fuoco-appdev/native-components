import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 15H3v2h12v-2Zm0-8H3v2h12V7ZM3 13h18v-2H3v2Zm0 8h18v-2H3v2ZM3 3v2h18V3H3Z" />
  </Svg>
)

export default Icon
