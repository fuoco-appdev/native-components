import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3ZM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8Z" />
    <Path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M11 7h2v7h-2V7Z" />
  </Svg>
)

export default Icon
