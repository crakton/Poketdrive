export const baseUrl = "https://urideserver-fgfm.onrender.com/api/v1";
export const GOOGLE_MAPS_APIKEY = "AIzaSyBdGuLyViay66dQud7_OlIYZVpX8tF8dQk";
const recent = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1681_8042)">
<path d="M22.3234 6.52998L14.7515 2.36545C14.6397 2.30397 14.5142 2.27173 14.3866 2.27173C14.259 2.27173 14.1335 2.30397 14.0217 2.36545L6.44985 6.52998C6.33113 6.59534 6.23213 6.69137 6.16318 6.80804C6.09423 6.92472 6.05786 7.05775 6.05786 7.19328C6.05786 7.3288 6.09423 7.46184 6.16318 7.57851C6.23213 7.69518 6.33113 7.79121 6.44985 7.85657L13.6294 11.8055V19.9205L11.3305 18.6566L10.6007 19.9831L14.0217 21.8645C14.1335 21.9261 14.259 21.9584 14.3866 21.9584C14.5142 21.9584 14.6397 21.9261 14.7515 21.8645L22.3234 17.7C22.4422 17.6347 22.5412 17.5387 22.6102 17.422C22.6792 17.3053 22.7156 17.1723 22.7157 17.0367V7.19328C22.7156 7.05772 22.6792 6.92466 22.6102 6.80799C22.5412 6.69131 22.4422 6.5953 22.3234 6.52998ZM14.3866 3.89315L20.3872 7.19328L14.3866 10.4934L8.38605 7.19328L14.3866 3.89315ZM21.2013 16.589L15.1438 19.9206V11.8055L21.2013 8.47391V16.589Z" fill="#FF6633"/>
<path d="M1.51428 12.115H7.57178V10.6006H1.51428V12.115Z" fill="#FF6633"/>
<path d="M3.02868 18.1725H9.08618V16.6581H3.02868V18.1725Z" fill="#FF6633"/>
<path d="M4.54309 15.1437H10.6006V13.6294H4.54309V15.1437Z" fill="#FF6633"/>
</g>
<defs>
<clipPath id="clip0_1681_8042">
<rect width="24.23" height="24.23" fill="white"/>
</clipPath>
</defs>
</svg>`;

export const land_onboarding = [
  {
    id: 1,
    title: "Hi there,\nIntroducing uRide",
    subTitle: "Our app is designed to make your ride safe and comfortable.",
    img_name: require("../assets/images/land/urride_onboarding1.png"),
  },
  {
    id: 2,
    title: "Book at convenient",
    subTitle: "Schedule your rides on preferred \ntime and preferred stop",
    img_name: require("../assets/images/land/urride_onboarding2.png"),
  },
  {
    id: 3,
    title: "Earn at ease",
    subTitle: "Share ride, enjoy comfort and \nsave more time",
    img_name: require("../assets/images/land/urride_onboarding3.png"),
  },
];
// Sample transactions
export const transactions = [
  {
    id: "1",
    trackingNumber: "MM09132005",
    status: "Processed at sort facility",
    time: "2 Hrs",
    icon: recent,
  },
  {
    id: "2",
    trackingNumber: "MM09132006",
    status: "Out for delivery",
    time: "4 Hrs",
    icon: recent,
  },
  {
    id: "3",
    trackingNumber: "MM09132007",
    status: "Delivered",
    time: "1 Day",
    icon: recent,
  },
];
interface InputField {
  name:
    | "senderName"
    | "senderPhone"
    | "senderEmail"
    | "pickupAddress"
    | "pickupTime";
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  maxLength?: number;
}
export const inputFields: InputField[] = [
  {
    name: "senderName",
    placeholder: "Enter sender name",
    keyboardType: "default",
  },
  {
    name: "senderPhone",
    placeholder: "Enter sender phone",
    keyboardType: "phone-pad",
    maxLength: 11,
  },
  {
    name: "senderEmail",
    placeholder: "Enter sender email",
    keyboardType: "email-address",
  },
  {
    name: "pickupAddress",
    placeholder: "Pickup Address",
    keyboardType: "default",
  },
];
