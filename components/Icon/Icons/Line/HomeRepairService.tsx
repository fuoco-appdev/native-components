import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 8h-3V6c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10h20V10c0-1.1-.9-2-2-2ZM9 6h6v2H9V6Zm11 12H4v-3h2v1h2v-1h8v1h2v-1h2v3Zm-2-5v-1h-2v1H8v-1H6v1H4v-3h16v3h-2Z" />
  </Svg>
)

export default Icon
