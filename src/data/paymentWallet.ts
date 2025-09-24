export interface PaymentWallet {
  walletName: string;
  walletLogo: string;
}

export const wallets: PaymentWallet[] = [
  {
    walletName: "Bkash",
    walletLogo:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1744652095/site/krsjjzw2u66kx16ong92.png",
  },
  {
    walletName: "Nagad",
    walletLogo:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1744652096/site/ep2qtamubtfzhjhankpe.png",
  },
];

export const paymentSystemsLogos = [
  {
    name: "bkash_a",
    label: "Bkash",
    image:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1751090573/hkip9uxtopspwgnuergo.png",
  },
  {
    name: "bkash_b",
    label: "Bkash",
    image:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1751090573/hkip9uxtopspwgnuergo.png",
  },
  {
    name: "bkash_p2p",
    label: "Bkash",
    image:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1751090573/hkip9uxtopspwgnuergo.png",
  },
  {
    name: "nagad_b",
    label: "Nagad",
    image:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1750324929/rlqqxeoqlk3gb3k2nyyr.png",
  },
  {
    name: "upay",
    label: "Upay",
    image:
      "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1748973150/mxfaiajz2fawwkzy4l3e.png",
  },
];
