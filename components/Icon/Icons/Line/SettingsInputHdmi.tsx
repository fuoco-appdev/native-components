import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1ZM8 4h8v3h-2.01V5h-1v2H11V5h-1v2H8V4Zm9 8.53-3 6V20h-4v-1.47l-3-6V9h10v3.53Z" />
  </Svg>
)

export default Icon
