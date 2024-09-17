import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 9.59h5c0-1.1-.9-2-2-2H4c-.55 0-1 .45-1 1s.45 1 1 1Z" />
    <Path d="M22 14.65V8.59c0-1.1-.9-2-2-2h-6.29l-1.06-1.06 1.41-1.41-.71-.71-3.53 3.53.71.71 1.41-1.41L13 7.3v2.29c0 1.1-.9 2-2 2H8.96c-.22-.16-.45-.3-.69-.43l-.4.89-.46-.21.4-.9c-.55-.22-1.17-.35-1.81-.35-.53 0-1.04.11-1.52.26l.34.91-.47.18-.35-.93a4.92 4.92 0 0 0-2.43 2.31l.89.4-.21.46-.9-.4c-.22.55-.35 1.17-.35 1.81 0 .53.11 1.04.26 1.52l.91-.34.18.47-.93.35a4.92 4.92 0 0 0 2.31 2.43l.4-.89.46.21-.4.9c.55.22 1.17.35 1.81.35.53 0 1.04-.11 1.52-.26l-.34-.91.47-.18.35.93a4.92 4.92 0 0 0 2.43-2.31l-.89-.4.21-.46.9.4c.1-.26.18-.54.24-.82h5.16c-.02.17-.05.34-.05.51 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.95-.38-1.81-1-2.44ZM6 18.59c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Zm4.87-4c-.04-.18-.08-.35-.13-.52l-.91.34-.18-.47.93-.35H11c2.21 0 4-1.79 4-4v-1h5v5.05c-.16-.02-.33-.05-.5-.05-.95 0-1.81.38-2.44 1h-6.19Zm8.63 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z" />
  </Svg>
)

export default Icon
