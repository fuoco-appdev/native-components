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
      d="M5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5Zm0 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4ZM15 3h4c1.1 0 2 .9 2 2v4h-2V5h-4V3Zm4 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4ZM9 12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
