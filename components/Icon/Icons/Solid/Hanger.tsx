import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.76 15.888h-.01c.75.38 1.25 1.094 1.25 1.906 0 .585-.263 1.146-.732 1.56A2.679 2.679 0 0 1 19.5 20h-15a2.679 2.679 0 0 1-1.768-.646C2.263 18.94 2 18.379 2 17.794c0-.812.5-1.526 1.25-1.906h-.01L11 11.935s0-.758 1-1.64c1 0 2-.795 2-1.766 0-.468-.21-.916-.586-1.247A2.143 2.143 0 0 0 12 6.765c-.53 0-1.04.186-1.414.517-.375.33-.586.78-.586 1.247H8c0-.936.421-1.833 1.172-2.495C9.922 5.372 10.939 5 12 5c1.06 0 2.078.372 2.828 1.034S16 7.594 16 8.529c0 1.642-1.27 3.018-3 3.415l7.76 3.944ZM4.5 18.235h15c.17 0 .34-.08.43-.22.14-.22.07-.477-.18-.6L12 13.462l-7.75 3.953c-.25.123-.32.38-.18.6.09.14.26.22.43.22Z" />
  </Svg>
)

export default Icon
