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
      d="M13 23h-2V1h2v22ZM3 19V5c0-1.1.9-2 2-2h4v2H5v14h4v2H5c-1.1 0-2-.9-2-2ZM19 9h2V7h-2v2Zm-4 12h2v-2h-2v2Zm4-18v2h2c0-1.1-.9-2-2-2Zm0 14h2v-2h-2v2ZM17 5h-2V3h2v2Zm2 8h2v-2h-2v2Zm2 6c0 1.1-.9 2-2 2v-2h2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
