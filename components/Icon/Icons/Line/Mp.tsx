import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 9h-3.5v6H15v-1.5h2c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1Zm-.5 3H15v-1.5h1.5V12Z" />
    <Path d="M11.5 9H7c-.55 0-1 .45-1 1v5h1.5v-4.5h1v3H10v-3h1V15h1.5v-5c0-.55-.45-1-1-1Z" />
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM5 19V5h14v14H5Z" />
  </Svg>
)

export default Icon
