import { createStackNavigator, createAppContainer } from "react-navigation";
import Gallery from './Gallery';
import ImageSlider from './ImageSlider';

const AppNavigator = createStackNavigator(
  {
    Gallery: Gallery,
    ImageSlider: ImageSlider
  },
  {
    headerMode: 'none',
    initialRouteName: 'Gallery',
  }
);

export default createAppContainer(AppNavigator);
