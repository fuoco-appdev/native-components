import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14Z" />
    <Path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6Zm3.44-8c.26.45.44.96.51 1.5h-7.9c.07-.54.24-1.05.51-1.5h6.88Zm.51 2.5c-.07.54-.24 1.05-.51 1.5H8.56c-.26-.45-.44-.96-.51-1.5h7.9ZM9.38 15h5.24c-.7.61-1.61 1-2.62 1s-1.91-.39-2.62-1Zm5.24-6H9.38c.7-.61 1.61-1 2.62-1s1.91.39 2.62 1Z" />
  </Svg>
)

export default Icon
