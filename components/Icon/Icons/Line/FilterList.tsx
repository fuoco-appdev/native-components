import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 18h4v-2h-4v2ZM3 6v2h18V6H3Zm3 7h12v-2H6v2Z" />
  </Svg>
)

export default Icon
