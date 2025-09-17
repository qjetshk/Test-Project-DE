import type { Card } from "../components/card";

export interface ICardOptions extends Omit<Card, "init"> {}