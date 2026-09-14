import { ImageResponse } from "next/og";
import { SOCIAL_CARD_SIZE, SocialCard } from "./lib/socialCard";

export const size = SOCIAL_CARD_SIZE;

export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(<SocialCard />, size);
}
