// ** Icon imports
import CubeOutline from "mdi-material-ui/CubeOutline";
import HomeOutline from "mdi-material-ui/HomeOutline";
import CreditCardOutline from "mdi-material-ui/CreditCardOutline";
import AlertCircleOutline from "mdi-material-ui/AlertCircleOutline";

// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: "Home",
    },
    {
      title: "Home",
      icon: CubeOutline,
      path: "/",
    },
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/dashboard",
    },
    {
      sectionTitle: "Market",
    },
    {
      title: "Buy Tokens",
      icon: CreditCardOutline,
      path: "/market/buy",
    },
    {
      title: "Modify Tokens",
      icon: AlertCircleOutline,
      path: "/market/sell",
    },
  ];
};

export default navigation;
