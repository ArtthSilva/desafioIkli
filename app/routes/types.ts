import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type propsNavigationStack = {
  Home: undefined;
  Profile: {
    id: number;
  };
  Search: undefined;
  Favorites: undefined;
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
export type ProfileRouteProp = RouteProp<propsNavigationStack, "Profile">;
