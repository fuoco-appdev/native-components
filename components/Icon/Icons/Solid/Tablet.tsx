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
      d="M3 4h18c1.1 0 2 .9 2 2l-.01 12c0 1.1-.89 2-1.99 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm2 14h14V6H5v12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
