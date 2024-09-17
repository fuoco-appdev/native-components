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
      d="M12 1v3c4.42 0 8 3.58 8 8 0 1.57-.46 3.03-1.24 4.26L17.3 14.8c.45-.83.7-1.79.7-2.8 0-3.31-2.69-6-6-6v3L8 5l4-4ZM6 12c0 3.31 2.69 6 6 6v-3l4 4-4 4v-3c-4.42 0-8-3.58-8-8 0-1.57.46-3.03 1.24-4.26L6.7 9.2c-.45.83-.7 1.79-.7 2.8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
